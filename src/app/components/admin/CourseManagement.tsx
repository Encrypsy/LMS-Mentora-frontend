import React, { useState } from "react";
import { 
  Plus as PlusIcon, 
  Search as SearchIcon, 
  MoreVertical as MoreVerticalIcon,
  Users as UsersIcon,
  CheckCircle2 as CheckCircle2Icon,
  Clock as ClockIcon,
  BookOpen as BookOpenIcon,
  Trash2 as Trash2Icon,
  Edit as EditIcon,
  Archive as ArchiveIcon,
  ExternalLink as ExternalLinkIcon,
  Star as StarIcon
} from "lucide-react";
import { Button, Card, Badge, cn } from "../lms-ui";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export const CourseManagement = () => {
  const [courses] = useState([
    { id: 1, title: "UI/UX Design Masterclass", instructor: "Dr. Sarah Miller", students: 1240, completion: 85, status: "Published", rating: 4.9, thumbnail: "https://images.unsplash.com/photo-1541462608141-ad4d01947f9d?q=80&w=200" },
    { id: 2, title: "Advanced Prototyping", instructor: "James Wilson", students: 850, completion: 62, status: "Published", rating: 4.7, thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=200" },
    { id: 3, title: "Digital Marketing 101", instructor: "Emily Blunt", students: 2100, completion: 45, status: "Draft", rating: 0, thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=200" },
    { id: 4, title: "Backend Dev with Node.js", instructor: "Michael Scott", students: 540, completion: 78, status: "Archived", rating: 4.5, thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=200" },
    { id: 5, title: "Data Science Fundamentals", instructor: "Sarah Miller", students: 920, completion: 92, status: "Published", rating: 4.8, thumbnail: "https://images.unsplash.com/photo-1551288049-bbda38a5f452?q=80&w=200" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Course Administration</h2>
          <p className="text-slate-500">Audit, modify, and manage all courses on the platform.</p>
        </div>
        <Button className="flex gap-2">
          <PlusIcon size={18} /> Create Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="p-0 overflow-hidden flex flex-col group border-none shadow-md hover:shadow-xl transition-all duration-300">
            <div className="relative h-40 overflow-hidden">
              <ImageWithFallback src={course.thumbnail} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute top-3 left-3">
                <Badge variant={course.status === 'Published' ? 'success' : course.status === 'Archived' ? 'danger' : 'default'} className="backdrop-blur-md bg-white/90 shadow-sm border-none">
                  {course.status}
                </Badge>
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button variant="secondary" size="sm" className="bg-white text-slate-900">Edit</Button>
                <Button variant="secondary" size="sm" className="bg-white text-slate-900">View</Button>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-900 line-clamp-2 leading-tight flex-1">{course.title}</h3>
                <button className="text-slate-400 hover:text-indigo-600 transition-colors"><MoreVerticalIcon size={18} /></button>
              </div>
              <p className="text-xs text-slate-500 mb-4 flex items-center gap-1.5 font-medium">
                <BookOpenIcon size={14} className="text-indigo-500" /> {course.instructor}
              </p>
              
              <div className="space-y-3 mt-auto">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Students enrolled</span>
                  <span className="text-slate-900 font-bold">{course.students.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${course.completion}%` }}></div>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-1">
                      <StarIcon size={14} className="text-amber-400 fill-amber-400" />
                      <span className="text-sm font-bold text-slate-900">{course.rating || 'N/A'}</span>
                   </div>
                   <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <ImageWithFallback key={i} src={`https://i.pravatar.cc/100?u=${i + 20}`} className="w-6 h-6 rounded-full border-2 border-white" />
                      ))}
                      <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-500">
                        +12
                      </div>
                   </div>
                </div>
              </div>
            </div>
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
               <button className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider flex items-center gap-1">
                 View Analytics <ExternalLinkIcon size={12} />
               </button>
               <div className="flex gap-2">
                 <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2Icon size={14} /></button>
                 <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"><ArchiveIcon size={14} /></button>
               </div>
            </div>
          </Card>
        ))}
        
        <button className="border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 hover:bg-indigo-50/30 transition-all group min-h-[300px]">
           <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
             <PlusIcon size={24} />
           </div>
           <span className="font-bold">Create New Course</span>
           <p className="text-xs text-slate-400 mt-1">Start from scratch or use template</p>
        </button>
      </div>
    </div>
  );
};
