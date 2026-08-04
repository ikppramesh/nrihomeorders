import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { StatusBadge } from '@homebridge/ui';

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const qc = useQueryClient();

  const { data: customer, isLoading } = useQuery({
    queryKey: ['admin-customer', id],
    queryFn: () => api.get(`/admin/customers/${id}`).then(r => r.data),
  });

  const { mutate: updateKyc } = useMutation({
    mutationFn: (status: string) => api.patch(`/admin/customers/${id}/kyc`, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-customer', id] }),
  });

  const { mutate: toggleActive } = useMutation({
    mutationFn: (isActive: boolean) => api.patch(`/admin/customers/${id}/toggle`, { isActive }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-customer', id] }),
  });

  if (isLoading) return <div className="p-4 sm:p-8 text-gray-400">Loading...</div>;
  if (!customer) return <div className="p-4 sm:p-8 text-red-500">Customer not found</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">{customer.name}</h1>
      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <h2 className="font-semibold mb-3">Profile</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-gray-500">Email</p><p className="font-medium">{customer.email}</p></div>
              <div><p className="text-gray-500">US Phone</p><p className="font-medium">{customer.phoneUsa ?? '—'}</p></div>
              <div><p className="text-gray-500">Joined</p><p className="font-medium">{new Date(customer.createdAt).toLocaleDateString()}</p></div>
              <div><p className="text-gray-500">Plan</p><p className="font-medium">{customer.subscriptionPlan}</p></div>
              <div><p className="text-gray-500">KYC</p>
                <span className={`text-xs px-2 py-1 rounded-full ${customer.kycStatus === 'VERIFIED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{customer.kycStatus}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <h2 className="font-semibold mb-3">Recent Orders</h2>
            <div className="space-y-2">
              {customer.orders?.map((o: any) => (
                <div key={o.id} className="flex items-center justify-between text-sm py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{o.title}</p>
                    <p className="text-gray-400 text-xs font-mono">{o.orderNumber}</p>
                  </div>
                  <StatusBadge status={o.status} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <h2 className="font-semibold mb-3">KYC Actions</h2>
            <div className="space-y-2">
              <button onClick={() => updateKyc('VERIFIED')} className="w-full bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700">Approve KYC</button>
              <button onClick={() => updateKyc('REJECTED')} className="w-full bg-red-600 text-white py-2 rounded-lg text-sm hover:bg-red-700">Reject KYC</button>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <h2 className="font-semibold mb-3">Account Actions</h2>
            <button onClick={() => toggleActive(!customer.isActive)}
              className={`w-full py-2 rounded-lg text-sm text-white ${customer.isActive ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`}>
              {customer.isActive ? 'Suspend Account' : 'Reactivate Account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
