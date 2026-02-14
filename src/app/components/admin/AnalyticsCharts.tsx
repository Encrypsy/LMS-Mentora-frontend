import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from "recharts";
import { Card, Button } from "../lms-ui";
import { Filter as FilterIcon, Download as DownloadIcon } from "lucide-react";

const userGrowthData = [
  { name: 'Mon', users: 400, active: 240 },
  { name: 'Tue', users: 300, active: 139 },
  { name: 'Wed', users: 200, active: 980 },
  { name: 'Thu', users: 278, active: 390 },
  { name: 'Fri', users: 189, active: 480 },
  { name: 'Sat', users: 239, active: 380 },
  { name: 'Sun', users: 349, active: 430 },
];

const courseEngagementData = [
  { name: 'UI/UX', time: 45 },
  { name: 'Dev', time: 32 },
  { name: 'Mark.', time: 28 },
  { name: 'Data', time: 55 },
  { name: 'Bus.', time: 40 },
];

const completionData = [
  { name: 'Completed', value: 65 },
  { name: 'In Progress', value: 25 },
  { name: 'Not Started', value: 10 },
];

const COLORS = ['#6366F1', '#10B981', '#F59E0B'];

export const AnalyticsCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">User Growth & Engagement</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs h-8"><FilterIcon size={14} /> Weekly</Button>
            <Button variant="outline" size="sm" className="text-xs h-8"><DownloadIcon size={14} /></Button>
          </div>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={userGrowthData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Area type="monotone" dataKey="users" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Course Engagement (Avg. Hrs)</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseEngagementData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="time" fill="#6366F1" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Assignment Completion</h3>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {completionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {completionData.map((data, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                  <span className="text-xs text-slate-600">{data.name}</span>
                </div>
                <span className="text-xs font-bold text-slate-900">{data.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
