import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, PlusCircle, LogOut, Globe, Sun, Moon, Calendar } from 'lucide-react';
import { auth } from '../services/firebase';
import { cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/articles', icon: FileText, label: 'Articles' },
    { to: '/admin/editor', icon: PlusCircle, label: 'Create Article' },
    { to: '/admin/schedule', icon: Calendar, label: 'Schedule' },
  ];

  return (
    <aside className="w-64 glass h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-bottom border-slate-800">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">S</div>
          SC99 Admin
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-blue-600/10 text-blue-500 border border-blue-600/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              )
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <NavLink
          to="/blog"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all"
        >
          <Globe size={20} />
          <span className="font-medium">Public Site</span>
        </NavLink>
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          <span className="font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <button
          onClick={() => auth.signOut()}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
