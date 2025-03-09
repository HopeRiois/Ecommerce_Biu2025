import { defineStore } from 'pinia';
import { User } from '@/models/Response/User';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  getters: {
    isAuthenticated: (state) => state.user !== null,
    fullName: (state) => state.user ? `${state.user.firstName} ${state.user.lastName}` : '',
  },
  actions: {
    login(userData) {
      this.user = new User(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
    },
    loadUser() {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        this.user = new User(JSON.parse(savedUser));
      }
    }
  }
});