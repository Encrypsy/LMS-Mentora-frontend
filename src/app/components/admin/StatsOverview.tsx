import React from "react";
import { 
  Users as UsersIcon, 
  BookOpen as BookOpenIcon, 
  CreditCard as CreditCardIcon, 
  Activity as ActivityIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon
} from "lucide-react";
import { Card, Badge, cn } from "../lms-ui";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

const miniData = [
  { val: 10 }, { val: 25 }, { val: 15 }, { val: 30 }, { val: 20 }, { val: 45 }
];

export const StatsOverview = () => {
  const adminStats = [
    { label: "Total Registered Users", value: "24,512", icon: UsersIcon, color: "bg-indigo-100 text-indigo-600", trend: "+12.5%", isUp: true },
    { label: "Active Users Today", value: "2,345", icon: ActivityIcon, color: "bg-emerald-100 text-emerald-600", trend: "+8.2%", isUp: true },
    { label: "Total Courses", value: "1,840", icon: BookOpenIcon, color: "bg-amber-100 text-amber-600", trend: "+2.4%", isUp: true },
    { label: "Ongoing Classes", value: "452", icon: ActivityIcon, color: "bg-violet-100 text-violet-600", trend: "-1.5%", isUp: false },
    { label: "Revenue", value: "$420.5K", icon: CreditCardIcon, color: "bg-rose-100 text-rose-600", trend: "+18.1%", isUp: true },
    { label: "Uptime", value: "99.9%", icon: ActivityIcon, color: "bg-emerald-100 text-emerald-600", trend: "Stable", isUp: true },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {adminStats.map((stat, i) => (
        <Card key={i} className="p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-300 border-none group">
          <div className="flex items-center justify-between mb-4">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", stat.color)}>
              <stat.icon size={20} />
            </div>
            <div className={cn(
              "flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
              stat.isUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
            )}>
              {stat.isUp ? <TrendingUpIcon size={10} /> : <TrendingDownIcon size={10} />}
              {stat.trend}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-xl font-bold text-slate-900 leading-none">{stat.value}</p>
              <div className="h-8 w-16 opacity-30 group-hover:opacity-100 transition-opacity">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={miniData}>
                     <Area type="monotone" dataKey="val" stroke={stat.isUp ? "#10B981" : "#EF4444"} fill={stat.isUp ? "#10B981" : "#EF4444"} strokeWidth={2} fillOpacity={0.2} />
                   </AreaChart>
                 </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
