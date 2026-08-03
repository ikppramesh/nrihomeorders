'use client';
import { useAuthStore } from '@/lib/auth-store';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const NAV = [
  { href: '/dashboard',              label: 'Home',        icon: '🏠' },
  { href: '/dashboard/new-request',  label: 'New Request', icon: '➕' },
  { href: '/dashboard/orders',       label: 'Orders',      icon: '📋' },
  { href: '/dashboard/renewals',     label: 'Renewals',    icon: '🔔' },
  { href: '/dashboard/messages',     label: 'Messages',    icon: '💬' },
  { href: '/dashboard/profile',      label: 'Profile',     icon: '👤' },
];

function SidebarLink({ href, label, icon, onClick }: { href: string; label: string; icon: string; onClick?: () => void }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href + '/'));
  return (
    <Link href={href} onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
        active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100 active:bg-gray-200'
      }`}>
      <span className="text-lg w-6 text-center">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function BottomNavLink({ href, label, icon }: { href: string; label: string; icon: string }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href + '/'));
  return (
    <Link href={href}
      className={`flex-1 flex flex-col items-center py-2 text-xs font-medium transition-colors ${
        active ? 'text-indigo-600' : 'text-gray-400'
      }`}>
      <span className="text-xl mb-0.5">{icon}</span>
      <span className="hidden xs:block">{label}</span>
    </Link>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile/tablet top header */}
      <header className="lg:hidden sticky top-0 z-40 bg-white border-b shadow-sm px-4 h-14 flex items-center justify-between">
        <span className="font-bold text-indigo-700 text-base">NRI Concierge</span>
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200"
          aria-label="Open menu"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Mobile slide-over drawer */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="relative w-72 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col">
            <div className="p-5 border-b flex items-center justify-between">
              <div>
                <p className="font-bold text-indigo-700">NRI Concierge</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{user.email}</p>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="p-2 text-gray-400 hover:text-gray-700">✕</button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {NAV.map(n => <SidebarLink key={n.href} {...n} onClick={() => setDrawerOpen(false)} />)}
            </nav>
            <div className="p-4 border-t">
              <button
                onClick={() => { clearAuth(); router.push('/'); }}
                className="w-full text-left px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop sidebar — fixed */}
        <aside className="hidden lg:flex w-64 bg-white shadow-sm flex-col fixed top-0 left-0 h-screen z-30 border-r">
          <div className="p-6 border-b">
            <p className="font-bold text-indigo-700 text-lg">NRI Concierge</p>
            <p className="text-xs text-gray-400 mt-1 truncate">{user.email}</p>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {NAV.map(n => <SidebarLink key={n.href} {...n} />)}
          </nav>
          <div className="p-4 border-t">
            <div className="px-3 py-2 text-xs text-gray-500 mb-1 capitalize">{user.name}</div>
            <button
              onClick={() => { clearAuth(); router.push('/'); }}
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl font-medium"
            >
              Sign Out
            </button>
          </div>
        </aside>

        {/* Page content */}
        <main className="flex-1 lg:ml-64 min-h-screen">
          <div className="p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-30 flex safe-bottom">
        {NAV.slice(0, 5).map(n => <BottomNavLink key={n.href} {...n} />)}
      </nav>
    </div>
  );
}
