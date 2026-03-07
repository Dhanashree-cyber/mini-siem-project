import { LayoutDashboard, FileText, Bell, BarChart3 } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
  { name: 'Logs', path: '/logs', icon: <FileText size={20} /> },
  { name: 'Alerts', path: '/alerts', icon: <Bell size={20} /> },
  { name: 'Analytics', path: '/analytics', icon: <BarChart3 size={20} /> },
];

// Inside your Sidebar component return:
{navItems.map((item) => (
  <NavLink to={item.path} className="nav-item" key={item.name}>
    <span className="icon">{item.icon}</span>
    <span className="text">{item.name}</span>
  </NavLink>
))}