import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/v1';

export const api = axios.create({ baseURL: BASE_URL });

function getAuthState() {
  try {
    const raw = localStorage.getItem('nri-auth');
    return raw ? JSON.parse(raw)?.state ?? null : null;
  } catch {
    return null;
  }
}

function updateAuthState(updates: { accessToken: string; refreshToken: string }) {
  try {
    const raw = localStorage.getItem('nri-auth');
    if (!raw) return;
    const blob = JSON.parse(raw);
    blob.state = { ...blob.state, ...updates };
    localStorage.setItem('nri-auth', JSON.stringify(blob));
  } catch {
    // ignore
  }
}

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = getAuthState()?.accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      const refresh = getAuthState()?.refreshToken;
      if (refresh) {
        try {
          const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken: refresh });
          updateAuthState({ accessToken: data.accessToken, refreshToken: data.refreshToken });
          err.config.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(err.config);
        } catch {
          localStorage.removeItem('nri-auth');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(err);
  },
);
