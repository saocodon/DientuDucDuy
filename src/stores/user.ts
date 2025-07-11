import { defineStore } from 'pinia';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    setUser(user: User | null) {
      this.user = user;
    },
    initAuth() {
      try {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          this.setUser(user);
        }, (error) => {
          console.error('Auth state change error:', error);
        });
      } catch (error) {
        console.error('Error initializing auth:', error);
      }
    }
  }
});