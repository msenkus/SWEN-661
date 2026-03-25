import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        set({
          isAuthenticated: true,
          user: {
            name: 'Eleanor Rodriguez',
            email: email,
          },
        });
      },
      register: async (name: string, email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        set({
          isAuthenticated: true,
          user: {
            name: name,
            email: email,
          },
        });
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
