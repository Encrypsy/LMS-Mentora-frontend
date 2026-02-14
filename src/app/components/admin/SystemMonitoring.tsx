import React from "react";
import { 
  Activity as ActivityIcon, 
  Cpu as CpuIcon, 
  Database as DatabaseIcon, 
  Server as ServerIcon,
  ShieldAlert as ShieldAlertIcon,
  CheckCircle2 as CheckCircle2Icon,
  AlertTriangle as AlertTriangleIcon,
  Terminal as TerminalIcon,
  Wifi as WifiIcon,
  Clock as ClockIcon
} from "lucide-react";
import { Card, Badge, cn, Button } from "../lms-ui";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const performanceData = [
  { time: '00:00', cpu: 32, ram: 45, load: 1.2 },
  { time: '04:00', cpu: 28, ram: 42, load: 0.8 },
  { time: '08:00', cpu: 65, ram: 78, load: 3.5 },
  { time: '12:00', cpu: 82, ram: 88, load: 5.2 },
  { time: '16:00', cpu: 75, ram: 82, load: 4.1 },
  { time: '20:00', cpu: 45, ram: 60, load: 2.1 },
  { time: '23:59', cpu: 35, ram: 48, load: 1.5 },
];

export const SystemMonitoring = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex items-center gap-4 border-l-4 border-l-emerald-500">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <ServerIcon size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Main Server</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-slate-900">Online</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
          </div>
        </Card>
        
        <Card className="flex items-center gap-4 border-l-4 border-l-indigo-500">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <DatabaseIcon size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">DB Capacity</p>
            <p className="text-2xl font-bold text-slate-900">42.8 GB <span className="text-sm font-normal text-slate-400">/ 100GB</span></p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border-l-4 border-l-amber-500">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <ShieldAlertIcon size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Threats</p>
            <p className="text-2xl font-bold text-slate-900">0</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 border-l-4 border-l-violet-500">
          <div className="p-3 bg-violet-50 text-violet-600 rounded-2xl">
            <WifiIcon size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">API Latency</p>
            <p className="text-2xl font-bold text-slate-900">24ms</p>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
             <div>
               <h3 className="text-xl font-bold text-slate-900">Infrastructure Performance</h3>
               <p className="text-sm text-slate-500">Real-time resource utilization across nodes.</p>
             </div>
             <div className="flex gap-2">
               <Badge variant="success" className="bg-emerald-50 text-emerald-600">CPU</Badge>
               <Badge className="bg-indigo-50 text-indigo-600">RAM</Badge>
             </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="cpu" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorCpu)" />
                <Area type="monotone" dataKey="ram" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorRam)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">System Logs</h3>
            <TerminalIcon size={18} className="text-slate-400" />
          </div>
          <div className="space-y-4">
            {[
              { type: 'info', msg: 'Automatic backup completed', time: '10:45 AM', icon: CheckCircle2Icon, color: 'text-emerald-500' },
              { type: 'warning', msg: 'High disk usage detected in node-4', time: '09:22 AM', icon: AlertTriangleIcon, color: 'text-amber-500' },
              { type: 'error', msg: 'Failed login attempt from IP 192.168.1.1', time: '08:15 AM', icon: ShieldAlertIcon, color: 'text-red-500' },
              { type: 'info', msg: 'New course "UI/UX" published', time: 'Yesterday', icon: CheckCircle2Icon, color: 'text-emerald-500' },
              { type: 'info', msg: 'System update v2.4.0 applied', time: 'Oct 20', icon: ClockIcon, color: 'text-indigo-500' },
            ].map((log, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className={cn("shrink-0 mt-1", log.color)}>
                  <log.icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 line-clamp-1">{log.msg}</p>
                  <p className="text-xs text-slate-500">{log.time}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100"><ExternalLinkIcon size={12} /></Button>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full text-xs py-2">View Full Console Logs</Button>
        </Card>
      </div>

      <Card className="bg-slate-900 text-white p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-lg">
            <h3 className="text-2xl font-bold">Scheduled Maintenance</h3>
            <p className="text-slate-400">The platform will undergo scheduled maintenance on <span className="text-indigo-400 font-bold">Sunday, Feb 8th (02:00 - 04:00 GMT)</span>. All services will be temporarily unavailable.</p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-indigo-500 text-white border-none">Active Notification</Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="text-white border-slate-700 hover:bg-slate-800">Reschedule</Button>
             <Button className="bg-white text-slate-900 hover:bg-slate-100">Notify Users</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

const ExternalLinkIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);
