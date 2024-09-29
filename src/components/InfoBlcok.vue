<script setup>
import { inject } from 'vue';

defineProps({
  title: String,
  imageUrl: String,
  description: String
})
const {closeDrawer} = inject('cart')
</script>
<template>
  <div class="flex flex-col items-center w-72 mx-auto flex-1 p-1 text-center justify-center">
    <img height="70" width="70 " :src="imageUrl" alt="image" />
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <h2 class="text-gray-400">{{ description }}</h2>
    <button
            @click="closeDrawer"
      class="flex justify-center items-center gap-3 w-full py-3 mt-10 bg-transparent border border-lime-500 hover:text-white rounded-xl transition text-black  active:bg-lime-700 hover:bg-lime-600"
    >
     Закрыт
    </button>
  </div>
</template>
