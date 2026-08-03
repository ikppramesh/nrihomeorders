import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';

export default function AgentsPage() {
  const qc = useQueryClient();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '' });

  const { data: agents, isLoading } = useQuery({
    queryKey: ['agents'],
    queryFn: () => api.get('/admin/agents').then(r => r.data),
  });

  const { mutate: add } = useMutation({
    mutationFn: () => api.post('/admin/agents', form),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['agents'] }); setShowAdd(false); setForm({ name: '', phone: '', email: '', city: '' }); },
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Field Agents</h1>
        <button onClick={() => setShowAdd(true)} className="bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-indigo-700">+ Add Agent</button>
      </div>

      {showAdd && (
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border mb-4 sm:mb-6">
          <h2 className="font-semibold mb-4">Add New Agent</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {(['name', 'phone', 'email', 'city'] as const).map(key => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{key}</label>
                <input value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                  className="w-full border rounded-lg px-3 py-2 text-sm" placeholder={key} />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => add()} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">Save</button>
            <button onClick={() => setShowAdd(false)} className="border px-4 py-2 rounded-lg text-sm">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? <div className="text-gray-400">Loading...</div> :
          agents?.map((agent: any) => (
            <div key={agent.id} className="bg-white rounded-xl p-5 shadow-sm border">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-gray-900">{agent.name}</p>
                  <p className="text-sm text-gray-500">{agent.city}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${agent.availability === 'AVAILABLE' ? 'bg-green-100 text-green-700' : agent.availability === 'BUSY' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                  {agent.availability}
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{agent.phone}</p>
                <p>{agent.email}</p>
                <p className="text-gray-400">Active orders: {agent._count?.assignedOrders ?? 0}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
