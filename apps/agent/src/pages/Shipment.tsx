import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';

export default function ShipmentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    courier: '',
    trackingNumber: '',
    estimatedDelivery: '',
    actualWeight: '',
    dimensions: '',
  });
  const [error, setError] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: () => api.post(`/agents/orders/${id}/shipment`, {
      ...form,
      actualWeight: form.actualWeight ? parseFloat(form.actualWeight) : undefined,
      estimatedDelivery: form.estimatedDelivery || undefined,
    }),
    onSuccess: () => navigate(`/tasks/${id}`),
    onError: (e: any) => setError(e.response?.data?.message ?? 'Submission failed'),
  });

  const couriers = ['DHL', 'FedEx', 'UPS', 'DTDC', 'Blue Dart', 'Aramex', 'SpeedPost'];

  return (
    <div>
      <div className="bg-indigo-700 text-white px-4 pt-12 pb-6">
        <button onClick={() => navigate(-1)} className="text-indigo-300 text-sm mb-3 block">← Back</button>
        <h1 className="text-2xl font-bold">Update Shipment</h1>
        <p className="text-indigo-300 text-sm mt-1">Enter courier and tracking details</p>
      </div>

      <div className="px-4 py-4 space-y-4">
        {error && <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm">{error}</div>}

        <div className="bg-white rounded-xl p-4 shadow-sm border space-y-4">
          <div>
            <label className="block font-semibold mb-2">Courier *</label>
            <select value={form.courier} onChange={e => setForm(p => ({ ...p, courier: e.target.value }))}
              className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">Select courier</option>
              {couriers.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">Tracking Number *</label>
            <input value={form.trackingNumber} onChange={e => setForm(p => ({ ...p, trackingNumber: e.target.value }))}
              placeholder="Enter tracking number" className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div>
            <label className="block font-semibold mb-2">Estimated Delivery</label>
            <input type="date" value={form.estimatedDelivery} onChange={e => setForm(p => ({ ...p, estimatedDelivery: e.target.value }))}
              className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Weight (kg)</label>
              <input type="number" step="0.1" value={form.actualWeight} onChange={e => setForm(p => ({ ...p, actualWeight: e.target.value }))}
                placeholder="0.0" className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block font-semibold mb-2">Dimensions</label>
              <input value={form.dimensions} onChange={e => setForm(p => ({ ...p, dimensions: e.target.value }))}
                placeholder="L×W×H cm" className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
        </div>

        <button
          disabled={!form.courier || !form.trackingNumber || isPending}
          onClick={() => mutate()}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 active:bg-indigo-700">
          {isPending ? 'Submitting...' : '📦 Confirm Shipment'}
        </button>
      </div>
    </div>
  );
}
