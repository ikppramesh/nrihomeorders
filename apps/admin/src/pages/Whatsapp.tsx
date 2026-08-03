import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';

export default function WhatsappPage() {
  const [selected, setSelected] = useState<any>(null);
  const [reply, setReply] = useState('');

  const { data: convs, refetch } = useQuery({
    queryKey: ['wa-conversations'],
    queryFn: () => api.get('/whatsapp/conversations').then(r => r.data),
    refetchInterval: 10_000,
  });

  const { data: messages, refetch: refetchMsgs } = useQuery({
    queryKey: ['wa-messages', selected?.id],
    queryFn: () => selected ? api.get(`/whatsapp/conversations/${selected.id}/messages`).then(r => r.data) : null,
    enabled: !!selected,
    refetchInterval: 5_000,
  });

  const { mutate: sendReply } = useMutation({
    mutationFn: () => api.post(`/whatsapp/conversations/${selected.id}/reply`, { text: reply }),
    onSuccess: () => { setReply(''); refetchMsgs(); },
  });

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-56px)] lg:h-screen">
      {/* Conversation list — full width on mobile when no conv selected, sidebar on desktop */}
      <div className={`${selected ? 'hidden md:flex' : 'flex'} flex-col md:w-72 border-r bg-white overflow-y-auto flex-shrink-0`}>
        <div className="p-4 border-b flex-shrink-0">
          <h2 className="font-semibold text-gray-900">WhatsApp Inbox</h2>
        </div>
        {convs?.conversations?.map((c: any) => (
          <div key={c.id} onClick={() => setSelected(c)}
            className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selected?.id === c.id ? 'bg-indigo-50' : ''}`}>
            <div className="flex justify-between items-start">
              <p className="font-medium text-sm">{c.customerName ?? c.customerPhone}</p>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${c.agentState === 'BOT' ? 'bg-blue-100 text-blue-600' : c.agentState === 'AGENT' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{c.agentState}</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{c.messages?.[0]?.content?.substring(0, 50) ?? 'No messages'}</p>
          </div>
        ))}
      </div>

      {/* Message thread */}
      <div className={`${selected ? 'flex' : 'hidden md:flex'} flex-1 flex-col min-w-0`}>
        {selected ? (
          <>
            <div className="p-3 sm:p-4 border-b bg-white flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setSelected(null)}
                className="md:hidden text-indigo-600 text-sm font-medium"
              >
                ← Back
              </button>
              <div>
                <p className="font-semibold text-sm">{selected.customerName ?? selected.customerPhone}</p>
                <p className="text-xs text-gray-400">{selected.customerPhone} • {selected.agentState}</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
              {messages?.map((m: any) => (
                <div key={m.id} className={`flex ${m.direction === 'OUTBOUND' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] sm:max-w-sm px-3 sm:px-4 py-2 rounded-xl text-sm ${m.direction === 'OUTBOUND' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white border rounded-bl-none shadow-sm'}`}>
                    {m.content}
                    <p className={`text-xs mt-1 ${m.direction === 'OUTBOUND' ? 'text-indigo-200' : 'text-gray-400'}`}>{new Date(m.createdAt).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 sm:p-4 border-t bg-white flex gap-2 sm:gap-3 flex-shrink-0">
              <input value={reply} onChange={e => setReply(e.target.value)} onKeyDown={e => e.key === 'Enter' && reply.trim() && sendReply()}
                placeholder="Type a reply..." className="flex-1 border rounded-full px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <button onClick={() => sendReply()} disabled={!reply.trim()} className="bg-indigo-600 text-white px-4 sm:px-5 py-2 rounded-full text-sm disabled:opacity-50 hover:bg-indigo-700">Send</button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}
