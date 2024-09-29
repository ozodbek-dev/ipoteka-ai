<script setup>
import Card from './CardComponent.vue'

defineProps({
  items: Array, 
  isFavorites:Boolean
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>
<template>
  <div class="grid grid-cols-4 gap-4" v-auto-animate>
    <Card
      :is-favorites="isFavorites"
      v-for="item in items"
      :id="item.id"
      :key="item.id"
      :imageUrl="item.imageUrl"
      :onClickAdd="() => emit('addToCart', item)"
      :onClickFavorite="() => emit('addToFavorite', item)"
      :title="item.title"
      :price="item.price"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
    />
  </div>
</template>
