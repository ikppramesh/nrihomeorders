'use client';
import { useAuthStore } from '@/lib/auth-store';

export default function MessagesPage() {
  const { user } = useAuthStore();
  const waNumber = user?.whatsappPhone?.replace(/\D/g, '') ?? '';

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Messages</h1>

      <div className="bg-white rounded-xl p-6 sm:p-10 shadow-sm border text-center max-w-lg mx-auto">
        <div className="text-5xl mb-4">💬</div>
        <h2 className="font-bold text-gray-900 text-lg sm:text-xl mb-2">WhatsApp is your message centre</h2>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
          All communication with our Hyderabad team happens on WhatsApp — order updates, quote approvals, inspection photos, shipment tracking, and support queries.
        </p>
        {waNumber ? (
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 active:bg-green-700 text-sm sm:text-base transition-colors"
          >
            <span className="text-xl">📱</span>
            Open WhatsApp Chat
          </a>
        ) : (
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-3">Add your WhatsApp number to your profile to receive direct messages.</p>
            <a
              href="/dashboard/profile"
              className="inline-block bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700"
            >
              Update Profile
            </a>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
        {[
          { icon: '⚡', title: 'Instant Updates', desc: 'Every status change sent to your WhatsApp immediately' },
          { icon: '📸', title: 'Photo Proof', desc: 'Inspection photos & videos shared before shipping' },
          { icon: '🤝', title: 'Human Support', desc: 'Real agents answer — no bots, no queues' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-white rounded-xl p-4 shadow-sm border text-center">
            <div className="text-2xl mb-2">{icon}</div>
            <p className="font-semibold text-gray-900 text-sm">{title}</p>
            <p className="text-xs text-gray-500 mt-1 leading-snug">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
