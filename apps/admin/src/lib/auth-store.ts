import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminAuthState {
  admin: any | null;
  token: string | null;
  setAuth: (admin: any, token: string) => void;
  clearAuth: () => void;
}

export const useAdminAuth = create<AdminAuthState>()(
  persist(
    (set) => ({
      admin: null,
      token: null,
      setAuth: (admin, token) => {
        set({ admin, token });
        localStorage.setItem('admin_token', token);
      },
      clearAuth: () => {
        set({ admin: null, token: null });
        localStorage.removeItem('admin_token');
      },
    }),
    { name: 'admin-auth' },
  ),
);
