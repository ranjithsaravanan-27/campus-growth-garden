import { Link, useLocation } from 'react-router-dom';
import { TreesIcon, LayoutDashboard, Users, User } from 'lucide-react';

const navItems = [
  { to: '/', icon: TreesIcon, label: 'Home' },
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/team', icon: Users, label: 'Team' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 glass-panel px-2 py-2 flex items-center gap-1 md:top-4 md:bottom-auto">
      <div className="flex items-center gap-1.5 px-2 mr-2 border-r border-border">
        <TreesIcon className="w-4 h-4 text-primary" />
        <span className="font-bold text-sm text-foreground hidden md:block">Co-op Campus</span>
      </div>
      {navItems.map(({ to, icon: Icon, label }) => {
        const active = location.pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              active
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden md:inline">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
