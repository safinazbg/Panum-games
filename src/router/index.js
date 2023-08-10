import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MentalSpeed from '../views/MentalSpeed.vue'
import MentalTest from '../views/MentalTest.vue'
import WorkingMemory from "@/views/WorkingMemory.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/MentalSpeed',
    name: 'MentalSpeed',
    component: MentalSpeed
  },
  {
    path: '/MentalTest',
    name: 'MentalTest',
    component: MentalTest
  },{
    path: '/WorkingMemory',
    name: 'WorkingMemory',
    component: WorkingMemory
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
