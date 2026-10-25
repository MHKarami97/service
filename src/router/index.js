import { createRouter, createWebHistory } from 'vue-router'

var HomeView = () => import('../views/HomeView.vue')
var ItemDetailView = () => import('../views/ItemDetailView.vue')
var UpcomingView = () => import('../views/UpcomingView.vue')
var GuideView = () => import('../views/GuideView.vue')

var routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/upcoming', name: 'upcoming', component: UpcomingView },
  { path: '/guide', name: 'guide', component: GuideView },
  { path: '/item/:id', name: 'item-detail', component: ItemDetailView, props: true }
]

var router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
