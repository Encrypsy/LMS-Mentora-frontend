import React, { useState } from "react";
import { 
  Search as SearchIcon, 
  Filter as FilterIcon, 
  MoreVertical as MoreVerticalIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  ShieldAlert as ShieldAlertIcon,
  Mail as MailIcon,
  CheckCircle2 as CheckCircle2Icon,
  Clock as ClockIcon
} from "lucide-react";
import { Button, Input, Card, Badge, cn } from "../lms-ui";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export const UserManagement = () => {
  const [search, setSearch] = useState("");

  const users = [
    { id: 1, name: "John Cooper", email: "john@example.com", role: "Student", joined: "Oct 12, 2025", status: "Active", lastLogin: "2h ago" },
    { id: 2, name: "Sarah Miller", email: "sarah@edu.com", role: "Teacher", joined: "Aug 05, 2025", status: "Active", lastLogin: "10m ago" },
    { id: 3, name: "David Wilson", email: "david@test.com", role: "Student", joined: "Sep 22, 2025", status: "Suspended", lastLogin: "3 days ago" },
    { id: 4, name: "Emily Blunt", email: "emily@school.com", role: "Teacher", joined: "Jan 10, 2025", status: "Active", lastLogin: "1h ago" },
    { id: 5, name: "Marcus Aurelius", email: "marcus@philosophy.com", role: "Student", joined: "Nov 01, 2025", status: "Pending", lastLogin: "Never" },
    { id: 6, name: "Ada Lovelace", email: "ada@computing.org", role: "Teacher", joined: "Feb 14, 2025", status: "Active", lastLogin: "5m ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            placeholder="Search by name, email or role..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex gap-2">
            <FilterIcon size={18} /> Filters
          </Button>
          <Button className="flex gap-2">
            Add New User
          </Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4">
                  <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User Details</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Registration</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <ImageWithFallback src={`https://i.pravatar.cc/150?u=${user.id}`} className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={user.role === 'Teacher' ? 'indigo' : 'default'} className="font-medium">
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{user.joined}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <ClockIcon size={14} className="text-slate-400" />
                      {user.lastLogin}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        user.status === 'Active' ? "bg-emerald-500" : user.status === 'Suspended' ? "bg-red-500" : "bg-amber-500"
                      )}></div>
                      <span className="text-sm font-medium text-slate-700">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" title="Edit"><EditIcon size={16} /></Button>
                      <Button variant="ghost" size="icon" title="Reset Password" className="text-amber-600"><ShieldAlertIcon size={16} /></Button>
                      <Button variant="ghost" size="icon" title="Send Email"><MailIcon size={16} /></Button>
                      <Button variant="ghost" size="icon" title="Suspend" className="text-red-600"><Trash2Icon size={16} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs font-medium text-slate-500">Showing 6 of 2,345 users</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-indigo-600 text-white">
          <h4 className="font-bold mb-2">Bulk Actions</h4>
          <p className="text-indigo-100 text-sm mb-4">Select multiple users to perform collective actions like role updates or suspension.</p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-none">Bulk Suspend</Button>
            <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-none">Export Selected</Button>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2Icon size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Identity Verification</p>
            <p className="text-2xl font-bold text-slate-900">98.2%</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
            <ShieldAlertIcon size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Flagged Accounts</p>
            <p className="text-2xl font-bold text-slate-900">12</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
