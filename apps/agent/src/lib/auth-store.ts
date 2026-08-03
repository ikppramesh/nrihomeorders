import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AgentAuthState {
  agent: any | null;
  token: string | null;
  setAuth: (agent: any, token: string) => void;
  clearAuth: () => void;
}

export const useAgentAuth = create<AgentAuthState>()(
  persist(
    (set) => ({
      agent: null,
      token: null,
      setAuth: (agent, token) => {
        set({ agent, token });
        localStorage.setItem('agent_token', token);
      },
      clearAuth: () => {
        set({ agent: null, token: null });
        localStorage.removeItem('agent_token');
      },
    }),
    { name: 'agent-auth' },
  ),
);
