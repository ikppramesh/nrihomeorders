import { NavLink } from 'react-router-dom';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg flex">
      {[
        { to: '/', label: 'Tasks', icon: '📋' },
        { to: '/profile', label: 'Profile', icon: '👤' },
      ].map(({ to, label, icon }) => (
        <NavLink key={to} to={to} end
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center py-3 text-xs font-medium ${isActive ? 'text-indigo-600' : 'text-gray-500'}`
          }>
          <span className="text-xl mb-0.5">{icon}</span>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
