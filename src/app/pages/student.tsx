import React from "react";
import { 
  Search as SearchIcon, 
  Bell as BellIcon, 
  User as UserIcon, 
  LogOut as LogOutIcon, 
  Settings as SettingsIcon, 
  LayoutDashboard as LayoutDashboardIcon, 
  BookOpen as BookOpenIcon, 
  Clock as ClockIcon, 
  CheckCircle as CheckCircleIcon, 
  Play as PlayIcon, 
  FileText as FileTextIcon, 
  MessageSquare as MessageSquareIcon, 
  ChevronRight as ChevronRightIcon, 
  Star as StarIcon, 
  ArrowLeft as ArrowLeftIcon, 
  Upload as UploadIcon, 
  Trophy as TrophyIcon, 
  Lock as LockIcon 
} from "lucide-react";
import { Button, Input, Card, Badge, cn } from "../components/lms-ui";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { motion } from "framer-motion";

/** Shared Header */
export const Header = ({ onNavigate, role = 'student' }: { onNavigate: (p: string) => void, role?: string }) => (
  <header className="h-16 border-b border-slate-100 bg-white sticky top-0 z-40 flex items-center justify-between px-6">
    <div className="flex items-center gap-8">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => onNavigate(role === 'student' ? 'home' : role + '-dashboard')}
      >
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
        <span className="font-bold text-xl text-slate-900 tracking-tight">Lumina</span>
      </div>
      <div className="hidden md:flex w-96 relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          placeholder="Search courses, lessons, etc..." 
          className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all"
        />
      </div>
    </div>
    
    <div className="flex items-center gap-4">
      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all relative">
        <BellIcon size={20} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
      <div 
        className="flex items-center gap-2 pl-4 border-l border-slate-100 cursor-pointer hover:bg-slate-50 p-1 rounded-xl transition-all"
        onClick={() => onNavigate('profile')}
      >
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-slate-900 leading-tight">Alex Johnson</p>
          <p className="text-xs text-slate-500 capitalize">{role}</p>
        </div>
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
          className="w-9 h-9 rounded-full object-cover border border-slate-200"
        />
      </div>
    </div>
  </header>
);

/** Student Home */
export const StudentHome = ({ onNavigate }: { onNavigate: (p: string) => void }) => {
  const activeCourses = [
    { title: "UI/UX Design Fundamentals", progress: 65, lessons: 12, instructor: "Sarah Miller", img: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=400" },
    { title: "React Development Masterclass", progress: 30, lessons: 24, instructor: "David Chen", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400" },
    { title: "Advanced Python for Data Science", progress: 10, lessons: 18, instructor: "Michael Ross", img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400" },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-10 max-w-7xl mx-auto">
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome back, Alex! 👋</h1>
            <p className="text-slate-500 mt-1">You've completed 75% of your weekly goal. Keep it up!</p>
          </div>
          <div className="flex gap-4">
            <Card className="p-4 flex items-center gap-4 bg-indigo-50 border-indigo-100 min-w-40">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <TrophyIcon size={20} />
              </div>
              <div>
                <p className="text-xs text-indigo-600 font-medium">Completed</p>
                <p className="text-lg font-bold text-slate-900">12 Courses</p>
              </div>
            </Card>
            <Card className="p-4 flex items-center gap-4 bg-emerald-50 border-emerald-100 min-w-40">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <ClockIcon size={20} />
              </div>
              <div>
                <p className="text-xs text-emerald-600 font-medium">Study Time</p>
                <p className="text-lg font-bold text-slate-900">48 Hours</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Active Courses</h2>
          <Button variant="ghost" className="text-indigo-600">View All</Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCourses.map((course, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-0 overflow-hidden group hover:shadow-md transition-all">
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <Badge>Interactive</Badge>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <ClockIcon size={12} /> {course.lessons} lessons
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                  <p className="text-sm text-slate-500 mb-4">{course.instructor}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-600">Progress</span>
                      <span className="text-indigo-600">{course.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>

                  <Button onClick={() => onNavigate('course-detail')} className="w-full">Continue Learning</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Recommended for you</h2>
          {[1, 2].map((i) => (
            <Card key={i} className="flex flex-col sm:flex-row gap-6 p-4 hover:shadow-md transition-all cursor-pointer">
              <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden shrink-0">
                <ImageWithFallback 
                  src={i === 1 ? "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400" : "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=400"} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="success">Bestseller</Badge>
                    <Badge>Web Dev</Badge>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">
                    {i === 1 ? "Full-stack Development with Next.js" : "Data Visualization with D3.js"}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><UserIcon size={14} /> 12k students</span>
                    <span className="flex items-center gap-1"><StarIcon size={14} className="text-amber-400 fill-amber-400" /> 4.9 (2.1k)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-indigo-600">$49.99</span>
                  <Button variant="outline" size="sm">Add to Cart</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Upcoming Tasks</h2>
          <Card className="space-y-4">
            {[
              { title: "Design Feedback", type: "Assignment", date: "Today, 5:00 PM", color: "red", action: () => onNavigate('assignment') },
              { title: "React Quiz #2", type: "Quiz", date: "Tomorrow", color: "indigo", action: () => onNavigate('quiz') },
              { title: "Python Project", type: "Project", date: "Oct 24", color: "amber", action: () => {} },
            ].map((task, idx) => (
              <div 
                key={idx} 
                onClick={task.action}
                className="flex gap-4 p-2 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                  task.color === 'red' ? "bg-red-50 text-red-600" : task.color === 'indigo' ? "bg-indigo-50 text-indigo-600" : "bg-amber-50 text-amber-600"
                )}>
                  <FileTextIcon size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-900">{task.title}</h4>
                  <p className="text-xs text-slate-500">{task.type} • {task.date}</p>
                </div>
                <button className="self-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRightIcon size={18} className="text-slate-400" />
                </button>
              </div>
            ))}
            <Button variant="secondary" className="w-full mt-2">View Calendar</Button>
          </Card>

          <h2 className="text-xl font-bold text-slate-900">Recent Messages</h2>
          <Card className="space-y-4">
            {[
              { name: "Sarah Miller", msg: "Great job on the wireframes!", time: "10m ago", active: true },
              { name: "John Cooper", msg: "Are we meeting for the project?", time: "1h ago", active: false },
              { name: "UI Design Group", msg: "Alex: I shared the link.", time: "2h ago", active: false },
            ].map((chat, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="relative">
                  <ImageWithFallback src={`https://i.pravatar.cc/150?u=${i + 10}`} className="w-10 h-10 rounded-full" />
                  {chat.active && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <p className="text-sm font-bold text-slate-900 truncate">{chat.name}</p>
                    <span className="text-[10px] text-slate-400 font-medium">{chat.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate group-hover:text-indigo-600 transition-colors">{chat.msg}</p>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-indigo-600 font-bold text-xs py-2">Open All Messages</Button>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white border-none p-6 overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">Upgrade to Pro</h3>
              <p className="text-indigo-100 text-sm mb-4">Get unlimited access to all courses and mentorship.</p>
              <Button className="bg-white text-indigo-600 hover:bg-indigo-50 border-none w-full">Learn More</Button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
          </Card>
        </div>
      </div>
    </div>
  );
};

/** Course Detail Page */
export const CourseDetailPage = ({ onNavigate }: { onNavigate: (p: string) => void }) => {
  const lessons = [
    { title: "Introduction to UI Design", duration: "10:20", status: "completed" },
    { title: "Understanding User Personas", duration: "15:45", status: "ongoing" },
    { title: "Color Theory & Typography", duration: "22:10", status: "locked" },
    { title: "Wireframing with Figma", duration: "18:30", status: "locked" },
    { title: "Prototyping Basics", duration: "25:15", status: "locked" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-10">
      <button 
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 transition-colors font-medium cursor-pointer"
      >
        <ArrowLeftIcon size={18} />
        Back to Dashboard
      </button>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Badge variant="indigo">Design</Badge>
              <Badge variant="success">Intermediate</Badge>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">UI/UX Design Fundamentals</h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Master the essentials of modern interface design. Learn how to create beautiful, 
              functional, and user-centered digital experiences from scratch.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <ImageWithFallback src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100" className="w-10 h-10 rounded-full" />
                <div>
                  <p className="text-sm font-bold text-slate-900">Sarah Miller</p>
                  <p className="text-xs text-slate-500">Lead Designer @ CreativeMind</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1"><StarIcon size={14} className="text-amber-400 fill-amber-400" /> 4.9</span>
                <span className="flex items-center gap-1"><UserIcon size={14} /> 12,450 Students</span>
              </div>
            </div>
          </div>

          <div className="flex gap-1 border-b border-slate-100">
            {['Overview', 'Materials', 'Assignments', 'Discussion'].map((tab, i) => (
              <button 
                key={tab} 
                className={cn(
                  "px-6 py-4 text-sm font-semibold transition-all relative cursor-pointer",
                  i === 0 ? "text-indigo-600" : "text-slate-500 hover:text-slate-700"
                )}
              >
                {tab}
                {i === 0 && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></div>}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Course Curriculum</h3>
            <div className="space-y-3">
              {lessons.map((lesson, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border border-slate-100 group transition-all",
                    lesson.status === 'ongoing' ? "bg-indigo-50/50 border-indigo-100 ring-1 ring-indigo-100" : "hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                      lesson.status === 'completed' ? "bg-emerald-100 text-emerald-600" : 
                      lesson.status === 'ongoing' ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400"
                    )}>
                      {lesson.status === 'completed' ? <CheckCircleIcon size={20} /> : idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{lesson.title}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1"><PlayIcon size={10} /> {lesson.duration}</p>
                    </div>
                  </div>
                  {lesson.status === 'locked' ? (
                    <div className="text-slate-300"><LockIcon size={18} /></div>
                  ) : (
                    <Button 
                      variant={lesson.status === 'ongoing' ? 'primary' : 'outline'} 
                      size="sm"
                      onClick={() => onNavigate('video-lesson')}
                    >
                      {lesson.status === 'completed' ? 'Watch Again' : 'Start Lesson'}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <Card className="p-0 overflow-hidden sticky top-24">
            <div className="aspect-video relative">
              <ImageWithFallback src="https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=600" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button className="w-16 h-16 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                  <PlayIcon size={32} fill="currentColor" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-bold text-slate-900">$89.99</span>
                  <span className="text-slate-400 line-through text-lg">$149.99</span>
                </div>
                <p className="text-emerald-600 text-sm font-medium">40% Off • Offer ends in 2 days</p>
              </div>
              <div className="space-y-3">
                <Button className="w-full py-3">Enroll Now</Button>
                <Button variant="outline" className="w-full">Add to Wishlist</Button>
              </div>
              <div className="space-y-4">
                <p className="text-sm font-bold text-slate-900">This course includes:</p>
                {[
                  { icon: PlayIcon, text: "12 hours on-demand video" },
                  { icon: FileTextIcon, text: "24 downloadable resources" },
                  { icon: MessageSquareIcon, text: "Direct mentor support" },
                  { icon: TrophyIcon, text: "Certificate of completion" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                    <item.icon size={16} className="text-indigo-600" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

/** Video Learning Page */
export const VideoPage = ({ onNavigate }: { onNavigate: (p: string) => void }) => {
  return (
    <div className="h-[calc(100vh-64px)] flex flex-col lg:flex-row overflow-hidden bg-white">
      <div className="flex-1 overflow-y-auto bg-slate-50 p-6 lg:p-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative group">
             <ImageWithFallback 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200" 
                className="w-full h-full object-cover opacity-80" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:scale-110 transition-transform cursor-pointer">
                  <PlayIcon size={40} fill="white" className="text-white" />
                </div>
              </div>
              {/* Fake player controls */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-full h-1 bg-white/20 rounded-full mb-4">
                  <div className="w-1/3 h-full bg-indigo-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <PlayIcon size={20} fill="white" />
                    <span className="text-sm">05:24 / 15:45</span>
                  </div>
                  <SettingsIcon size={20} />
                </div>
              </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-slate-900">Understanding User Personas</h1>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1 font-medium"><BookOpenIcon size={14} /> Lesson 2 of 12</span>
                <span className="flex items-center gap-1 font-medium"><ClockIcon size={14} /> 15:45 duration</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Mark as Completed</Button>
              <Button onClick={() => onNavigate('assignment')}>Next Lesson <ChevronRightIcon size={18} /></Button>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 space-y-6">
             <div className="flex gap-8 border-b border-slate-200">
                <button className="pb-4 text-indigo-600 font-bold border-b-2 border-indigo-600">Overview</button>
                <button className="pb-4 text-slate-500 font-bold hover:text-slate-700">Resources</button>
                <button className="pb-4 text-slate-500 font-bold hover:text-slate-700">Discussions</button>
             </div>
             <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed">
                  In this lesson, we dive deep into the world of User Personas. We'll explore why they are critical for 
                  successful product design and how to create them using real research data. We'll cover:
                </p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-600">
                  <li>Difference between Marketing and UX Personas</li>
                  <li>How to synthesize research interviews</li>
                  <li>Common pitfalls and how to avoid them</li>
                  <li>Template walkthrough for your own project</li>
                </ul>
             </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-96 border-l border-slate-100 flex flex-col h-full overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-900 flex items-center justify-between">
            Course Content
            <span className="text-xs font-normal text-indigo-600">25% Complete</span>
          </h3>
          <div className="w-full h-1.5 bg-slate-200 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-indigo-600 w-1/4"></div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {[
            { section: "Module 1: Introduction", lessons: 3 },
            { section: "Module 2: User Research", lessons: 4 },
            { section: "Module 3: Wireframing", lessons: 5 },
          ].map((module, mIdx) => (
            <div key={mIdx} className="border-b border-slate-100 last:border-0">
              <div className="px-6 py-4 bg-slate-50/30 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                {module.section}
                <ChevronRightIcon size={14} />
              </div>
              <div className="divide-y divide-slate-50">
                {Array.from({ length: module.lessons }).map((_, lIdx) => (
                  <button 
                    key={lIdx} 
                    className={cn(
                      "w-full px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors text-left",
                      mIdx === 0 && lIdx === 1 ? "bg-indigo-50/50 border-l-4 border-indigo-600" : ""
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                      mIdx === 0 && lIdx === 0 ? "bg-emerald-100 text-emerald-600" :
                      mIdx === 0 && lIdx === 1 ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400"
                    )}>
                      {mIdx === 0 && lIdx === 0 ? <CheckCircleIcon size={16} /> : <PlayIcon size={16} />}
                    </div>
                    <div>
                      <h4 className={cn(
                        "text-sm font-bold",
                        mIdx === 0 && lIdx === 1 ? "text-indigo-600" : "text-slate-900"
                      )}>
                        {lIdx === 0 ? "Course Overview" : lIdx === 1 ? "Understanding User Personas" : "Research Methodologies"}
                      </h4>
                      <p className="text-xs text-slate-500">12:45 min</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import { QuizPlayer } from "../components/quiz/QuizComponents";

/** Quiz Page */
export const QuizPage = ({ onNavigate }: { onNavigate: (p: string) => void }) => {
  const [completed, setCompleted] = React.useState(false);

  const quizData = {
    title: "React Fundamentals Quiz",
    questions: [
      {
        id: 1,
        question: "What is the primary purpose of React's useEffect hook?",
        options: [
          "To manage state in functional components",
          "To perform side effects in functional components",
          "To create context for state management",
          "To optimize rendering performance"
        ],
        correctAnswer: 1,
        explanation: "useEffect is used for side effects like API calls, subscriptions, or manually changing the DOM in React functional components."
      },
      {
        id: 2,
        question: "Which of the following is NOT a characteristic of Props in React?",
        options: [
          "They are passed from parent to child",
          "They are read-only (immutable)",
          "They can be modified by the child component",
          "They allow components to be reusable"
        ],
        correctAnswer: 2,
        explanation: "Props are read-only. A child component should never modify the props it receives from its parent."
      },
      {
        id: 3,
        question: "What does JSX stand for?",
        options: [
          "JavaScript XML",
          "Java Standard Extension",
          "JavaScript Syntax Extension",
          "JSON XML"
        ],
        correctAnswer: 0,
        explanation: "JSX stands for JavaScript XML. It allows us to write HTML-like code inside our JavaScript files."
      },
      {
        id: 4,
        question: "How do you define a state variable in a functional component?",
        options: [
          "this.state = {}",
          "const [state, setState] = useState()",
          "const state = useState()",
          "React.defineState()"
        ],
        correctAnswer: 1,
        explanation: "The useState hook returns a pair: the current state value and a function that lets you update it."
      }
    ]
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center p-6 lg:p-10">
      <QuizPlayer 
        quizTitle={quizData.title}
        questions={quizData.questions}
        onComplete={(score, total) => {
          console.log(`Quiz completed! Score: ${score}/${total}`);
          onNavigate('course-detail');
        }}
        onExit={() => onNavigate('course-detail')}
      />
    </div>
  );
};

/** Assignment Page */
export const AssignmentPage = ({ onNavigate }: { onNavigate: (p: string) => void }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10 space-y-8">
      <div className="flex items-center justify-between">
         <button onClick={() => onNavigate('video-lesson')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer">
            <ArrowLeftIcon size={18} /> Back to lesson
         </button>
         <Badge variant="warning" className="px-4 py-1.5 text-sm">Due in 2 days</Badge>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Final Assignment: User Persona Design</h1>
        <p className="text-slate-600">Course: UI/UX Design Fundamentals • Module 2</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <h3 className="font-bold text-lg mb-4">Instructions</h3>
            <div className="prose prose-slate space-y-4 text-slate-600">
              <p>Based on the user research data provided in the previous lessons, create 2 distinct user personas for the "EcoTravel" app project.</p>
              <p>Your personas should include:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Professional/Personal background</li>
                <li>Core needs and motivations</li>
                <li>Main pain points and frustrations</li>
                <li>Technology usage and behavior patterns</li>
              </ul>
              <p>Format: PDF or Figma link. Maximum file size: 20MB.</p>
            </div>
            <div className="mt-8 p-4 bg-indigo-50 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-indigo-600 shadow-sm">
                <FileTextIcon size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">Research_Data_Pack.zip</p>
                <p className="text-xs text-slate-500">Resource • 4.5 MB</p>
              </div>
              <Button variant="ghost" className="text-indigo-600">Download</Button>
            </div>
          </Card>

          <Card className="border-2 border-dashed border-slate-200 bg-slate-50 hover:border-indigo-400 transition-all cursor-pointer p-12 text-center group">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:scale-110 transition-all mx-auto mb-4 shadow-sm">
                <UploadIcon size={32} />
             </div>
             <h3 className="text-lg font-bold text-slate-900">Upload your work</h3>
             <p className="text-slate-500 mb-6 mt-1">Drag and drop your files here, or click to browse</p>
             <div className="flex justify-center gap-4">
               <Button variant="outline">Browse Files</Button>
               <Button>Submit Assignment</Button>
             </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="space-y-6">
            <h3 className="font-bold text-slate-900">Submission Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Status</span>
                <Badge>Not Submitted</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Grade</span>
                <span className="font-medium">---</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Due Date</span>
                <span className="font-medium">Oct 26, 2026</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Time remaining</span>
                <span className="font-medium text-amber-600">1 day 14 hours</span>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900 text-white border-none p-6">
             <h3 className="font-bold mb-4 flex items-center gap-2">
                <MessageSquareIcon size={18} className="text-indigo-400" />
                Comments
             </h3>
             <div className="space-y-4 mb-6">
                <p className="text-xs text-slate-400 italic">No comments from instructor yet.</p>
             </div>
             <textarea 
                placeholder="Add a comment for your instructor..."
                className="w-full bg-slate-800 border-none rounded-xl p-3 text-sm text-white outline-none focus:ring-1 focus:ring-indigo-500"
                rows={3}
             />
             <Button variant="ghost" className="w-full mt-2 text-indigo-400 hover:bg-slate-800">Post Comment</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
