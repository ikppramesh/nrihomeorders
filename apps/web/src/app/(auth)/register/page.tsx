'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';

const FIELDS = [
  { key: 'name',     label: 'Full Name',       type: 'text',     placeholder: 'Ramesh Kumar',         autoComplete: 'name',        inputMode: 'text' },
  { key: 'email',    label: 'Email Address',   type: 'email',    placeholder: 'you@example.com',      autoComplete: 'email',       inputMode: 'email' },
  { key: 'password', label: 'Password',        type: 'password', placeholder: 'Minimum 8 characters', autoComplete: 'new-password', inputMode: 'text' },
  { key: 'phoneUsa', label: 'US Phone Number', type: 'tel',      placeholder: '+1 XXX XXX XXXX',      autoComplete: 'tel',         inputMode: 'tel' },
] as const;

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phoneUsa: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const { data } = await api.post('/auth/register', form);
      setAuth(data.customer, data.accessToken, data.refreshToken);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8 sm:py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-3xl mb-2">🇮🇳</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700">NRI Concierge</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">Create your free account</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6 sm:p-8 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-sm">{error}</div>
          )}
          {FIELDS.map(({ key, label, type, placeholder, autoComplete, inputMode }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
              <input
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                inputMode={inputMode as any}
                value={(form as any)[key]}
                onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
              />
            </div>
          ))}
          <button
            type="submit" disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-base hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 transition-colors mt-2"
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
          <p className="text-center text-sm text-gray-600 pt-1">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
