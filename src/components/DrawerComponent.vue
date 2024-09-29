<script setup>
import { inject } from 'vue'
import CartItemList from './CartItemList.vue'
import DrawerHead from './DrawerHead.vue'
import InfoBlcok from './InfoBlcok.vue'
defineProps({
  totalPrice: Number,
  vatPrice: Number,
  orderId: Number
})
const { closeDrawer, cart } = inject('cart')
const emit = defineEmits(['createOrder', 'isCompleteTimeInterval'])
</script>

<template>
  <div @click="closeDrawer" class="fixed z-10 top-0 left-0 h-full w-full bg-black opacity-70" />
  <div
    class="flex flex-col justify-between fixed h-full z-10 top-0 right-0 w-96 bg-white px-10 py-7"
  >
    <DrawerHead />
    <div v-if="!totalPrice || orderId" class="flex h-full items-center">
      <InfoBlcok
        v-if="orderId"
        title="Заказ оформлен!"
        :description="`Ваш заказ #${orderId} скро будет передан.`"
        image-url="/order-success-icon.png"
      />
      <InfoBlcok
        v-if="!totalPrice && !orderId"
        title="Корзина пустая"
        description="Добавьте хотя бы одну продукт, что бы сделать заказ."
        image-url="/package-icon.png"
      />
    </div>

    <CartItemList />

    <div v-if="totalPrice">
      <div class="flex flex-col gap-5">
        <div class="flex items-end gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed" />
          <span class="font-bold">{{ totalPrice }} руб.</span>
        </div>

        <div class="flex items-end gap-2">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed" />
          <span class="font-bold">{{ vatPrice }} руб.</span>
        </div>
      </div>

      <button
        class="flex justify-center items-center gap-3 w-full py-3 mt-10 bg-lime-500 text-white rounded-xl transition active:bg-lime-700 hover:bg-lime-600 disabled:bg-slate-300"
        :disabled="isCreatingOrder || !cart.length"
        @click="() => emit('createOrder')"
      >
        {{ isCreatingOrder ? 'Загрузка' : 'Оформить заказ' }}
        <img
          src="/arrow-next.svg"
          alt="Arrow"
          :style="isCreatingOrder ? 'display:none' : 'display-block'"
        />
      </button>
    </div>
  </div>
</template>
