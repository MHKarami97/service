import { createRouter, createWebHistory } from 'vue-router'

var HomeView = () => import('../views/HomeView.vue')
var ItemDetailView = () => import('../views/ItemDetailView.vue')
var UpcomingView = () => import('../views/UpcomingView.vue')

var routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/upcoming', name: 'upcoming', component: UpcomingView },
  { path: '/item/:id', name: 'item-detail', component: ItemDetailView, props: true }
]

var router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
