import { defineStore } from 'pinia';
import { LoginResponse } from '@/models/Response/LoginResponse';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    logged: null
  }),
  getters: {
    isAuthenticated: (state) => state.logged !== null,
    // fullName: (state) => state.logged ? `${state.logged.firstName} ${state.logged.lastName}` : '',
  },
  actions: {
    login(loginData) {
      this.logged = new LoginResponse(loginData);
      localStorage.setItem('logged', JSON.stringify(loginData));
    },
    logout() {
      this.logged = null;
      localStorage.removeItem('logged');
    },
    loadUser() {
      const savedLogin = localStorage.getItem('logged');
      if (savedLogin) {
        this.logged = new LoginResponse(JSON.parse(savedLogin));
      }
    }
  }
});
// import { User } from '@/models/Response/User';

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     user: null
//   }),
//   getters: {
//     isAuthenticated: (state) => state.user !== null,
//     fullName: (state) => state.user ? `${state.user.firstName} ${state.user.lastName}` : '',
//   },
//   actions: {
//     login(userData) {
//       this.user = new User(userData);
//       localStorage.setItem('user', JSON.stringify(userData));
//     },
//     logout() {
//       this.user = null;
//       localStorage.removeItem('user');
//     },
//     loadUser() {
//       const savedUser = localStorage.getItem('user');
//       if (savedUser) {
//         this.user = new User(JSON.parse(savedUser));
//       }
//     }
//   }
// });