import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthorView from '../views/author/AuthorView.vue'
import GenreView from '../views/genre/GenreView.vue'
import BookView from '../views/book/BookView.vue'
import ReviewView from '@/views/review/ReviewView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/author',
    name: 'author',
    component: AuthorView
  },
  {
    path: '/genre',
    name: 'genre',
    component: GenreView
  },
  {
    path: '/book',
    name: 'book',
    component: BookView
  },
  {
    path: '/review',
    name: 'review',
    component: ReviewView
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
