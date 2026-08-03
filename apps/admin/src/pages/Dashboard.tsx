import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Stat({ label, value, color = 'text-gray-900' }: { label: string; value: any; color?: string }) {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
      <p className="text-xs sm:text-sm text-gray-500">{label}</p>
      <p className={`text-2xl sm:text-3xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { data: stats } = useQuery({ queryKey: ['admin-stats'], queryFn: () => api.get('/admin/analytics/dashboard').then(r => r.data) });
  const { data: byStatus } = useQuery({ queryKey: ['by-status'], queryFn: () => api.get('/admin/analytics/by-status').then(r => r.data) });
  const { data: recent } = useQuery({ queryKey: ['recent-orders'], queryFn: () => api.get('/admin/analytics/recent').then(r => r.data) });

  const chartData = byStatus?.map((s: any) => ({ name: s.status.replace(/_/g, ' '), count: s._count.id })) ?? [];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-8">
        <Stat label="Total Orders" value={stats?.totalOrders ?? '—'} />
        <Stat label="Total Customers" value={stats?.totalCustomers ?? '—'} />
        <Stat label="Pending Orders" value={stats?.pendingOrders ?? '—'} color="text-yellow-600" />
        <Stat label="Revenue (USD)" value={stats ? `$${Number(stats.totalRevenueUsd).toFixed(2)}` : '—'} color="text-green-600" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-4">Orders by Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {recent?.map((o: any) => (
              <div key={o.id} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium">{o.customer?.name}</p>
                  <p className="text-gray-400 text-xs">{o.orderNumber}</p>
                </div>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">{o.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
