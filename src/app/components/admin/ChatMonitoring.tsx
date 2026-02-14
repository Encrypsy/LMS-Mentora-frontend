import React from "react";
import { 
  Shield as ShieldIcon, 
  Search as SearchIcon, 
  Filter as FilterIcon,
  MessageSquare as MessageSquareIcon,
  AlertTriangle as AlertTriangleIcon,
  Flag as FlagIcon,
  Trash2 as Trash2Icon,
  Lock as LockIcon,
  Eye as EyeIcon,
  MoreVertical as MoreVerticalIcon
} from "lucide-react";
import { Card, Button, Input, Badge, cn } from "../lms-ui";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export const ChatMonitoring = () => {
  const flaggedMessages = [
    { id: 1, user: "John Cooper", role: "Student", msg: "This platform is so slow, I hate it!", reason: "Keyword: 'hate'", severity: "Low", date: "2h ago" },
    { id: 2, user: "Anonymous User", role: "Guest", msg: "Check out this scam link: bit.ly/spam", reason: "Potential Phishing", severity: "High", date: "4h ago" },
    { id: 3, user: "Sarah Miller", role: "Teacher", msg: "Please stop spamming the group chat.", reason: "Reported by 5 users", severity: "Medium", date: "1 day ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <MessageSquareIcon size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Chats Today</p>
            <p className="text-2xl font-bold text-slate-900">4,820</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
            <AlertTriangleIcon size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Flagged Content</p>
            <p className="text-2xl font-bold text-slate-900">12</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldIcon size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Auto-Resolved</p>
            <p className="text-2xl font-bold text-slate-900">156</p>
          </div>
        </Card>
      </div>

      <Card className="space-y-6">
        <div className="flex items-center justify-between">
           <h3 className="text-xl font-bold text-slate-900">Moderation Queue</h3>
           <div className="flex gap-2">
             <Button variant="outline" size="sm" className="text-xs">Export Logs</Button>
             <Button size="sm" className="text-xs">Global Filters</Button>
           </div>
        </div>

        <div className="space-y-4">
           {flaggedMessages.map((item) => (
             <div key={item.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <div className="flex items-start gap-3">
                   <ImageWithFallback src={`https://i.pravatar.cc/150?u=${item.id + 50}`} className="w-10 h-10 rounded-full shrink-0" />
                   <div>
                     <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900 text-sm">{item.user}</span>
                        <Badge className="text-[10px] py-0">{item.role}</Badge>
                        <span className="text-[10px] text-slate-400 font-medium">• {item.date}</span>
                     </div>
                     <p className="text-sm text-slate-600 bg-white p-2 rounded-xl border border-slate-100 inline-block">"{item.msg}"</p>
                     <div className="mt-2 flex items-center gap-2">
                        <FlagIcon size={12} className="text-red-500" />
                        <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">Issue: {item.reason}</span>
                        <Badge variant={item.severity === 'High' ? 'danger' : item.severity === 'Medium' ? 'warning' : 'default'} className="text-[8px] px-1.5 h-4">
                          {item.severity} Priority
                        </Badge>
                     </div>
                   </div>
                 </div>
                 <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-xs flex gap-1.5"><EyeIcon size={14} /> View Context</Button>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600"><LockIcon size={16} /></Button>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-600"><Trash2Icon size={16} /></Button>
                    <Button variant="ghost" size="icon" className="text-slate-400"><MoreVerticalIcon size={16} /></Button>
                 </div>
               </div>
             </div>
           ))}
        </div>
        <Button variant="outline" className="w-full text-xs">View All Flagged Content</Button>
      </Card>
    </div>
  );
};
