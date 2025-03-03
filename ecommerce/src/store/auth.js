import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.user
  },
  actions: {
    login(userData) {
      this.user = userData;
      localStorage.setItem('user', JSON.stringify(userData));
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
    },
    loadUser() {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        this.user = JSON.parse(savedUser);
      }
    }
  }
});