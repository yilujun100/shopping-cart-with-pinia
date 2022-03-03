<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import ProductList from './components/ProductList.vue';
import ShoppingCart from './components/ShoppingCart.vue';
</script>

<template>
  <div id="app">
    <h1>Shopping Cart Example With Pinia</h1>
    <hr />
    <h2>Products</h2>
    <ProductList />
    <hr />
    <ShoppingCart />
  </div>
</template>

<style></style>
