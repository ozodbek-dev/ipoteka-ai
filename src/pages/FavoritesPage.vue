<script setup>
import CardList from '@/components/CardList.vue';
import axios from 'axios'
import { ref, onMounted, inject } from 'vue'
const items = ref([])

const { addToCart } = inject('cart');

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://c367418a1f0df3d9.mokky.dev/favorites?_relations=items'
    )
    items.value = data.map(obj=>obj.item)
  } catch (error) {
    console.log(error)
  }
})
</script>
<template>
  <h2 class="text-3xl font-bold mb-8">Мой закладки</h2>
  <CardList :items="items"  @add-to-cart="addToCart" :is-favorites="true" />

</template>
