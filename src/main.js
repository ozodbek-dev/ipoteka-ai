import './assets/main.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './pages/HomePage.vue'
import FavoritesPage from './pages/FavoritesPage.vue'
import OrdersPage from './pages/OrdersPage.vue'
import ProfilePage from './pages/ProfilePage.vue'

import { createApp } from 'vue'
import App from './App.vue'


const app = createApp(App)

const routes = [
  { path: '/', name:"Home", component: HomePage },
  { path: '/favorites',name:'Favorites', component: FavoritesPage },
  { path: '/orders',name:'Orders', component: OrdersPage },
  { path: '/profile',name:'Profile', component: ProfilePage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})



app.use(autoAnimatePlugin)
app.use(router)
app.mount('#app')


