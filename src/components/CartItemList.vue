<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'
const { cart } = inject('cart')
const { removeFromCart } = inject('cart')
</script>

<template>
  <div class="flex flex-col flex-1 gap-5 overflow-auto" v-auto-animate>
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :img="item.imageUrl"
      :onClickDelete="() => removeFromCart(item)"
    />
  </div>
</template>
