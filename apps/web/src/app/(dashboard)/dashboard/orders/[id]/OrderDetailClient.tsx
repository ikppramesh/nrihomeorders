'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';
import { StatusBadge } from '@homebridge/ui';
import Link from 'next/link';

const PIPELINE_NRI  = ['NEW_REQUEST', 'UNDER_REVIEW', 'QUOTE_SENT', 'APPROVED_PAID', 'SOURCING', 'COMPLETED'];
const PIPELINE_SHOP = ['NEW_REQUEST', 'UNDER_REVIEW', 'QUOTE_SENT', 'APPROVED_PAID', 'SOURCING', 'QUALITY_CHECK', 'QC_APPROVED', 'PACKING', 'CUSTOMS_DOCS', 'DISPATCHED', 'IN_TRANSIT', 'DELIVERED', 'COMPLETED'];

const SHORT_LABEL: Record<string, string> = {
  NEW_REQUEST: 'New', UNDER_REVIEW: 'Review', QUOTE_SENT: 'Quote',
  APPROVED_PAID: 'Paid', SOURCING: 'Sourcing', QUALITY_CHECK: 'QC',
  QC_APPROVED: 'Checked', PACKING: 'Packing', CUSTOMS_DOCS: 'Customs',
  DISPATCHED: 'Shipped', IN_TRANSIT: 'Transit', DELIVERED: 'Delivered',
  COMPLETED: 'Complete',
};

function OrderTracker({ status, serviceType }: { status: string; serviceType: string }) {
  const stages = serviceType?.startsWith('SHOP') ? PIPELINE_SHOP : PIPELINE_NRI;
  const current = stages.indexOf(status);

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 mb-4 sm:mb-6">
      <h2 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Order Progress</h2>
      <div className="overflow-x-auto -mx-1 px-1 pb-1">
        <div className="flex items-start min-w-max gap-0">
          {stages.map((s, i) => {
            const done   = i < current;
            const active = i === current;
            return (
              <div key={s} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    done ? 'bg-green-500 text-white' :
                    active ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' :
                    'bg-gray-200 text-gray-400'
                  }`}>
                    {done ? '✓' : i + 1}
                  </div>
                  <span className={`text-xs mt-1 text-center w-14 leading-tight ${
                    active ? 'font-semibold text-indigo-600' : done ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {SHORT_LABEL[s] ?? s}
                  </span>
                </div>
                {i < stages.length - 1 && (
                  <div className={`h-0.5 w-5 mx-0.5 mt-[-14px] flex-shrink-0 ${done ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function OrderDetailClient() {
  const { id } = useParams<{ id: string }>();
  const qc = useQueryClient();
  const { user } = useAuthStore();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [compose, setCompose] = useState('');

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: () => api.get(`/orders/${id}`).then(r => r.data),
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [order?.events?.length]);

  const { mutate: approveQuote } = useMutation({
    mutationFn: (quoteId: string) => api.patch(`/quotes/${quoteId}/approve`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['order', id] }),
  });

  const { mutate: cancelOrder } = useMutation({
    mutationFn: () => api.patch(`/orders/${id}/cancel`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['order', id] }),
  });

  const { mutate: sendReply, isPending: sending } = useMutation({
    mutationFn: () => api.post(`/orders/${id}/message`, { message: compose }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['order', id] });
      setCompose('');
    },
  });

  if (isLoading) return <div className="py-16 text-center text-gray-400 text-sm">Loading order…</div>;
  if (!order) return <div className="py-16 text-center text-red-500">Order not found.</div>;

  const pendingQuote = order.quotes?.find((q: any) => q.status === 'PENDING_CUSTOMER');
  const canCancel = ['NEW_REQUEST', 'UNDER_REVIEW', 'QUOTE_SENT', 'QUOTE_EXPIRED'].includes(order.status);
  const visibleEvents = order.events?.filter((ev: any) => !ev.isInternal) ?? [];
  const initials = (user?.name ?? 'Me').split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <Link href="/dashboard/orders" className="text-xs text-indigo-600 hover:underline mb-2 block">← Back to orders</Link>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">{order.title}</h1>
          <p className="text-gray-400 font-mono text-xs mt-1">{order.orderNumber}</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={order.status} />
          {canCancel && (
            <button
              onClick={() => { if (confirm('Cancel this order?')) cancelOrder(); }}
              className="text-xs text-red-600 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <OrderTracker status={order.status} serviceType={order.serviceType} />

      {pendingQuote && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 sm:p-5 mb-4 sm:mb-6">
          <h3 className="font-semibold text-yellow-800 mb-1 text-sm sm:text-base">Quote Ready for Approval</h3>
          <div className="text-sm text-yellow-700 space-y-1 mb-3">
            {pendingQuote.serviceFeeUsd > 0 && <div className="flex justify-between"><span>Service Fee</span><span>${pendingQuote.serviceFeeUsd}</span></div>}
            {pendingQuote.productCostUsd > 0 && <div className="flex justify-between"><span>Product</span><span>${pendingQuote.productCostUsd}</span></div>}
            {pendingQuote.shippingCostUsd > 0 && <div className="flex justify-between"><span>Shipping</span><span>${pendingQuote.shippingCostUsd}</span></div>}
            <div className="flex justify-between font-bold text-yellow-900 border-t border-yellow-300 pt-1">
              <span>Total</span><span>${pendingQuote.totalUsd}</span>
            </div>
          </div>
          <p className="text-xs text-yellow-600 mb-3">Valid for 48 hours. No payment until you approve.</p>
          <button
            onClick={() => approveQuote(pendingQuote.id)}
            className="w-full sm:w-auto bg-green-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700"
          >
            Approve & Proceed to Payment
          </button>
        </div>
      )}

      {order.quotes?.[0] && order.quotes[0].status !== 'PENDING_CUSTOMER' && (
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200 mb-4 sm:mb-6">
          <h2 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Approved Cost Breakdown</h2>
          <div className="space-y-2 text-sm">
            {order.quotes[0].serviceFeeUsd > 0 && (
              <div className="flex justify-between text-gray-700"><span>Service Fee</span><span className="font-medium">${order.quotes[0].serviceFeeUsd}</span></div>
            )}
            {order.quotes[0].productCostUsd > 0 && (
              <div className="flex justify-between text-gray-700"><span>Product Cost</span><span className="font-medium">${order.quotes[0].productCostUsd}</span></div>
            )}
            {order.quotes[0].shippingCostUsd > 0 && (
              <div className="flex justify-between text-gray-700"><span>Shipping</span><span className="font-medium">${order.quotes[0].shippingCostUsd}</span></div>
            )}
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total Paid</span>
              <span className="text-indigo-700 text-base">${order.quotes[0].totalUsd}</span>
            </div>
          </div>
          <p className="text-xs text-green-600 mt-3 flex items-center gap-1">
            <span>✅</span> Zero hidden fees. This is exactly what you paid.
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4 sm:mb-6">
        <div className="px-4 sm:px-5 py-3.5 border-b bg-gray-50 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-900 text-sm sm:text-base">Messages & Updates</h2>
            <p className="text-xs text-gray-400 mt-0.5">Chat with the NRI Concierge team about your order</p>
          </div>
          <span className="text-xs text-gray-400">{visibleEvents.length} messages</span>
        </div>

        <div className="p-4 sm:p-5 space-y-4 max-h-[420px] overflow-y-auto">
          {visibleEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-300">
              <span className="text-4xl mb-3">💬</span>
              <p className="text-sm font-medium text-gray-400">No messages yet</p>
              <p className="text-xs text-gray-300 mt-1">Our team will reach out once we review your request</p>
            </div>
          ) : (
            visibleEvents.map((ev: any) => {
              if (ev.eventType === 'STATUS_UPDATED') {
                return (
                  <div key={ev.id} className="flex items-center gap-2 my-1">
                    <div className="flex-1 h-px bg-gray-100" />
                    <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                      Status → <strong className="text-gray-600">{ev.toStatus?.replace(/_/g, ' ')}</strong>
                    </span>
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>
                );
              }
              if (ev.eventType === 'CUSTOMER_REPLY' && ev.notes) {
                return (
                  <div key={ev.id} className="flex gap-2.5 items-end justify-end">
                    <div className="max-w-xs sm:max-w-sm">
                      <div className="bg-green-600 rounded-2xl rounded-br-none px-3 sm:px-4 py-2.5 shadow-sm">
                        <p className="text-xs sm:text-sm text-white leading-relaxed whitespace-pre-wrap">{ev.notes}</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 text-right">{new Date(ev.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-green-100 border border-green-200 flex items-center justify-center text-green-700 text-xs font-bold flex-shrink-0">
                      {initials}
                    </div>
                  </div>
                );
              }
              if (ev.eventType === 'CUSTOMER_MESSAGE' && ev.notes) {
                return (
                  <div key={ev.id} className="flex gap-2.5 items-end">
                    <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">N</div>
                    <div className="max-w-xs sm:max-w-sm">
                      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl rounded-bl-none px-3 sm:px-4 py-2.5 shadow-sm">
                        <p className="text-xs font-semibold text-indigo-700 mb-1">NRI Team</p>
                        <p className="text-xs sm:text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{ev.notes}</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{new Date(ev.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                );
              }
              if (!ev.notes) return null;
              return (
                <div key={ev.id} className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-gray-400 flex-shrink-0">{ev.notes} · {new Date(ev.createdAt).toLocaleString()}</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t px-4 sm:px-5 py-3.5 bg-gray-50">
          <div className="flex gap-2 items-end">
            <div className="w-7 h-7 rounded-full bg-green-100 border border-green-200 flex items-center justify-center text-green-700 text-xs font-bold flex-shrink-0 mb-0.5">
              {initials}
            </div>
            <textarea
              value={compose}
              onChange={e => setCompose(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && compose.trim()) {
                  e.preventDefault();
                  sendReply();
                }
              }}
              rows={2}
              placeholder="Reply to the NRI Team… (Ctrl+Enter to send)"
              className="flex-1 border border-gray-300 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 bg-white"
            />
            <button
              disabled={!compose.trim() || sending}
              onClick={() => sendReply()}
              className="flex-shrink-0 bg-green-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-green-700 transition-colors mb-0.5"
            >
              {sending ? '…' : 'Send'}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1.5 ml-9">Our team typically replies within a few hours during business hours (IST).</p>
        </div>
      </div>

      {order.shipment && (
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base flex items-center gap-2">
            <span>📦</span> Shipment Details
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500 text-xs mb-0.5">Courier</p>
              <p className="font-semibold">{order.shipment.courier}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-0.5">Tracking Number</p>
              <p className="font-mono text-xs sm:text-sm font-semibold break-all">{order.shipment.trackingNumber}</p>
            </div>
            {order.shipment.estimatedDelivery && (
              <div className="col-span-2 sm:col-span-1">
                <p className="text-gray-500 text-xs mb-0.5">Est. Delivery</p>
                <p className="font-semibold">{new Date(order.shipment.estimatedDelivery).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
