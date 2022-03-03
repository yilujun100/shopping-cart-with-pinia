import { defineStore } from 'pinia';
import shop, { IProduct } from '../../api/shop';
import { useProductsStore } from './products';

type CartProduct = {
  quantity: number;
} & Omit<IProduct, 'inventory'>;
export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      cartProducts: [] as CartProduct[],
      checkoutStatus: null as null | string
    };
  },

  getters: {
    cartTotalPrice(state): number {
      return state.cartProducts.reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0);
    }
  },

  actions: {
    addProductToCart(product: IProduct) {
      if (product.inventory > 0) {
        const cartItem = this.cartProducts.find(item => item.id === product.id);
        if (!cartItem) {
          this.cartProducts.push({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1
          });
        } else {
          cartItem.quantity++;
        }
        // update product inventory
        const productsStore = useProductsStore();
        productsStore.decrementProductInventory(product.id);
      }
    },

    async checkout() {
      try {
        await shop.buyProducts();
        this.checkoutStatus = 'successful';
        this.cartProducts = [];
      } catch (e) {
        console.error(e);
        this.checkoutStatus = 'failed';
      }
    }
  }
});
