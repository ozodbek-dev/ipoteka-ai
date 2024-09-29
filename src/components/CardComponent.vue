<script setup>
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function,
  isFavorites:Boolean
})
</script>
<template>
  <div
    class="relative border border-slate-100 rounded-3xl px-8 py-8 cursor-pointer shadow-sm hover:-translate-y-2 hover:scale-105 transition-all hover:shadow-xl"
  >
    <img
      :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
      alt="like-2"
      v-if="!isFavorites"
      class="absolute top-3 left-3"
      @click="onClickFavorite"
    />
    <img :src="imageUrl" alt="sneackers-1" />
    <p class="mt-2">{{ title }}</p>

    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-500"> Цена: </span>
        <span>{{ price }} руб.</span>
      </div>
      <img @click="onClickAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="plus" />
    </div>
  </div>
</template>
