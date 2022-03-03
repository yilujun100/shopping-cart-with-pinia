import { defineStore } from 'pinia';
import shop, { IProduct } from '../../api/shop';

export const useProductsStore = defineStore('products', {
  // initial state
  state: () => {
    return {
      all: [] as IProduct[]
    };
  },

  // getters
  getters: {},

  // actions
  actions: {
    async getAllProducts() {
      const products = await shop.getProducts();
      this.all = products;
    },

    decrementProductInventory(id: number) {
      const product = this.all.find(product => product.id === id);
      if (product) {
        product.inventory--;
      }
    }
  }
});
