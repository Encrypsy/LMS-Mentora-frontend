import React, { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { LoginPage, SignUpPage, ForgotPasswordPage } from "@/app/pages/auth";
import { StudentHome, CourseDetailPage, VideoPage, AssignmentPage, QuizPage, Header } from "@/app/pages/student";
import { TeacherDashboard, AdminDashboard, ProfilePage } from "@/app/pages/dashboards";
import { ChatSystem } from "@/app/components/chat/ChatSystem";

type Page = 
  | 'login' 
  | 'signup' 
  | 'forgot-password' 
  | 'home' 
  | 'course-detail' 
  | 'video-lesson' 
  | 'assignment' 
  | 'quiz' 
  | 'teacher-dashboard' 
  | 'admin-dashboard' 
  | 'profile';

type Role = 'student' | 'teacher' | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [userRole, setUserRole] = useState<Role>('student');

  // Handle Login
  const handleLogin = (role: Role) => {
    setUserRole(role);
    toast.success(`Welcome back! Logged in as ${role}`);
    if (role === 'student') setCurrentPage('home');
    if (role === 'teacher') setCurrentPage('teacher-dashboard');
    if (role === 'admin') setCurrentPage('admin-dashboard');
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />;
      case 'signup':
        return <SignUpPage onNavigate={setCurrentPage} onLogin={handleLogin} />;
      case 'forgot-password':
        return <ForgotPasswordPage onNavigate={setCurrentPage} onLogin={handleLogin} />;
      
      // Layout with Header for internal pages
      default:
        // Admin has its own layout/sidebar in its component
        if (currentPage === 'admin-dashboard') {
          return <AdminDashboard onNavigate={setCurrentPage} />;
        }

        return (
          <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header role={userRole} onNavigate={setCurrentPage} />
            <main className="flex-1">
              {currentPage === 'home' && <StudentHome onNavigate={setCurrentPage} />}
              {currentPage === 'course-detail' && <CourseDetailPage onNavigate={setCurrentPage} />}
              {currentPage === 'video-lesson' && <VideoPage onNavigate={setCurrentPage} />}
              {currentPage === 'assignment' && <AssignmentPage onNavigate={setCurrentPage} />}
              {currentPage === 'quiz' && <QuizPage onNavigate={setCurrentPage} />}
              {currentPage === 'teacher-dashboard' && <TeacherDashboard onNavigate={setCurrentPage} />}
              {currentPage === 'profile' && <ProfilePage onNavigate={setCurrentPage} />}
            </main>
          </div>
        );
    }
  };

  return (
    <>
      <div className="font-sans antialiased text-slate-900">
        {renderPage()}
      </div>
      
      {/* Global Chat System */}
      {currentPage !== 'login' && currentPage !== 'signup' && currentPage !== 'forgot-password' && (
        <ChatSystem role={userRole} />
      )}
      
      {/* Quick Navigation Toggle for Demo Purposes */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 group">
        <div className="hidden group-hover:flex flex-col gap-2 mb-2 p-2 bg-white rounded-2xl shadow-2xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase px-2 mb-1">Quick Demo Navigation</p>
          <div className="grid grid-cols-2 gap-1">
            <button onClick={() => setCurrentPage('login')} className="text-xs px-3 py-1.5 hover:bg-slate-100 rounded-lg text-left">Login</button>
            <button onClick={() => setCurrentPage('signup')} className="text-xs px-3 py-1.5 hover:bg-slate-100 rounded-lg text-left">Sign Up</button>
            <button onClick={() => { setUserRole('student'); setCurrentPage('home'); }} className="text-xs px-3 py-1.5 hover:bg-indigo-50 text-indigo-600 rounded-lg text-left font-medium">Student DB</button>
            <button onClick={() => { setUserRole('teacher'); setCurrentPage('teacher-dashboard'); }} className="text-xs px-3 py-1.5 hover:bg-indigo-50 text-indigo-600 rounded-lg text-left font-medium">Teacher DB</button>
            <button onClick={() => { setUserRole('admin'); setCurrentPage('admin-dashboard'); }} className="text-xs px-3 py-1.5 hover:bg-indigo-50 text-indigo-600 rounded-lg text-left font-medium">Admin DB</button>
            <button onClick={() => setCurrentPage('course-detail')} className="text-xs px-3 py-1.5 hover:bg-slate-100 rounded-lg text-left">Course Detail</button>
            <button onClick={() => setCurrentPage('video-lesson')} className="text-xs px-3 py-1.5 hover:bg-slate-100 rounded-lg text-left">Video Lesson</button>
            <button onClick={() => setCurrentPage('assignment')} className="text-xs px-3 py-1.5 hover:bg-slate-100 rounded-lg text-left">Assignment</button>
            <button onClick={() => setCurrentPage('quiz')} className="text-xs px-3 py-1.5 hover:bg-slate-100 rounded-lg text-left">Quiz</button>
            <button onClick={() => setCurrentPage('profile')} className="text-xs px-3 py-1.5 hover:bg-slate-100 rounded-lg text-left">Profile</button>
          </div>
        </div>
        <button className="w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:rotate-90 transition-transform">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
      </div>

      <Toaster position="top-center" richColors />
    </>
  );
}
