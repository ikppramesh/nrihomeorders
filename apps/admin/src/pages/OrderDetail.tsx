import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { StatusBadge } from '@homebridge/ui';

const STATUSES = [
  'UNDER_REVIEW', 'QUOTE_SENT', 'QUOTE_EXPIRED', 'APPROVED_PAID',
  'SOURCING', 'QUALITY_CHECK', 'QC_ADMIN_REVIEW', 'QC_APPROVED',
  'PACKING', 'CUSTOMS_DOCS', 'DISPATCHED', 'IN_TRANSIT', 'DELIVERED',
  'COMPLETED', 'NEEDS_REAPPROVAL', 'CANCELLED', 'ARCHIVED',
];

const STATUS_TEMPLATES: Record<string, string[]> = {
  NEW_REQUEST: [
    "Hi, we've received your request and our Hyderabad team is reviewing the details. We'll send you a quote within 24 hours.",
    "Thank you for submitting your request! Could you please confirm your account/policy number so we can process this accurately?",
  ],
  UNDER_REVIEW: [
    "We're currently reviewing your request and gathering pricing information. You'll receive a detailed quote shortly.",
    "Our team is on it — we'll notify you on WhatsApp the moment your quote is ready.",
  ],
  QUOTE_SENT: [
    "Your quote is ready for review! Please approve within 48 hours — the quote will expire after that. Feel free to ask if you have any questions.",
    "Just a reminder: your quote is awaiting approval. Let us know if you'd like to discuss any of the line items.",
  ],
  APPROVED_PAID: [
    "Payment confirmed — thank you! Our Hyderabad team will begin working on your request right away.",
    "We're on it! You'll get WhatsApp updates as we make progress on your order.",
  ],
  SOURCING: [
    "Our team is currently sourcing your items in Hyderabad. We'll update you once everything is in hand.",
    "We're at the market right now. Expecting to have your items within 1–2 business days.",
  ],
  QUALITY_CHECK: [
    "Your items are undergoing our quality inspection to ensure everything matches your specifications perfectly.",
    "QC is in progress — we're checking all items carefully before moving to dispatch.",
  ],
  QC_APPROVED: [
    "Great news — quality check passed! All items look exactly as specified. Moving to packing now.",
    "Everything passed our quality inspection. Your order is being prepared for shipment.",
  ],
  PACKING: [
    "Your order is being carefully packed. We use secure packaging to protect everything during transit.",
    "Packing is underway — dispatch expected within 1 business day.",
  ],
  CUSTOMS_DOCS: [
    "We're preparing the customs documentation for your shipment. This typically takes 1–2 business days.",
    "Customs paperwork is being processed. We'll dispatch as soon as clearance is complete.",
  ],
  DISPATCHED: [
    "Your order has been dispatched! Tracking number: [add tracking #]. Estimated delivery: [add date].",
    "Shipped! We've sent the tracking details to your WhatsApp. Let us know if you have any questions.",
  ],
  IN_TRANSIT: [
    "Your package is on its way! Expected delivery: [add date]. You can track it here: [add link].",
    "In transit and looking good — expected delivery [add date]. We'll notify you when it arrives.",
  ],
  DELIVERED: [
    "Your order has been delivered! Please confirm receipt and let us know if everything arrived safely.",
    "We hope everything arrived in perfect condition. Reach out if anything needs attention.",
  ],
  COMPLETED: [
    "Your order is complete! Thank you for trusting NRI Concierge — it was a pleasure serving you.",
    "All done! We'd love to help again whenever you need us. Have a wonderful day!",
  ],
  NEEDS_REAPPROVAL: [
    "There's been a change in pricing or availability that requires your re-approval. Please review the updated quote we've sent.",
    "We've sent a revised quote — please review and approve at your earliest convenience.",
  ],
  CANCELLED: [
    "Your order has been cancelled as requested. Please reach out whenever you need our services again.",
    "Cancellation confirmed. We're sorry it didn't work out — we're always here whenever you need us.",
  ],
};

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const qc = useQueryClient();
  const bottomRef = useRef<HTMLDivElement>(null);

  const [quoteForm, setQuoteForm] = useState({ serviceFeeCost: '', productCost: '', shippingCost: '', notes: '' });
  const [newStatus, setNewStatus] = useState('');
  const [agentId, setAgentId] = useState('');
  const [compose, setCompose] = useState('');
  const [composeMode, setComposeMode] = useState<'customer' | 'internal'>('customer');

  const { data: order, isLoading } = useQuery({
    queryKey: ['admin-order', id],
    queryFn: () => api.get(`/admin/orders/${id}`).then(r => r.data),
  });

  const { data: agents } = useQuery({
    queryKey: ['agents-list'],
    queryFn: () => api.get('/admin/agents').then(r => r.data),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ['admin-order', id] });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [order?.events?.length]);

  const { mutate: updateStatus, isPending: updatingStatus } = useMutation({
    mutationFn: () => api.patch(`/admin/orders/${id}/status`, { status: newStatus }),
    onSuccess: () => { invalidate(); setNewStatus(''); },
  });

  const { mutate: createQuote, isPending: creatingQuote } = useMutation({
    mutationFn: () => api.post(`/quotes/orders/${id}`, {
      serviceFeeCost: parseFloat(quoteForm.serviceFeeCost) || 0,
      productCost: parseFloat(quoteForm.productCost) || 0,
      shippingCost: parseFloat(quoteForm.shippingCost) || 0,
      notes: quoteForm.notes,
    }),
    onSuccess: () => { invalidate(); setQuoteForm({ serviceFeeCost: '', productCost: '', shippingCost: '', notes: '' }); },
  });

  const { mutate: assignAgent, isPending: assigning } = useMutation({
    mutationFn: () => api.patch(`/admin/orders/${id}/assign`, { agentId }),
    onSuccess: invalidate,
  });

  const { mutate: sendMessage, isPending: sending } = useMutation<any, any, void>({
    mutationFn: (): Promise<any> =>
      composeMode === 'customer'
        ? api.post(`/admin/orders/${id}/message`, { message: compose })
        : api.post(`/admin/orders/${id}/notes`, { note: compose }),
    onSuccess: () => { invalidate(); setCompose(''); },
  });

  if (isLoading) return <div className="p-8 text-center text-gray-400">Loading...</div>;
  if (!order) return <div className="p-8 text-center text-red-500">Order not found</div>;

  const templates = STATUS_TEMPLATES[order.status] ?? [];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">{order.title}</h1>
        <p className="text-gray-400 font-mono text-sm mt-0.5">{order.orderNumber}</p>
        <div className="mt-2 flex gap-2 items-center flex-wrap">
          <StatusBadge status={order.status} />
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{order.serviceType?.replace(/_/g, ' ')}</span>
          {order.agent && <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">Agent: {order.agent.name}</span>}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* ── LEFT COLUMN: Info + Actions ─────────────────────── */}
        <div className="space-y-4">

          {/* Customer */}
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Customer</h2>
            <p className="font-semibold text-gray-900">{order.customer?.name}</p>
            <p className="text-sm text-gray-500 mt-0.5">{order.customer?.email}</p>
            {order.customer?.whatsappPhone && (
              <a
                href={`https://wa.me/${order.customer.whatsappPhone.replace(/\D/g, '')}`}
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-green-600 hover:text-green-700"
              >
                📱 {order.customer.whatsappPhone}
              </a>
            )}
          </div>

          {/* Request */}
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Request Details</h2>
            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{order.description}</p>
          </div>

          {/* Update Status */}
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Update Status</h2>
            <select
              value={newStatus} onChange={e => setNewStatus(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select new status…</option>
              {STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
            </select>
            <button
              disabled={!newStatus || updatingStatus} onClick={() => updateStatus()}
              className="w-full bg-slate-800 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-slate-900 transition-colors"
            >
              {updatingStatus ? 'Updating…' : 'Update Status'}
            </button>
          </div>

          {/* Assign Agent */}
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Assign Agent</h2>
            <p className="text-xs text-gray-400 mb-2">Current: <span className="font-medium text-gray-700">{order.agent?.name ?? 'Unassigned'}</span></p>
            <select
              value={agentId} onChange={e => setAgentId(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select agent…</option>
              {agents?.map((a: any) => <option key={a.id} value={a.id}>{a.name} — {a.city}</option>)}
            </select>
            <button
              disabled={!agentId || assigning} onClick={() => assignAgent()}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-indigo-700 transition-colors"
            >
              {assigning ? 'Assigning…' : 'Assign Agent'}
            </button>
          </div>

          {/* Quotes */}
          <div className="bg-white rounded-xl p-5 shadow-sm border">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Quotes</h2>

            {order.quotes?.length === 0 && (
              <p className="text-xs text-gray-400 mb-4">No quotes sent yet.</p>
            )}

            {order.quotes?.map((q: any) => (
              <div key={q.id} className="border rounded-lg p-3 mb-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-gray-700">Version {q.version}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    q.status === 'APPROVED' ? 'bg-green-100 text-green-700'
                    : q.status === 'REJECTED' ? 'bg-red-100 text-red-700'
                    : q.status === 'EXPIRED' ? 'bg-gray-100 text-gray-500'
                    : 'bg-yellow-100 text-yellow-700'
                  }`}>{q.status}</span>
                </div>
                <div className="space-y-1 text-xs">
                  {q.serviceFeeUsd > 0 && <div className="flex justify-between"><span className="text-gray-500">Service Fee</span><span className="font-medium">${q.serviceFeeUsd}</span></div>}
                  {q.productCostUsd > 0 && <div className="flex justify-between"><span className="text-gray-500">Product</span><span className="font-medium">${q.productCostUsd}</span></div>}
                  {q.shippingCostUsd > 0 && <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="font-medium">${q.shippingCostUsd}</span></div>}
                  <div className="flex justify-between font-semibold border-t pt-1 mt-1 text-gray-900">
                    <span>Total</span><span>${q.totalUsd}</span>
                  </div>
                </div>
                {q.notes && <p className="text-xs text-gray-400 mt-1.5 italic border-t pt-1.5">{q.notes}</p>}
              </div>
            ))}

            {/* Create Quote */}
            <div className="border-t pt-4">
              <p className="text-xs font-semibold text-gray-600 mb-3">Create New Quote (USD)</p>
              <div className="space-y-2">
                {([
                  ['serviceFeeCost', 'Service Fee *'],
                  ['productCost',    'Product Cost'],
                  ['shippingCost',   'Shipping'],
                ] as const).map(([key, label]) => (
                  <div key={key} className="flex items-center gap-2">
                    <label className="text-xs text-gray-500 w-24 flex-shrink-0">{label}</label>
                    <input
                      type="number" min="0" step="0.01"
                      value={(quoteForm as any)[key]}
                      onChange={e => setQuoteForm(p => ({ ...p, [key]: e.target.value }))}
                      placeholder="0.00"
                      className="flex-1 border rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    />
                  </div>
                ))}
                <textarea
                  value={quoteForm.notes}
                  onChange={e => setQuoteForm(p => ({ ...p, notes: e.target.value }))}
                  placeholder="Notes for customer (optional)…"
                  rows={2}
                  className="w-full border rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-400 mt-1"
                />
              </div>
              <button
                disabled={!quoteForm.serviceFeeCost || creatingQuote}
                onClick={() => createQuote()}
                className="mt-2 w-full bg-indigo-600 text-white py-2 rounded-lg text-xs font-semibold disabled:opacity-40 hover:bg-indigo-700 transition-colors"
              >
                {creatingQuote ? 'Sending…' : 'Send Quote to Customer'}
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Chat (spans 2 cols) ───────────────── */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="bg-white rounded-xl shadow-sm border flex flex-col overflow-hidden" style={{ minHeight: '680px' }}>

            {/* Chat header */}
            <div className="px-5 py-4 border-b bg-gray-50 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">Customer Discussion</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 mr-1" />Messages to customer are visible in their portal.
                  <span className="ml-2 inline-block w-2 h-2 rounded-full bg-amber-400 mr-1" />Internal notes are team-only.
                </p>
              </div>
              <span className="text-xs text-gray-400 bg-white border rounded-full px-2.5 py-1">
                {order.events?.length ?? 0} events
              </span>
            </div>

            {/* Message thread */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {(!order.events || order.events.length === 0) && (
                <div className="flex flex-col items-center justify-center h-40 text-gray-300">
                  <span className="text-4xl mb-3">💬</span>
                  <p className="text-sm font-medium text-gray-400">No messages yet</p>
                  <p className="text-xs text-gray-300 mt-1">Use the compose box below to send the first message</p>
                </div>
              )}

              {order.events?.map((ev: any) => {
                // ── Status change divider ──────────────────
                if (ev.eventType === 'STATUS_UPDATED') {
                  return (
                    <div key={ev.id} className="flex items-center gap-3 my-2">
                      <div className="flex-1 h-px bg-gray-100" />
                      <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1 flex-shrink-0">
                        <span className="text-gray-400 text-xs">→</span>
                        <span className="text-xs font-medium text-gray-600">{ev.toStatus?.replace(/_/g, ' ')}</span>
                        <span className="text-gray-300 text-xs">·</span>
                        <span className="text-xs text-gray-400">{new Date(ev.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="flex-1 h-px bg-gray-100" />
                    </div>
                  );
                }

                // ── Other system events with no notes ─────
                if (!ev.notes) {
                  return (
                    <div key={ev.id} className="flex items-center gap-3 my-1">
                      <div className="flex-1 h-px bg-gray-100" />
                      <span className="text-xs text-gray-300 flex-shrink-0">
                        {ev.eventType?.replace(/_/g, ' ')} · {new Date(ev.createdAt).toLocaleString()}
                      </span>
                      <div className="flex-1 h-px bg-gray-100" />
                    </div>
                  );
                }

                // ── Internal note ─────────────────────────
                if (ev.isInternal) {
                  return (
                    <div key={ev.id} className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center flex-shrink-0 text-base">
                        🔒
                      </div>
                      <div className="max-w-xl">
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                          <p className="text-xs font-semibold text-amber-700 mb-1.5 flex items-center gap-1">
                            Internal Note
                            <span className="bg-amber-200 text-amber-800 text-[10px] px-1.5 py-0.5 rounded-full font-medium ml-1">Team Only</span>
                          </p>
                          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{ev.notes}</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 ml-1">{new Date(ev.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  );
                }

                // ── Customer-visible team message ─────────
                // ── Customer reply (right-aligned, green) ──────────
                if (ev.eventType === 'CUSTOMER_REPLY') {
                  const customerName = order.customer?.name ?? 'Customer';
                  const initials = customerName.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();
                  return (
                    <div key={ev.id} className="flex gap-3 items-end justify-end">
                      <div className="max-w-xl">
                        <div className="bg-green-600 rounded-2xl rounded-br-none px-4 py-3 shadow-sm">
                          <p className="text-xs font-semibold text-green-100 mb-1.5 flex items-center gap-1">
                            {customerName}
                            <span className="bg-green-500 text-green-100 text-[10px] px-1.5 py-0.5 rounded-full font-medium ml-1">Customer</span>
                          </p>
                          <p className="text-sm text-white leading-relaxed whitespace-pre-wrap">{ev.notes}</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 text-right mr-1">{new Date(ev.createdAt).toLocaleString()}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-green-100 border border-green-200 flex items-center justify-center text-green-700 text-xs font-bold flex-shrink-0 shadow-sm">
                        {initials}
                      </div>
                    </div>
                  );
                }

                // ── Team message to customer (left-aligned, indigo) ─
                return (
                  <div key={ev.id} className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm">
                      N
                    </div>
                    <div className="max-w-xl">
                      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                        <p className="text-xs font-semibold text-indigo-700 mb-1.5 flex items-center gap-1">
                          NRI Team
                          <span className="bg-indigo-100 text-indigo-600 text-[10px] px-1.5 py-0.5 rounded-full font-medium ml-1">Visible to Customer</span>
                        </p>
                        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{ev.notes}</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 ml-1">{new Date(ev.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                );
              })}

              <div ref={bottomRef} />
            </div>

            {/* Quick templates */}
            {templates.length > 0 && (
              <div className="px-5 py-3 border-t bg-gray-50">
                <p className="text-xs font-medium text-gray-500 mb-2">
                  Suggested messages for <span className="text-indigo-600 font-semibold">{order.status?.replace(/_/g, ' ')}</span>:
                </p>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {templates.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => { setCompose(t); setComposeMode('customer'); }}
                      className="flex-shrink-0 text-left text-xs bg-white border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-600 hover:text-indigo-700 px-3 py-2 rounded-xl transition-colors leading-relaxed max-w-xs"
                      style={{ maxWidth: '280px' }}
                    >
                      <span className="line-clamp-2">{t}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Compose box */}
            <div className="p-4 border-t bg-white">
              {/* Mode tabs */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setComposeMode('customer')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    composeMode === 'customer'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  💬 Message Customer
                </button>
                <button
                  onClick={() => setComposeMode('internal')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    composeMode === 'internal'
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  🔒 Internal Note
                </button>
              </div>

              {/* Textarea + Send */}
              <div className="flex gap-2 items-end">
                <textarea
                  value={compose}
                  onChange={e => setCompose(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && compose.trim()) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  rows={3}
                  placeholder={
                    composeMode === 'customer'
                      ? 'Type a message to the customer… (Ctrl+Enter to send)'
                      : 'Add an internal note — only visible to your team… (Ctrl+Enter to send)'
                  }
                  className={`flex-1 border rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 transition-colors ${
                    composeMode === 'customer'
                      ? 'border-gray-300 focus:ring-indigo-400 focus:border-indigo-400'
                      : 'border-amber-300 bg-amber-50 focus:ring-amber-400 focus:border-amber-400'
                  }`}
                />
                <button
                  disabled={!compose.trim() || sending}
                  onClick={() => sendMessage()}
                  className={`flex-shrink-0 px-5 py-3 rounded-xl text-sm font-semibold disabled:opacity-40 transition-colors ${
                    composeMode === 'customer'
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-amber-500 hover:bg-amber-600 text-white'
                  }`}
                >
                  {sending ? '…' : 'Send'}
                </button>
              </div>

              {composeMode === 'internal' && (
                <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1">
                  <span>🔒</span> This note is only visible to your team, not the customer.
                </p>
              )}
              {composeMode === 'customer' && (
                <p className="text-xs text-indigo-500 mt-1.5 flex items-center gap-1">
                  <span>💬</span> This message will appear in the customer's order timeline.
                </p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
