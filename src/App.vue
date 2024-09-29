<script setup>
import Header from './components/HeaderComponent.vue'
import Drawer from './components/DrawerComponent.vue'
import axios from 'axios'
import { ref, provide, watch, computed } from 'vue'

const cart = ref([])
const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => totalPrice.value * 0.05)
const isCreatingOrder = ref(false)
const orderId = ref();

const drawerOpen = ref(false)

const openDrawer = () => {
  drawerOpen.value = true
}
const closeDrawer = () => {
  drawerOpen.value = false
  orderId.value = null;
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('https://c367418a1f0df3d9.mokky.dev/orders', {
      items: cart.value,
      totalPrice: totalPrice.value
    })
    cart.value = []
    orderId.value=data.id
    return data
  } catch (error) {
    console.log(error)
  } finally {
    isCreatingOrder.value = false
  }
}
const removeFromCart = (item) => {
  cart.value = cart.value.filter((el) => el.id !== item.id)
  item.isAdded = true
}
const addToCart = (item) => {
  if (!cart.value.some((el) => el.id === item.id)) {
    cart.value.push(item)
    item.isAdded = true
  }
}

const saveToLocalStorage = () => localStorage.setItem('cart', JSON.stringify(cart.value))
watch(cart, saveToLocalStorage, { deep: true })

provide('cart', {
  openDrawer,
  closeDrawer,
  cart,
  addToCart,
  removeFromCart
})
</script>

<template>
  <div class="bg-white max-2xl:w-3/5 w-5/6 m-auto rounded-xl shadow-xl shadow-grey-200 mt-20">
    <Drawer
      v-if="drawerOpen"
      :total-price="totalPrice"
      :vat-price="vatPrice"
      @create-order="createOrder"
      :order-id="orderId"
      :is-creating-order="isCreatingOrder"
    />
    <Header @open-drawer="openDrawer" :total-price="totalPrice" />

    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
