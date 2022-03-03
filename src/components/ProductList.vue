<template>
  <ul>
    <li v-for="product in productsStore.all" :key="product.id">
      {{ product.title }} - {{ product.price }}
      <br />
      <button :disabled="!product.inventory" @click="cartStore.addProductToCart(product)">Add to cart</button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useProductsStore } from '../store/modules/products';
import { useCartStore } from '../store/modules/cart';

const productsStore = useProductsStore();
productsStore.getAllProducts();
const cartStore = useCartStore();
</script>
