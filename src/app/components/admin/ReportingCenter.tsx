import React from "react";
import { 
  FileText as FileTextIcon, 
  Download as DownloadIcon, 
  Calendar as CalendarIcon, 
  Filter as FilterIcon,
  BarChart3 as BarChart3Icon,
  PieChart as PieChartIcon,
  TrendingUp as TrendingUpIcon,
  ArrowRight as ArrowRightIcon,
  Clock as ClockIcon,
  CheckCircle2 as CheckCircle2Icon,
  Trash2Icon
} from "lucide-react";
import { Card, Button, Input, cn, Badge } from "../lms-ui";

export const ReportingCenter = () => {
  const reportTypes = [
    { title: "Student Performance", desc: "Detailed analysis of grades, attendance, and completion.", icon: TrendingUpIcon, color: "bg-emerald-50 text-emerald-600" },
    { title: "Financial Report", desc: "Revenue breakdown, subscriptions, and transaction history.", icon: BarChart3Icon, color: "bg-indigo-50 text-indigo-600" },
    { title: "Course Popularity", desc: "Engagement metrics and enrollment trends per course.", icon: PieChartIcon, color: "bg-violet-50 text-violet-600" },
    { title: "User Retention", desc: "Dropout analysis and platform stickiness metrics.", icon: FileTextIcon, color: "bg-amber-50 text-amber-600" },
  ];

  const recentReports = [
    { name: "Monthly_Financial_Jan_2026.pdf", type: "Financial", date: "Feb 01, 2026", size: "2.4 MB", status: "Generated" },
    { name: "Student_Completion_Audit.csv", type: "Performance", date: "Jan 28, 2026", size: "1.1 MB", status: "Generated" },
    { name: "dropout_analysis_q4.pdf", type: "Retention", date: "Jan 15, 2026", size: "4.8 MB", status: "Archived" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Reporting Center</h2>
          <p className="text-slate-500">Generate and schedule customized data reports.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex gap-2">
            <CalendarIcon size={18} /> Jan 01 - Feb 04
          </Button>
          <Button className="flex gap-2">
            <PlusIcon size={18} /> New Report
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportTypes.map((report, i) => (
          <Card key={i} className="group hover:border-indigo-200 transition-all cursor-pointer flex flex-col h-full">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", report.color)}>
              <report.icon size={24} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{report.title}</h3>
            <p className="text-sm text-slate-500 mb-6 flex-1">{report.desc}</p>
            <button className="text-xs font-bold text-slate-900 flex items-center gap-1 uppercase tracking-wider group-hover:gap-2 transition-all">
              Generate Now <ArrowRightIcon size={14} />
            </button>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Recent Generated Reports</h3>
            <Button variant="ghost" size="sm" className="text-indigo-600">Clear History</Button>
          </div>
          <div className="space-y-4">
            {recentReports.map((report, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                    <FileTextIcon size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{report.name}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{report.type}</span>
                      <span>•</span>
                      <span>{report.date}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600"><DownloadIcon size={18} /></Button>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500"><Trash2Icon size={18} /></Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-6 bg-indigo-50 border-indigo-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <ClockIcon size={20} />
            </div>
            <h3 className="text-xl font-bold text-indigo-900">Scheduled Reports</h3>
          </div>
          <p className="text-sm text-indigo-700/80">Automate your data analysis by scheduling reports to your email.</p>
          <div className="space-y-3">
            {[
              { name: 'Weekly Platform Stats', frequency: 'Every Monday', nextRun: 'Feb 09' },
              { name: 'Monthly Financial Audit', frequency: '1st of Month', nextRun: 'Mar 01' },
            ].map((schedule, i) => (
              <div key={i} className="bg-white/80 p-3 rounded-xl border border-indigo-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-indigo-900">{schedule.name}</p>
                  <p className="text-[10px] text-indigo-600 font-medium uppercase tracking-tight">{schedule.frequency}</p>
                </div>
                <Badge variant="indigo" className="text-[10px] bg-indigo-100 text-indigo-700">{schedule.nextRun}</Badge>
              </div>
            ))}
          </div>
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white border-none mt-4">Create Schedule</Button>
        </Card>
      </div>
    </div>
  );
};

const PlusIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
