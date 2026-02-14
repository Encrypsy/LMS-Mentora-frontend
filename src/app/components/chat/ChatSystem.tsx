import React, { useState } from "react";
import { 
  MessageSquare as MessageSquareIcon, 
  X as XIcon, 
  Send as SendIcon, 
  Search as SearchIcon, 
  Paperclip as PaperclipIcon, 
  Smile as SmileIcon, 
  MoreVertical as MoreVerticalIcon,
  Phone as PhoneIcon,
  Video as VideoIcon,
  Users as UsersIcon,
  Megaphone as MegaphoneIcon,
  LifeBuoy as LifeBuoyIcon,
  Check as CheckIcon,
  CheckCheck as CheckCheckIcon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button, Input, Card, Badge, cn } from "../lms-ui";
import { ImageWithFallback } from "../figma/ImageWithFallback";

type ChatType = 'individual' | 'group' | 'announcement' | 'support';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  attachments?: { name: string; type: string; url: string }[];
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  online: boolean;
  type: ChatType;
  role?: string;
}

const mockConversations: Conversation[] = [
  { id: '1', name: 'Dr. Sarah Miller', avatar: 'https://i.pravatar.cc/150?u=sarah', lastMessage: 'The new assignment is up!', timestamp: '10:45 AM', unreadCount: 2, online: true, type: 'individual', role: 'Teacher' },
  { id: '2', name: 'UI/UX Design Group', avatar: 'https://i.pravatar.cc/150?u=group1', lastMessage: 'Alex: Check out this link.', timestamp: 'Yesterday', unreadCount: 0, online: false, type: 'group' },
  { id: '3', name: 'System Announcements', avatar: 'https://i.pravatar.cc/150?u=system', lastMessage: 'Maintenance scheduled for Sunday.', timestamp: '2 days ago', unreadCount: 0, online: true, type: 'announcement' },
  { id: '4', name: 'Technical Support', avatar: 'https://i.pravatar.cc/150?u=support', lastMessage: 'How can we help you today?', timestamp: 'Oct 20', unreadCount: 0, online: true, type: 'support' },
  { id: '5', name: 'John Cooper', avatar: 'https://i.pravatar.cc/150?u=john', lastMessage: 'Did you finish the homework?', timestamp: 'Oct 19', unreadCount: 0, online: false, type: 'individual', role: 'Student' },
];

const mockMessages: Record<string, Message[]> = {
  '1': [
    { id: 'm1', senderId: 'sarah', text: 'Hello Alex! How is the UI project going?', timestamp: '10:30 AM', status: 'read' },
    { id: 'm2', senderId: 'me', text: 'Hi Dr. Miller! It is going well, I just finished the wireframes.', timestamp: '10:35 AM', status: 'read' },
    { id: 'm3', senderId: 'sarah', text: 'Great! I have posted the next steps in the course module.', timestamp: '10:40 AM', status: 'read' },
    { id: 'm4', senderId: 'sarah', text: 'The new assignment is up!', timestamp: '10:45 AM', status: 'delivered' },
  ]
};

export const ChatSystem = ({ role }: { role: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(mockConversations[0].id);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const activeConv = mockConversations.find(c => c.id === activeTab) || mockConversations[0];
  const messages = mockMessages[activeTab] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    // In a real app, this would send to a backend
    setMessageText("");
  };

  const getChatIcon = (type: ChatType) => {
    switch (type) {
      case 'group': return <UsersIcon size={14} />;
      case 'announcement': return <MegaphoneIcon size={14} />;
      case 'support': return <LifeBuoyIcon size={14} />;
      default: return null;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[90vw] md:w-[800px] h-[600px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-slate-100 flex overflow-hidden"
          >
            {/* Conversations Sidebar */}
            <div className="w-1/3 border-r border-slate-100 flex flex-col bg-slate-50/50">
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-lg">Messages</h3>
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <PlusIcon size={16} />
                  </div>
                </div>
                <div className="relative">
                  <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    placeholder="Search chats..."
                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-2 space-y-1">
                {mockConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setActiveTab(conv.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-2xl transition-all relative group",
                      activeTab === conv.id ? "bg-white shadow-sm ring-1 ring-slate-100" : "hover:bg-white/60"
                    )}
                  >
                    <div className="relative shrink-0">
                      <ImageWithFallback src={conv.avatar} className="w-11 h-11 rounded-full object-cover" />
                      {conv.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-slate-900 text-sm truncate">{conv.name}</span>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">{conv.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {conv.type !== 'individual' && (
                          <span className="text-indigo-600 shrink-0">{getChatIcon(conv.type)}</span>
                        )}
                        <p className="text-xs text-slate-500 truncate">{conv.lastMessage}</p>
                      </div>
                    </div>
                    {conv.unreadCount > 0 && (
                      <div className="absolute right-2 top-8 w-5 h-5 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                        {conv.unreadCount}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
              {/* Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ImageWithFallback src={activeConv.avatar} className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 leading-tight">{activeConv.name}</h4>
                      {activeConv.role && <Badge variant="indigo" className="text-[10px] px-1.5 py-0">{activeConv.role}</Badge>}
                    </div>
                    <p className="text-xs text-emerald-500 font-medium">{activeConv.online ? 'Online' : 'Last seen 5m ago'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600"><PhoneIcon size={18} /></Button>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600"><VideoIcon size={18} /></Button>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600"><MoreVerticalIcon size={18} /></Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/30">
                <div className="text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-100">Today</span>
                </div>

                {messages.map((msg) => (
                  <div key={msg.id} className={cn("flex flex-col", msg.senderId === 'me' ? "items-end" : "items-start")}>
                    <div className={cn(
                      "max-w-[80%] px-4 py-2.5 rounded-2xl text-sm shadow-sm",
                      msg.senderId === 'me' 
                        ? "bg-indigo-600 text-white rounded-tr-none" 
                        : "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                    )}>
                      {msg.text}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 px-1">
                      <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                      {msg.senderId === 'me' && (
                        msg.status === 'read' ? <CheckCheckIcon size={12} className="text-indigo-600" /> : <CheckIcon size={12} className="text-slate-300" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-slate-100">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <div className="flex items-center gap-1 mr-1">
                    <Button type="button" variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600"><PaperclipIcon size={18} /></Button>
                    <Button type="button" variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600"><SmileIcon size={18} /></Button>
                  </div>
                  <div className="flex-1 relative">
                    <input 
                      placeholder="Type a message..."
                      className="w-full pl-4 pr-12 py-3 bg-slate-100 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    />
                    <button 
                      type="submit"
                      disabled={!messageText.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <SendIcon size={16} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white transition-all cursor-pointer relative",
          isOpen ? "bg-slate-900 rotate-90" : "bg-indigo-600"
        )}
      >
        {isOpen ? <XIcon size={24} /> : <MessageSquareIcon size={24} />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-white flex items-center justify-center">
            2
          </div>
        )}
      </motion.button>
    </div>
  );
};

const PlusIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
