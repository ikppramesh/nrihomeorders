'use client';
import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/auth-store';
import { api } from '@/lib/api';

const KYC_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  VERIFIED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-red-100 text-red-700',
};

const PLAN_LABELS: Record<string, string> = {
  FREE: 'Free',
  BASIC: 'Basic',
  PRO: 'Pro',
};

export default function ProfilePage() {
  const { user, setAuth, accessToken, refreshToken } = useAuthStore();
  const qc = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.get('/profile').then(r => r.data),
  });

  const [form, setForm] = useState({
    name: '',
    phoneUsa: '',
    whatsappPhone: '',
  });
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState(false);
  const [saved, setSaved] = useState(false);

  // Initialise form once profile loads
  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name ?? '',
        phoneUsa: profile.phoneUsa ?? '',
        whatsappPhone: profile.whatsappPhone ?? '',
      });
    }
  }, [profile]);

  const { mutate: updateProfile, isPending: saving } = useMutation({
    mutationFn: () => api.patch('/profile', {
      name: form.name.trim(),
      phoneUsa: form.phoneUsa.trim() || undefined,
      whatsappPhone: form.whatsappPhone.trim() || undefined,
    }),
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ['profile'] });
      setAuth(res.data, accessToken!, refreshToken!);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    },
  });

  const { mutate: changePassword, isPending: changingPw } = useMutation({
    mutationFn: () => api.post('/auth/change-password', {
      currentPassword: pwForm.currentPassword,
      newPassword: pwForm.newPassword,
    }),
    onSuccess: () => {
      setPwForm({ currentPassword: '', newPassword: '', confirm: '' });
      setPwError('');
      setPwSuccess(true);
      setTimeout(() => setPwSuccess(false), 3000);
    },
    onError: (e: any) => setPwError(e.response?.data?.message ?? 'Failed to change password.'),
  });

  const handlePasswordSubmit = () => {
    if (pwForm.newPassword !== pwForm.confirm) {
      setPwError('New passwords do not match.');
      return;
    }
    if (pwForm.newPassword.length < 8) {
      setPwError('Password must be at least 8 characters.');
      return;
    }
    setPwError('');
    changePassword();
  };

  if (isLoading) {
    return <div className="py-16 text-center text-gray-400 text-sm">Loading profile…</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Profile</h1>

      {/* Account info cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border text-center">
          <p className="text-xs text-gray-500 mb-1">KYC Status</p>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${KYC_COLORS[profile?.kycStatus] ?? 'bg-gray-100 text-gray-500'}`}>
            {profile?.kycStatus ?? '—'}
          </span>
        </div>
        <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border text-center">
          <p className="text-xs text-gray-500 mb-1">Plan</p>
          <p className="font-semibold text-gray-900 text-sm">{PLAN_LABELS[profile?.subscriptionPlan] ?? profile?.subscriptionPlan ?? '—'}</p>
        </div>
      </div>

      {/* Profile edit form */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border">
        <h2 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Personal Details</h2>

        <div className="space-y-4">
          {/* Email — read-only */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Email (cannot be changed)</label>
            <input
              readOnly
              value={profile?.email ?? ''}
              className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="Your full name"
              autoComplete="name"
              className="w-full border border-gray-300 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">US Phone Number</label>
            <input
              type="tel"
              value={form.phoneUsa}
              onChange={e => setForm(p => ({ ...p, phoneUsa: e.target.value }))}
              placeholder="+1 555 000 0000"
              inputMode="tel"
              autoComplete="tel"
              className="w-full border border-gray-300 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">WhatsApp Number</label>
            <p className="text-xs text-gray-400 mb-1.5">Include country code, e.g. +91 98765 43210 or +1 555 000 0000</p>
            <input
              type="tel"
              value={form.whatsappPhone}
              onChange={e => setForm(p => ({ ...p, whatsappPhone: e.target.value }))}
              placeholder="+91 98765 43210"
              inputMode="tel"
              className="w-full border border-gray-300 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-indigo-600 mt-1.5">Order updates, quotes & support are sent to this number.</p>
          </div>
        </div>

        <button
          disabled={saving || !form.name.trim()}
          onClick={() => updateProfile()}
          className="mt-5 w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving…' : saved ? 'Saved!' : 'Save Changes'}
        </button>
        {saved && (
          <p className="mt-2 text-xs text-green-600">Profile updated successfully.</p>
        )}
      </div>

      {/* Change password */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border">
        <h2 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Change Password</h2>

        {pwError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs mb-3">{pwError}</div>
        )}
        {pwSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl text-xs mb-3">Password changed successfully.</div>
        )}

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              value={pwForm.currentPassword}
              onChange={e => setPwForm(p => ({ ...p, currentPassword: e.target.value }))}
              autoComplete="current-password"
              className="w-full border border-gray-300 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={pwForm.newPassword}
              onChange={e => setPwForm(p => ({ ...p, newPassword: e.target.value }))}
              autoComplete="new-password"
              className="w-full border border-gray-300 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              value={pwForm.confirm}
              onChange={e => setPwForm(p => ({ ...p, confirm: e.target.value }))}
              autoComplete="new-password"
              className="w-full border border-gray-300 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button
          disabled={changingPw || !pwForm.currentPassword || !pwForm.newPassword || !pwForm.confirm}
          onClick={handlePasswordSubmit}
          className="mt-4 w-full sm:w-auto bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-900 disabled:opacity-50 transition-colors"
        >
          {changingPw ? 'Updating…' : 'Update Password'}
        </button>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-red-100">
        <h2 className="font-semibold text-red-700 mb-1 text-sm sm:text-base">Need help?</h2>
        <p className="text-xs text-gray-500 mb-3">
          To close your account or update your delivery address in Hyderabad, message us on WhatsApp.
        </p>
        {profile?.whatsappPhone ? (
          <a
            href={`https://wa.me/${profile.whatsappPhone.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-600"
          >
            <span>📱</span> WhatsApp Support
          </a>
        ) : (
          <p className="text-xs text-gray-400">Add your WhatsApp number above to contact support.</p>
        )}
      </div>
    </div>
  );
}
