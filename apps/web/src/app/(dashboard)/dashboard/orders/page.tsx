'use client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { api } from '@/lib/api';
import { StatusBadge } from '@homebridge/ui';
import Link from 'next/link';

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ['orders', page],
    queryFn: () => api.get(`/orders?page=${page}&limit=20`).then(r => r.data),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Orders</h1>
        <Link
          href="/dashboard/new-request"
          className="bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium hover:bg-indigo-700"
        >
          + New
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-400 text-sm">Loading orders…</div>
        ) : !data?.orders?.length ? (
          <div className="p-12 text-center">
            <div className="text-3xl mb-3">📭</div>
            <p className="text-gray-500 text-sm">No orders found.</p>
            <Link href="/dashboard/new-request"
              className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold">
              New Request
            </Link>
          </div>
        ) : (
          <>
            {/* Mobile/tablet card list */}
            <div className="md:hidden divide-y">
              {data?.orders?.map((o: any) => (
                <Link
                  key={o.id}
                  href={`/dashboard/orders/${o.id}`}
                  className="block p-4 hover:bg-gray-50 active:bg-gray-100"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-semibold text-gray-900 text-sm flex-1 min-w-0 truncate">{o.title}</p>
                    <StatusBadge status={o.status} />
                  </div>
                  <p className="text-xs font-mono text-indigo-600">{o.orderNumber}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                    <span>{o.serviceType?.replace(/_/g, ' ')}</span>
                    <span>·</span>
                    <span>{new Date(o.createdAt).toLocaleDateString()}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop table */}
            <table className="hidden md:table w-full text-sm">
              <thead className="bg-gray-50 text-left border-b">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wide">Order #</th>
                  <th className="px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wide">Title</th>
                  <th className="px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wide hidden lg:table-cell">Type</th>
                  <th className="px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wide hidden lg:table-cell">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data?.orders?.map((o: any) => (
                  <tr key={o.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/dashboard/orders/${o.id}`} className="text-indigo-600 font-mono text-xs hover:underline">
                        {o.orderNumber}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-medium max-w-[220px] truncate">{o.title}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell">{o.serviceType?.replace(/_/g, ' ')}</td>
                    <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                    <td className="px-4 py-3 text-gray-400 text-xs hidden lg:table-cell">{new Date(o.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {data && data.total > 20 && (
          <div className="p-4 border-t flex justify-between items-center text-sm">
            <span className="text-gray-500 text-xs sm:text-sm">{data.total} total</span>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                className="px-3 py-1.5 border rounded-lg disabled:opacity-40 text-sm hover:bg-gray-50">Prev</button>
              <button disabled={page * 20 >= data.total} onClick={() => setPage(p => p + 1)}
                className="px-3 py-1.5 border rounded-lg disabled:opacity-40 text-sm hover:bg-gray-50">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
