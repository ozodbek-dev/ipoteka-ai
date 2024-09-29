<script setup>
const emit = defineEmits(['openDrawer'])
defineProps({
  totalPrice: Number
})
</script>

<template>
  <header class="flex justify-between border-b border-slate-300 px-8 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="logo" class="w-10" />
        <div>
          <h1 class="text-xl font-bold uppercase">Vue Sneakers</h1>
          <p class="text-slate-500">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-10">
      <li class="flex items-center gap-3 group cursor-pointer" @click="() => emit('openDrawer')">
        <img src="/cart.svg" alt="Cart" />
        <b class="text-slate-500 group-hover:text-black">{{ totalPrice }} руб.</b>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center gap-3 group cursor-pointer">
          <img src="/heart.svg" alt="Cart" />
          <span class="text-slate-500 group-hover:text-balack">Закладки</span>
        </li>
      </router-link>

       <router-link to="/orders">
        <li class="flex items-center gap-3 group cursor-pointer">
          <span class="text-slate-500 group-hover:text-black">Мой заказы</span>
        </li>
      </router-link>

      <router-link to="/profile">
        <li class="flex items-center gap-3 group cursor-pointer">
          <img src="/profile.svg" alt="Cart" />
          <span class="text-slate-500 group-hover:text-black">Профиле</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>
