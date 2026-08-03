import { Outlet, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAdminAuth } from '../lib/auth-store';

const NAV = [
  { to: '/dashboard', label: 'Dashboard',  icon: '📊' },
  { to: '/orders',    label: 'Orders',     icon: '📋' },
  { to: '/customers', label: 'Customers',  icon: '👥' },
  { to: '/whatsapp',  label: 'WhatsApp',   icon: '💬' },
  { to: '/agents',    label: 'Agents',     icon: '🧑‍💼' },
];

function NavItem({ to, label, icon, onClick }: { to: string; label: string; icon: string; onClick?: () => void }) {
  return (
    <NavLink key={to} to={to} onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800 active:bg-slate-700'}`
      }>
      <span>{icon}</span>{label}
    </NavLink>
  );
}

export default function Layout() {
  const { admin, clearAuth } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile/tablet top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-slate-900 text-white flex items-center justify-between px-4 h-14 shadow-md">
        <p className="font-bold text-base">NRI Admin</p>
        <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg hover:bg-slate-700 active:bg-slate-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Mobile slide-over */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 bg-slate-900 text-white flex flex-col shadow-2xl">
            <div className="p-5 border-b border-slate-700 flex items-center justify-between">
              <div>
                <p className="font-bold text-base">NRI Concierge</p>
                <p className="text-slate-400 text-xs mt-0.5">Admin Panel</p>
              </div>
              <button onClick={() => setMobileOpen(false)} className="text-slate-400 hover:text-white p-1">✕</button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {NAV.map(n => <NavItem key={n.to} {...n} onClick={() => setMobileOpen(false)} />)}
            </nav>
            <div className="p-4 border-t border-slate-700">
              <p className="text-xs text-slate-400 truncate mb-2">{admin?.email}</p>
              <button onClick={clearAuth} className="text-xs text-red-400 hover:text-red-300">Sign Out</button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 bg-slate-900 text-white flex-col fixed top-0 left-0 h-full z-30">
        <div className="p-5 border-b border-slate-700">
          <p className="font-bold text-lg">NRI Concierge</p>
          <p className="text-slate-400 text-xs mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV.map(n => <NavItem key={n.to} {...n} />)}
        </nav>
        <div className="p-4 border-t border-slate-700">
          <p className="text-xs text-slate-400 truncate mb-2">{admin?.email}</p>
          <button onClick={clearAuth} className="text-xs text-red-400 hover:text-red-300">Sign Out</button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-56 overflow-y-auto pt-14 lg:pt-0 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
