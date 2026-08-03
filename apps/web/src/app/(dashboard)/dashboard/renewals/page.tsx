'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { api } from '@/lib/api';

const RENEWAL_TYPES = [
  { value: 'LIC',               label: 'LIC Policy' },
  { value: 'HEALTH_INSURANCE',  label: 'Health Insurance' },
  { value: 'VEHICLE_INSURANCE', label: 'Vehicle Insurance' },
  { value: 'ELECTRICITY',       label: 'Electricity Bill' },
  { value: 'PROPERTY_TAX',      label: 'Property Tax' },
  { value: 'WATER',             label: 'Water Bill' },
  { value: 'OTHER',             label: 'Other' },
];

function daysUntil(dateStr: string) {
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
}

function urgencyStyle(days: number) {
  if (days <= 7)  return { border: 'border-red-200 bg-red-50', text: 'text-red-600' };
  if (days <= 30) return { border: 'border-yellow-200 bg-yellow-50', text: 'text-yellow-600' };
  return { border: 'border-gray-200 bg-white', text: 'text-green-600' };
}

export default function RenewalsPage() {
  const qc = useQueryClient();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ label: '', renewalType: '', dueDate: '', estimatedAmount: '' });

  const { data: items, isLoading } = useQuery({
    queryKey: ['renewals'],
    queryFn: () => api.get('/renewals').then(r => r.data),
  });

  const { mutate: add, isPending: adding } = useMutation({
    mutationFn: (d: any) => api.post('/renewals', d),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['renewals'] });
      setShowAdd(false);
      setForm({ label: '', renewalType: '', dueDate: '', estimatedAmount: '' });
    },
  });

  const { mutate: remove } = useMutation({
    mutationFn: (id: string) => api.delete(`/renewals/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['renewals'] }),
  });

  const canAdd = form.label.trim() && form.dueDate;

  return (
    <div>
      <div className="flex items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Renewal Reminders</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            WhatsApp alerts sent 30 days, 7 days & 1 day before each due date
          </p>
        </div>
        <button
          onClick={() => setShowAdd(v => !v)}
          className="flex-shrink-0 bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold hover:bg-indigo-700 active:bg-indigo-800"
        >
          + Add
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200 mb-4 sm:mb-5">
          <h2 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Add Renewal Reminder</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Label *</label>
              <input
                value={form.label} onChange={e => setForm(p => ({ ...p, label: e.target.value }))}
                placeholder="e.g. LIC Policy 123, TSSPDCL Bill"
                className="w-full border border-gray-300 rounded-xl px-3 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
              <select
                value={form.renewalType} onChange={e => setForm(p => ({ ...p, renewalType: e.target.value }))}
                className="w-full border border-gray-300 rounded-xl px-3 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select type</option>
                {RENEWAL_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Due Date *</label>
              <input
                type="date" value={form.dueDate} onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))}
                className="w-full border border-gray-300 rounded-xl px-3 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Estimated Amount (₹)</label>
              <input
                type="number" min="0" value={form.estimatedAmount} onChange={e => setForm(p => ({ ...p, estimatedAmount: e.target.value }))}
                placeholder="0"
                className="w-full border border-gray-300 rounded-xl px-3 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              disabled={!canAdd || adding}
              onClick={() => add({
                label: form.label,
                renewalType: form.renewalType || 'OTHER',
                dueDate: new Date(form.dueDate).toISOString(),
                estimatedAmount: form.estimatedAmount ? parseFloat(form.estimatedAmount) : undefined,
              })}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50 hover:bg-indigo-700"
            >
              {adding ? 'Saving…' : 'Save Reminder'}
            </button>
            <button onClick={() => setShowAdd(false)} className="border border-gray-300 px-5 py-2.5 rounded-xl text-sm hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Reminder list */}
      {isLoading ? (
        <div className="py-10 text-center text-gray-400 text-sm">Loading reminders…</div>
      ) : !items?.length ? (
        <div className="bg-white rounded-xl p-10 sm:p-14 text-center shadow-sm border">
          <div className="text-4xl mb-3">🔔</div>
          <p className="font-semibold text-gray-700">No renewal reminders set up yet</p>
          <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">
            Add reminders for bills, insurance, and government dues — we will WhatsApp you before each deadline.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item: any) => {
            const days = daysUntil(item.nextDueDate);
            const { border, text } = urgencyStyle(days);
            return (
              <div key={item.id} className={`rounded-xl p-4 shadow-sm border flex items-center justify-between gap-3 ${border}`}>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Due {new Date(item.nextDueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    {item.approxAmountInr ? ` · ₹${item.approxAmountInr.toLocaleString('en-IN')}` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`text-xs font-bold ${text}`}>
                    {days > 0 ? `${days}d` : days === 0 ? 'Today!' : 'Overdue'}
                  </span>
                  <button
                    onClick={() => remove(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 text-sm"
                    aria-label="Remove reminder"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
