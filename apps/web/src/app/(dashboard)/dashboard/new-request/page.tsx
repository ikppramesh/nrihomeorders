'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';

const SERVICE_TYPES = [
  {
    value: 'NRI_SEVA_BILL_PAYMENT',
    label: 'Bill Payment',
    icon: '⚡',
    desc: 'Electricity, water, gas, internet, cable',
    placeholder: 'e.g. TSSPDCL Electricity Bill — May 2024 (Account #123456)',
  },
  {
    value: 'NRI_SEVA_INSURANCE_RENEWAL',
    label: 'Insurance Renewal',
    icon: '🛡️',
    desc: 'LIC, health, vehicle, home insurance',
    placeholder: 'e.g. LIC Policy #123456789 — Annual premium renewal',
  },
  {
    value: 'NRI_SEVA_GOVT_FEE',
    label: 'Govt Fee / Registration',
    icon: '🏛️',
    desc: 'Property tax, municipal fees, registrations',
    placeholder: 'e.g. GHMC Property Tax Q1 2024 — Property #HYD-12345',
  },
  {
    value: 'SHOP_INDIA_PRODUCT_SOURCING',
    label: 'Shop from India',
    icon: '📦',
    desc: 'Source any product — we inspect & ship',
    placeholder: 'e.g. Kanjivaram Silk Saree — Gold border, Size 6 yards, Budget ₹5000–8000',
  },
];

function NewRequestContent() {
  const params = useSearchParams();
  const router  = useRouter();
  const initialType = params.get('type') ?? '';
  const [step, setStep]     = useState(initialType ? 2 : 1);
  const [serviceType, setServiceType] = useState(initialType);
  const [form, setForm]     = useState({ title: '', description: '' });
  const [error, setError]   = useState('');

  const selected = SERVICE_TYPES.find(s => s.value === serviceType);

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: any) => api.post('/orders', payload),
    onSuccess: (res) => router.push(`/dashboard/orders/${res.data.id}`),
    onError: (e: any) => setError(e.response?.data?.message ?? 'Submission failed. Please try again.'),
  });

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">New Service Request</h1>

      {/* Step 1 — choose service type */}
      {step === 1 && (
        <div>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">What do you need help with?</p>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {SERVICE_TYPES.map(st => (
              <button
                key={st.value}
                onClick={() => { setServiceType(st.value); setStep(2); }}
                className="bg-white p-4 sm:p-5 rounded-xl border-2 border-gray-200 text-left hover:border-indigo-400 active:bg-indigo-50 transition-all"
              >
                <div className="text-2xl sm:text-3xl mb-2">{st.icon}</div>
                <div className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">{st.label}</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 leading-snug">{st.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 — fill request details */}
      {step === 2 && selected && (
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
          <button onClick={() => setStep(1)} className="text-sm text-indigo-600 hover:underline mb-4 flex items-center gap-1">
            ← Back
          </button>

          <div className="flex items-center gap-2 mb-5 pb-4 border-b">
            <span className="text-2xl">{selected.icon}</span>
            <div>
              <p className="font-semibold text-gray-900">{selected.label}</p>
              <p className="text-xs text-gray-500">{selected.desc}</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-sm mb-4">{error}</div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Brief Title *</label>
              <input
                type="text" value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                placeholder={selected.placeholder.split('\n')[0]}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Details *</label>
              <textarea
                rows={serviceType === 'SHOP_INDIA_PRODUCT_SOURCING' ? 6 : 4}
                value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                placeholder={
                  serviceType === 'SHOP_INDIA_PRODUCT_SOURCING'
                    ? 'Describe the product in detail:\n• What is it? (saree, phone, medicine, utensils…)\n• Color, size, material, brand preference\n• Budget range in ₹\n• Any specific vendor or market in mind?'
                    : 'Provide all details to help us execute correctly:\n• Account / policy number\n• Biller name\n• Amount (if known)\n• Any important notes'
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>
          </div>

          <div className="mt-5 bg-indigo-50 rounded-xl p-4 text-xs sm:text-sm text-indigo-800">
            <strong>What happens next:</strong> Our team in Hyderabad will review your request, prepare a fully itemized quote (product cost + shipping + our flat service fee), and send it to you for approval. No payment until you say yes.
          </div>

          <button
            onClick={() => mutate({ serviceType, title: form.title, description: form.description })}
            disabled={isPending || !form.title.trim() || !form.description.trim()}
            className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-base hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 transition-colors"
          >
            {isPending ? 'Submitting…' : 'Submit Request'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function NewRequestPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading…</div>}>
      <NewRequestContent />
    </Suspense>
  );
}
