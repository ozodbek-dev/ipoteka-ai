<script setup>
import { inject, reactive, watch,ref, onMounted } from 'vue'
import CardList from '@/components/CardList.vue'
import debounce from 'lodash.debounce'
import axios from 'axios'

const items = ref([])

const { addToCart, cart } = inject('cart')
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})
const onChangeSelect = (event) => (filters.sortBy = event.target.value)
const onInputSearch = debounce((event) => (filters.searchQuery = event.target.value),600)
const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id, 
      }
      const { data } = await axios.post('https://c367418a1f0df3d9.mokky.dev/favorites', obj)
      item.isFavorite = true
      item.favoriteId = data.id
    } else {
      await axios.delete(`https://c367418a1f0df3d9.mokky.dev/favorites/${item.favoriteId}`)
      item.isFavorite = false
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}
const changeStatusOfAllAddedItems = () => {
  if (cart.value.length === 0) {
    items.value = items.value.map((item) => {
    return {
      ...item,
      isAdded: false
    }
  })
  }
}
const fetchItems = async () => {
  try {
    const params = { sortBy: filters.sortBy }

    if (filters.searchQuery) params.title = `*${filters.searchQuery}*`
    const { data } = await axios.get('https://c367418a1f0df3d9.mokky.dev/items', { params })
    items.value = data.map((item) => ({
      ...item,
      isAdded: false,
      isFavorite: false,
      favoriteId: null
    }))
  } catch (error) {
    console.log(error)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://c367418a1f0df3d9.mokky.dev/favorites')
    items.value = items.value.map((item) => {
      const favorite = favorites.find((fav) => fav.item_id === item.id)
      if (!favorite) return item
      return { ...item, isFavorite: true, favoriteId: favorite.id }
    })
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localStorage.getItem('cart')) : []
  await fetchItems()
  await fetchFavorites()
  items.value = items.value.map((item) => {
    return {
      ...item,
      isAdded: cart.value.some((i) => i.id === item.id)
    }
  })
})
watch(cart, changeStatusOfAllAddedItems, {deep:true})

watch(filters, fetchItems,)

</script>
<template>
  <div class="flex justify-between items-center mb-10">
    <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
    <div class="flex items-center gap-4">
      <select
        @change="onChangeSelect"
        class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none"
      >
        <option value="name">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>
      <div class="relative">
        <input
          type="text"
          @input="onInputSearch"
          class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400"
          placeholder="Поиск..."
        />
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <img src="/search.svg" />
        </div>
      </div>
    </div>
  </div>

  <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="addToCart" />
</template>
