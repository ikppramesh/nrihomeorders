import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { StatusBadge } from '@homebridge/ui';

const STATUSES = [
  'ALL', 'NEW_REQUEST', 'UNDER_REVIEW', 'QUOTE_SENT', 'QUOTE_EXPIRED',
  'APPROVED_PAID', 'SOURCING', 'QUALITY_CHECK', 'QC_ADMIN_REVIEW', 'QC_APPROVED',
  'PACKING', 'CUSTOMS_DOCS', 'DISPATCHED', 'IN_TRANSIT', 'DELIVERED',
  'COMPLETED', 'NEEDS_REAPPROVAL', 'CANCELLED', 'ARCHIVED',
];

export default function OrdersPage() {
  const [status, setStatus] = useState('ALL');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-orders', status, page, search],
    queryFn: () => api.get('/admin/orders', { params: { status: status === 'ALL' ? undefined : status, page, limit: 25, search: search || undefined } }).then(r => r.data),
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Orders</h1>
        <input type="text" placeholder="Search orders..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="border rounded-lg px-3 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      {/* Status tabs — scrollable on mobile */}
      <div className="flex gap-2 flex-wrap mb-4 overflow-x-auto pb-1">
        {STATUSES.map(s => (
          <button key={s} onClick={() => { setStatus(s); setPage(1); }}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${status === s ? 'bg-indigo-600 text-white' : 'bg-white border text-gray-600 hover:border-indigo-300'}`}>
            {s.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-400">Loading...</div>
        ) : (
          <>
            {/* Mobile/tablet cards */}
            <div className="lg:hidden divide-y">
              {data?.orders?.map((o: any) => (
                <Link key={o.id} to={`/orders/${o.id}`} className="block p-4 hover:bg-gray-50 active:bg-gray-100">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <p className="font-medium text-sm truncate flex-1">{o.title}</p>
                    <StatusBadge status={o.status} />
                  </div>
                  <p className="font-mono text-xs text-indigo-600">{o.orderNumber}</p>
                  <div className="flex gap-3 mt-1 text-xs text-gray-500">
                    <span>{o.customer?.name}</span>
                    <span>•</span>
                    <span>{o.serviceType?.replace(/_/g, ' ')}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{new Date(o.createdAt).toLocaleDateString()} {o.agent ? `• ${o.agent.name}` : ''}</p>
                </Link>
              ))}
            </div>

            {/* Desktop table */}
            <table className="hidden lg:table w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-600">Order #</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Customer</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Title</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Type</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Agent</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data?.orders?.map((o: any) => (
                  <tr key={o.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Link to={`/orders/${o.id}`} className="text-indigo-600 font-mono text-xs hover:underline">{o.orderNumber}</Link>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{o.customer?.name}</p>
                      <p className="text-gray-400 text-xs">{o.customer?.whatsappPhone}</p>
                    </td>
                    <td className="px-4 py-3 max-w-[200px] truncate">{o.title}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{o.serviceType?.replace(/_/g, ' ')}</td>
                    <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                    <td className="px-4 py-3 text-gray-500">{o.agent?.name ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{new Date(o.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {data && data.total > 25 && (
          <div className="p-4 border-t flex justify-between items-center text-sm">
            <span className="text-gray-500">{data.total} total</span>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1.5 border rounded-lg disabled:opacity-50">Prev</button>
              <button disabled={page * 25 >= data.total} onClick={() => setPage(p => p + 1)} className="px-3 py-1.5 border rounded-lg disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
