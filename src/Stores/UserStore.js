import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// define the initial state
const initialState = {
  user: null, // Initially no user is logged in
  role: null, // Initially no user role is set
  branch_name: null,
  token: null,
};

const useUserStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // Function to set user on login
      setUser: (userData) => set({ user: userData }),

      // Function to set user role on login
      setRole: (role) => set({ role: role }),

      // Function to set user token on login
      setToken: (token) => set({ token: token }),

      // Function to clear user on logout
      clearUser: () => set(initialState),

      // ✅ Add helper functions for access
      hasFullAccess: () => {
        const { user } = get();
        return user?.has_subscription_full_access === true;
      },

    }),
    {
      name: 'user-storage', // Key for localStorage
      partialize: (state) => ({ user: state.user, role: state.role }), // Only persist the `user` part
    }
  )
);

export default useUserStore;
