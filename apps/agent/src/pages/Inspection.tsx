import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';

const CHECKLIST = [
  'Product matches description',
  'No visible damage or defects',
  'Correct color/variant',
  'Correct size/dimensions',
  'Packaging intact',
  'Brand/label authentic',
  'Quantity correct',
];

export default function InspectionPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<'PASS' | 'FAIL' | ''>('');
  const [notes, setNotes] = useState('');
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [vendorName, setVendorName] = useState('');
  const [error, setError] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: () => api.post(`/agents/orders/${id}/inspection`, {
      result,
      notes: `${notes}\n\nChecklist:\n${CHECKLIST.map((item, i) => `${checked[i] ? '✓' : '✗'} ${item}`).join('\n')}`,
      photoUrls: [],
      vendorName,
    }),
    onSuccess: () => navigate(`/tasks/${id}`),
    onError: (e: any) => setError(e.response?.data?.message ?? 'Submission failed'),
  });

  const allChecked = CHECKLIST.every((_, i) => checked[i]);

  return (
    <div>
      <div className="bg-orange-500 text-white px-4 pt-12 pb-6">
        <button onClick={() => navigate(-1)} className="text-orange-200 text-sm mb-3 block">← Back</button>
        <h1 className="text-2xl font-bold">Product Inspection</h1>
        <p className="text-orange-200 text-sm mt-1">Complete all checklist items before submitting</p>
      </div>

      <div className="px-4 py-4 space-y-4">
        {error && <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm">{error}</div>}

        {/* Vendor info */}
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <label className="block font-semibold mb-2">Vendor Name *</label>
          <input value={vendorName} onChange={e => setVendorName(e.target.value)} placeholder="Shop/vendor name"
            className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>

        {/* Checklist */}
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <h2 className="font-semibold mb-3">Inspection Checklist</h2>
          <div className="space-y-3">
            {CHECKLIST.map((item, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer active:bg-gray-50 p-2 rounded-lg">
                <input type="checkbox" checked={checked[i] ?? false} onChange={e => setChecked(p => ({ ...p, [i]: e.target.checked }))}
                  className="w-5 h-5 rounded border-gray-300 text-orange-500" />
                <span className={`text-sm ${checked[i] ? 'text-green-700 line-through' : 'text-gray-700'}`}>{item}</span>
              </label>
            ))}
          </div>
          {!allChecked && <p className="text-xs text-orange-600 mt-3">Complete all checklist items before marking result</p>}
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <label className="block font-semibold mb-2">Inspection Notes *</label>
          <textarea rows={4} value={notes} onChange={e => setNotes(e.target.value)}
            placeholder="Describe condition, any concerns, observations..."
            className="w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>

        {/* Result */}
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <h2 className="font-semibold mb-3">Inspection Result *</h2>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setResult('PASS')}
              className={`py-4 rounded-xl font-bold text-lg border-2 transition-colors ${result === 'PASS' ? 'bg-green-500 text-white border-green-500' : 'border-green-500 text-green-600'}`}>
              ✅ PASS
            </button>
            <button onClick={() => setResult('FAIL')}
              className={`py-4 rounded-xl font-bold text-lg border-2 transition-colors ${result === 'FAIL' ? 'bg-red-500 text-white border-red-500' : 'border-red-500 text-red-600'}`}>
              ❌ FAIL
            </button>
          </div>
        </div>

        <button
          disabled={!result || !notes.trim() || !vendorName.trim() || isPending}
          onClick={() => mutate()}
          className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 active:bg-orange-600">
          {isPending ? 'Submitting...' : 'Submit Inspection'}
        </button>
      </div>
    </div>
  );
}
