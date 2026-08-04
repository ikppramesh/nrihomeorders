'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';
import { StatusBadge } from '@homebridge/ui';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ['orders', 'recent'],
    queryFn: () => api.get('/orders?limit=5').then(r => r.data),
  });

  return (
    <div>
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Welcome back, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">Your NRI Concierge dashboard</p>
      </div>

      {/* Quick action cards — 2 col on all sizes */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
        <Link
          href="/dashboard/new-request?type=NRI_SEVA_BILL_PAYMENT"
          className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:border-indigo-300 active:bg-indigo-50 transition-all"
        >
          <div className="text-2xl sm:text-4xl mb-2 sm:mb-3">🇮🇳</div>
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">NRI Seva</h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-snug">Bills, insurance, govt fees</p>
        </Link>
        <Link
          href="/dashboard/new-request?type=SHOP_INDIA_PRODUCT_SOURCING"
          className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:border-indigo-300 active:bg-indigo-50 transition-all"
        >
          <div className="text-2xl sm:text-4xl mb-2 sm:mb-3">📦</div>
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Shop India</h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-snug">Source, inspect & ship</p>
        </Link>
      </div>

      {/* Trust strip */}
      <div className="bg-indigo-50 rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-3 sm:gap-6">
        {[
          { icon: '🔍', text: 'Zero hidden fees' },
          { icon: '📸', text: 'Physical inspection' },
          { icon: '💬', text: 'Real-time updates' },
        ].map(({ icon, text }) => (
          <div key={text} className="flex items-center gap-2 text-sm text-indigo-700">
            <span>{icon}</span>
            <span className="font-medium">{text}</span>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 sm:p-5 border-b flex justify-between items-center">
          <h2 className="font-semibold text-gray-900 text-sm sm:text-base">Recent Orders</h2>
          <Link href="/dashboard/orders" className="text-xs sm:text-sm text-indigo-600 hover:underline font-medium">
            View all →
          </Link>
        </div>
        <div className="divide-y">
          {isLoading ? (
            <div className="p-8 text-center text-gray-400 text-sm">Loading…</div>
          ) : !data?.orders?.length ? (
            <div className="p-8 sm:p-12 text-center">
              <div className="text-3xl mb-3">📭</div>
              <p className="text-gray-500 text-sm">No orders yet.</p>
              <Link
                href="/dashboard/new-request"
                className="mt-4 inline-block bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700"
              >
                Place your first request
              </Link>
            </div>
          ) : (
            data?.orders?.map((order: any) => (
              <Link
                key={order.id}
                href={`/dashboard/orders/${order.id}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="flex-1 min-w-0 pr-3">
                  <p className="font-medium text-gray-900 text-sm truncate">{order.title}</p>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">{order.orderNumber}</p>
                </div>
                <StatusBadge status={order.status} />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
