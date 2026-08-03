import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';
import { StatusBadge } from '@homebridge/ui';

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: task, isLoading } = useQuery({
    queryKey: ['task', id],
    queryFn: () => api.get(`/admin/orders/${id}`).then(r => r.data),
  });

  const { mutate: checkIn } = useMutation({
    mutationFn: () => {
      return new Promise<void>((resolve, reject) => {
        if (!navigator.geolocation) { reject(new Error('GPS unavailable')); return; }
        navigator.geolocation.getCurrentPosition(
          pos => api.post(`/agents/orders/${id}/checkin`, { location: `${pos.coords.latitude},${pos.coords.longitude}` }).then(() => resolve()),
          err => reject(err),
        );
      });
    },
  });

  if (isLoading) return <div className="p-6 text-center text-gray-400 pt-20">Loading...</div>;
  if (!task) return <div className="p-6 text-center text-red-500 pt-20">Task not found</div>;

  const isShopOrder = task.serviceType?.startsWith('SHOP');

  return (
    <div>
      <div className="bg-indigo-700 text-white px-4 pt-12 pb-6">
        <Link to="/" className="text-indigo-300 text-sm mb-3 block">← Back to tasks</Link>
        <div className="flex justify-between items-start">
          <h1 className="text-xl font-bold flex-1 pr-3">{task.title}</h1>
          <StatusBadge status={task.status} />
        </div>
        <p className="text-indigo-300 text-xs font-mono mt-1">{task.orderNumber}</p>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Customer info */}
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <h2 className="font-semibold mb-2">Customer Details</h2>
          <p className="font-medium">{task.customer?.name}</p>
          <a href={`https://wa.me/${task.customer?.whatsappPhone?.replace(/\D/g, '')}`} className="text-green-600 text-sm">
            WhatsApp: {task.customer?.whatsappPhone}
          </a>
        </div>

        {/* Task description */}
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <h2 className="font-semibold mb-2">Task Details</h2>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{task.description}</p>
        </div>

        {/* Accepted quote */}
        {task.quotes?.[0] && (
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <h2 className="font-semibold mb-2">Approved Quote</h2>
            <div className="text-sm space-y-1">
              {task.quotes[0].serviceFeeCost > 0 && <div className="flex justify-between"><span className="text-gray-500">Service Fee</span><span>${task.quotes[0].serviceFeeCost}</span></div>}
              {task.quotes[0].productCost > 0 && <div className="flex justify-between"><span className="text-gray-500">Product Budget</span><span>${task.quotes[0].productCost}</span></div>}
              <div className="flex justify-between font-semibold border-t pt-1"><span>Total</span><span>${task.quotes[0].totalUsd}</span></div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <button onClick={() => checkIn()}
            className="w-full bg-slate-700 text-white py-4 rounded-xl font-medium text-lg active:bg-slate-800">
            📍 Check In (GPS)
          </button>

          {isShopOrder && (
            <Link to={`/tasks/${id}/inspection`}
              className="block w-full bg-orange-500 text-white py-4 rounded-xl font-medium text-lg text-center active:bg-orange-600">
              🔍 Submit Inspection
            </Link>
          )}

          {(task.status === 'INSPECTION_PASSED' || task.status === 'PACKING') && (
            <Link to={`/tasks/${id}/shipment`}
              className="block w-full bg-indigo-600 text-white py-4 rounded-xl font-medium text-lg text-center active:bg-indigo-700">
              📦 Update Shipment
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
