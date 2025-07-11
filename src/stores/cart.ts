import { defineStore } from 'pinia';
import type { Product } from '../types';

interface CartItem extends Product {
  quantity: number;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    count: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
  },
  actions: {
    addItem(item: Product) {
      const existing = this.items.find(i => i.id === item.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ ...item, quantity: 1 });
      }
    },
    removeItem(id: string) {
      const index = this.items.findIndex(i => i.id === id);
      if (index !== -1) this.items.splice(index, 1);
    },
    clearCart() {
      this.items = [];
    }
  }
});