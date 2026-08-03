import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';

export default function CustomersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-customers', page, search],
    queryFn: () => api.get('/admin/customers', { params: { page, limit: 25, search: search || undefined } }).then(r => r.data),
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Customers</h1>
        <input type="text" placeholder="Search name or email..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="border rounded-lg px-3 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {isLoading ? <div className="p-12 text-center text-gray-400">Loading...</div> : (
          <>
            {/* Mobile card list */}
            <div className="lg:hidden divide-y">
              {data?.customers?.map((c: any) => (
                <Link to={`/customers/${c.id}`} key={c.id} className="block p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-semibold text-gray-900 text-sm truncate flex-1">{c.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${c.kycStatus === 'VERIFIED' ? 'bg-green-100 text-green-700' : c.kycStatus === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {c.kycStatus}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{c.email}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                    <span>{c.subscriptionPlan}</span>
                    <span>·</span>
                    <span>{c._count?.orders ?? 0} orders</span>
                    <span>·</span>
                    <span className={c.isActive ? 'text-green-600' : 'text-red-500'}>{c.isActive ? 'Active' : 'Suspended'}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop table */}
            <table className="hidden lg:table w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-600">Name</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Email</th>
                  <th className="px-4 py-3 font-medium text-gray-600">WhatsApp</th>
                  <th className="px-4 py-3 font-medium text-gray-600">KYC</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Plan</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Orders</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data?.customers?.map((c: any) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Link to={`/customers/${c.id}`} className="font-medium text-indigo-600 hover:underline">{c.name}</Link>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{c.email}</td>
                    <td className="px-4 py-3 text-gray-500">{c.whatsappPhone ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${c.kycStatus === 'VERIFIED' ? 'bg-green-100 text-green-700' : c.kycStatus === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {c.kycStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{c.subscriptionPlan}</td>
                    <td className="px-4 py-3 text-gray-500">{c._count?.orders ?? 0}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs ${c.isActive ? 'text-green-600' : 'text-red-600'}`}>{c.isActive ? 'Active' : 'Suspended'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
