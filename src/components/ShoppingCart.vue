<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <p v-show="!cartStore.cartProducts.length">
      <i>Please add some products to cart.</i>
    </p>
    <ul>
      <li v-for="product in cartStore.cartProducts" :key="product.id">
        {{ product.title }} - {{ product.price }} x {{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{ cartStore.cartTotalPrice }}</p>
    <p><button :disabled="!cartStore.cartProducts.length" @click="cartStore.checkout">Checkout</button></p>
    <p v-show="cartStore.checkoutStatus">Checkout {{ cartStore.checkoutStatus }}.</p>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../store/modules/cart';

const cartStore = useCartStore();
</script>
