import React, { useState } from "react";
import { 
  Users as UsersIcon, 
  User as UserIcon, 
  BookOpen as BookOpenIcon, 
  Clock as ClockIcon, 
  MoreVertical as MoreVerticalIcon, 
  Plus as PlusIcon, 
  Edit as EditIcon, 
  Eye as EyeIcon, 
  Trash2 as Trash2Icon, 
  TrendingUp as TrendingUpIcon, 
  Activity as ActivityIcon, 
  Shield as ShieldIcon, 
  Settings as SettingsIcon, 
  LogOut as LogOutIcon, 
  Camera as CameraIcon, 
  Save as SaveIcon, 
  CreditCard as CreditCardIcon, 
  Bell as BellIcon, 
  BarChart3 as BarChart3Icon, 
  Mail as MailIcon, 
  Phone as PhoneIcon, 
  MapPin as MapPinIcon,
  Search as SearchIcon, 
  LayoutDashboard as LayoutDashboardIcon,
  MessageSquare as MessageSquareIcon,
  Terminal as TerminalIcon,
  FileText as FileTextIcon
} from "lucide-react";
import { Button, Input, Card, Badge, cn } from "../components/lms-ui";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from "recharts";
import { motion } from "framer-motion";

// Admin Sub-components
import { StatsOverview } from "../components/admin/StatsOverview";
import { AnalyticsCharts } from "../components/admin/AnalyticsCharts";
import { UserManagement } from "../components/admin/UserManagement";
import { CourseManagement } from "../components/admin/CourseManagement";
import { SystemMonitoring } from "../components/admin/SystemMonitoring";
import { ReportingCenter } from "../components/admin/ReportingCenter";
import { ChatMonitoring } from "../components/admin/ChatMonitoring";

/** Teacher Dashboard */
export const TeacherDashboard = ({ onNavigate }: { onNavigate: (p: string) => void }) => {
  const stats = [
    { label: "Total Courses", value: "8", icon: BookOpenIcon, color: "bg-indigo-50 text-indigo-600" },
    { label: "Active Students", value: "1,240", icon: UsersIcon, color: "bg-emerald-50 text-emerald-600" },
    { label: "Assignments Pending", value: "42", icon: ClockIcon, color: "bg-amber-50 text-amber-600" },
    { label: "Course Rating", value: "4.8", icon: TrendingUpIcon, color: "bg-violet-50 text-violet-600" },
  ];


  const courses = [
    { name: "UI/UX Design Masterclass", students: 450, status: "Active", revenue: "$12,400", progress: 85 },
    { name: "Advanced Figma Prototyping", students: 320, status: "Active", revenue: "$8,200", progress: 60 },
    { name: "Digital Marketing Basics", students: 180, status: "Draft", revenue: "$0", progress: 0 },
    { name: "Mobile App Design Patterns", students: 290, status: "Active", revenue: "$5,100", progress: 40 },
  ];

  const quizzes = [
    { title: "React Basics", course: "React Masterclass", completed: 120, avgScore: "85%", status: "Active" },
    { title: "UI Design Quiz", course: "UI/UX Masterclass", completed: 340, avgScore: "78%", status: "Active" },
    { title: "Advanced Python", course: "Python Mastery", completed: 85, avgScore: "92%", status: "Scheduled" },
  ];

  const chartData = [
    { name: "Mon", enrollments: 12 },
    { name: "Tue", enrollments: 18 },
    { name: "Wed", enrollments: 25 },
    { name: "Thu", enrollments: 20 },
    { name: "Fri", enrollments: 32 },
    { name: "Sat", enrollments: 15 },
    { name: "Sun", enrollments: 10 },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Teacher Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage your courses and interact with your students.</p>
        </div>
        <Button className="flex gap-2">
          <PlusIcon size={18} /> Create New Course
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="flex items-center gap-4">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", stat.color)}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Quiz Performance</h2>
            <Button variant="ghost" className="text-indigo-600 font-bold">Manage Quizzes</Button>
          </div>
          <div className="space-y-4">
             {quizzes.map((quiz, i) => (
               <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all group">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                       <FileTextIcon size={20} />
                    </div>
                    <div>
                       <p className="font-bold text-slate-900">{quiz.title}</p>
                       <p className="text-xs text-slate-500">{quiz.course}</p>
                    </div>
                 </div>
                 <div className="flex gap-8 items-center text-right">
                    <div className="hidden sm:block">
                       <p className="text-xs text-slate-400 font-bold uppercase">Avg. Score</p>
                       <p className="text-sm font-bold text-emerald-600">{quiz.avgScore}</p>
                    </div>
                    <div className="hidden sm:block">
                       <p className="text-xs text-slate-400 font-bold uppercase">Attempts</p>
                       <p className="text-sm font-bold text-slate-900">{quiz.completed}</p>
                    </div>
                    <Badge variant={quiz.status === 'Active' ? 'success' : 'indigo'}>{quiz.status}</Badge>
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><MoreVerticalIcon size={18} /></button>
                 </div>
               </div>
             ))}
          </div>
          <Button variant="outline" className="w-full border-dashed border-2 py-6 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 bg-white">
            <PlusIcon size={18} className="mr-2" /> Create New Quiz
          </Button>
        </Card>

        <Card className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Recent Assignments</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 group">
                <ImageWithFallback 
                  src={`https://i.pravatar.cc/150?u=${i}`} 
                  className="w-10 h-10 rounded-full object-cover" 
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">Student {i}</p>
                  <p className="text-xs text-slate-500">Submitted: UI/UX Research</p>
                </div>
                <Button variant="ghost" size="sm" className="text-indigo-600">Review</Button>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full">View All Submissions</Button>
        </Card>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Active Courses</h2>
          <Button variant="outline" size="sm">Export Data</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Course Name</th>
                <th className="px-6 py-4">Students</th>
                <th className="px-6 py-4">Revenue</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.map((course, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                        {course.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-900">{course.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600">{course.students}</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">{course.revenue}</td>
                  <td className="px-6 py-4">
                    <Badge variant={course.status === 'Active' ? 'success' : 'default'}>
                      {course.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer"><EditIcon size={18} /></button>
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer"><EyeIcon size={18} /></button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"><Trash2Icon size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

type AdminTab = 'dashboard' | 'users' | 'courses' | 'analytics' | 'monitoring' | 'reports' | 'chat' | 'settings';

/** Admin Dashboard */
export const AdminDashboard = ({ onNavigate }: { onNavigate: (p: string) => void }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboardIcon },
    { id: 'users', name: 'User Management', icon: UsersIcon },
    { id: 'courses', name: 'Course Management', icon: BookOpenIcon },
    { id: 'analytics', name: 'Analytics', icon: BarChart3Icon },
    { id: 'monitoring', name: 'System Monitoring', icon: TerminalIcon },
    { id: 'reports', name: 'Reporting Center', icon: FileTextIcon },
    { id: 'chat', name: 'Chat Monitoring', icon: MessageSquareIcon },
    { id: 'settings', name: 'Settings', icon: SettingsIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-10">
             <StatsOverview />
             <AnalyticsCharts />
             <div className="grid lg:grid-cols-2 gap-8">
                <Card className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-900">Recent Users</h3>
                  <UserManagement />
                </Card>
                <Card className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-900">System Performance</h3>
                  <SystemMonitoring />
                </Card>
             </div>
          </div>
        );
      case 'users':
        return <UserManagement />;
      case 'courses':
        return <CourseManagement />;
      case 'analytics':
        return <AnalyticsCharts />;
      case 'monitoring':
        return <SystemMonitoring />;
      case 'reports':
        return <ReportingCenter />;
      case 'chat':
        return <ChatMonitoring />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 space-y-4">
             <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
               <SettingsIcon size={40} />
             </div>
             <p className="text-xl font-bold">Settings Module</p>
             <p>This section is currently under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar for Admin */}
      <aside className="w-72 bg-slate-900 text-slate-400 hidden lg:flex flex-col h-screen sticky top-0 overflow-y-auto z-20">
        <div className="p-8 flex items-center gap-3 text-white border-b border-slate-800/50">
           <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-600/20">L</div>
           <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight leading-none">Lumina</span>
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-1">Admin Central</span>
           </div>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-1.5">
           {navItems.map((item) => (
             <button 
               key={item.id} 
               onClick={() => setActiveTab(item.id as AdminTab)}
               className={cn(
                 "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-semibold cursor-pointer group",
                 activeTab === item.id 
                  ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/30" 
                  : "hover:text-white hover:bg-slate-800/80"
               )}
             >
               <div className={cn(
                 "p-1.5 rounded-lg transition-colors",
                 activeTab === item.id ? "bg-white/20" : "bg-slate-800 group-hover:bg-slate-700"
               )}>
                 <item.icon size={18} />
               </div>
               {item.name}
             </button>
           ))}
        </nav>

        <div className="p-6 border-t border-slate-800/50 space-y-4">
           <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-2">
                 <ImageWithFallback src="https://i.pravatar.cc/150?u=admin" className="w-8 h-8 rounded-full border border-slate-600" />
                 <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">Admin Alex</p>
                    <p className="text-[10px] text-slate-500 truncate">Super Admin</p>
                 </div>
              </div>
              <div className="flex items-center justify-between">
                 <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                   <span className="text-[8px] font-bold uppercase text-slate-500 tracking-tighter">Online</span>
                 </div>
                 <button className="text-slate-500 hover:text-white transition-colors"><SettingsIcon size={12} /></button>
              </div>
           </div>
           <button 
             onClick={() => onNavigate('login')}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-bold cursor-pointer"
           >
             <LogOutIcon size={20} />
             Logout
           </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-20 bg-white border-b border-slate-100 sticky top-0 z-10 px-6 lg:px-10 flex items-center justify-between">
           <div className="flex items-center gap-4 flex-1 max-w-xl">
              <div className="lg:hidden w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">L</div>
              <div className="relative flex-1">
                 <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input 
                   placeholder="Quick search commands..." 
                   className="w-full bg-slate-50 border-none rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/10 transition-all"
                 />
              </div>
           </div>

           <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all relative">
                 <BellIcon size={20} />
                 <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
              </button>
              <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                 <LayoutDashboardIcon size={20} />
              </button>
              <div className="h-8 w-px bg-slate-100 mx-1"></div>
              <div className="flex items-center gap-3">
                 <div className="hidden md:block text-right">
                    <p className="text-xs font-bold text-slate-900">Admin Central</p>
                    <p className="text-[10px] text-slate-500 font-medium tracking-tight">System Node #42</p>
                 </div>
                 <ImageWithFallback src="https://i.pravatar.cc/150?u=admin" className="w-10 h-10 rounded-xl border-2 border-slate-100 shadow-sm" />
              </div>
           </div>
        </header>

        <div className="p-6 lg:p-10 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {navItems.find(i => i.id === activeTab)?.name}
                </h1>
                <p className="text-slate-500 mt-1">Platform overview and management console.</p>
             </div>
             <div className="flex gap-3">
                <Button variant="outline" className="bg-white border-slate-200 text-slate-600 font-bold flex gap-2">
                  <DownloadIcon size={18} /> Export Data
                </Button>
                <Button className="font-bold shadow-lg shadow-indigo-600/20">Generate Report</Button>
             </div>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

/** Profile Page */
export const ProfilePage = ({ onNavigate }: { onNavigate: (p: string) => void }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Profile Settings</h1>
        <p className="text-slate-500 mt-1">Update your personal information and preferences.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-4">
           <Card className="p-0 overflow-hidden">
             <div className="h-24 bg-indigo-600"></div>
             <div className="px-6 pb-6 -mt-12 text-center">
                <div className="relative inline-block group">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" 
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover" 
                  />
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer">
                    <CameraIcon size={16} />
                  </button>
                </div>
                <h3 className="font-bold text-slate-900 mt-4 text-lg">Alex Johnson</h3>
                <p className="text-sm text-slate-500">Student • Joined 2025</p>
             </div>
           </Card>

           <nav className="flex-col gap-1">
              {[
                { name: 'Personal Info', icon: UserIcon, active: true },
                { name: 'Notifications', icon: BellIcon },
                { name: 'Security', icon: ShieldIcon },
                { name: 'Billing', icon: CreditCardIcon },
              ].map((item, i) => (
                <button 
                  key={i} 
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-medium text-sm cursor-pointer",
                    item.active ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon size={18} />
                  {item.name}
                </button>
              ))}
              <div className="h-px bg-slate-100 my-4"></div>
              <button 
                onClick={() => onNavigate('login')}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium text-sm cursor-pointer"
              >
                <LogOutIcon size={18} />
                Logout
              </button>
           </nav>
        </div>

        <div className="md:col-span-3 space-y-8">
           <Card className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Personal Information</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                 <Input label="First Name" defaultValue="Alex" />
                 <Input label="Last Name" defaultValue="Johnson" />
                 <Input label="Email Address" defaultValue="alex.j@example.com" icon={<MailIcon size={16} />} />
                 <Input label="Phone Number" defaultValue="+1 234 567 890" icon={<PhoneIcon size={16} />} />
                 <div className="sm:col-span-2">
                    <Input label="Location" defaultValue="San Francisco, CA" icon={<MapPinIcon size={16} />} />
                 </div>
                 <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 ml-1">Bio</label>
                    <textarea 
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 min-h-[120px]"
                      defaultValue="Passionate UI/UX Design student at Lumina Academy. Interested in building accessible and beautiful digital products."
                    />
                 </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                 <Button variant="outline">Cancel</Button>
                 <Button className="flex gap-2"><SaveIcon size={18} /> Save Changes</Button>
              </div>
           </Card>

           <Card className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Account Preferences</h3>
              <div className="space-y-4">
                 {[
                   { label: "Email Notifications", desc: "Receive updates about your course activity", checked: true },
                   { label: "Public Profile", desc: "Make your profile visible to other students", checked: false },
                   { label: "Marketing Emails", desc: "Get news about new courses and discounts", checked: true },
                 ].map((pref, i) => (
                   <div key={i} className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-bold text-slate-900">{pref.label}</p>
                        <p className="text-sm text-slate-500">{pref.desc}</p>
                      </div>
                      <div className={cn(
                        "w-11 h-6 rounded-full relative transition-colors cursor-pointer",
                        pref.checked ? "bg-indigo-600" : "bg-slate-200"
                      )}>
                        <div className={cn(
                          "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                          pref.checked ? "right-1" : "left-1"
                        )}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
};

const DownloadIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);
