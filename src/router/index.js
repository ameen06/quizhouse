import { createRouter, createWebHistory } from '@ionic/vue-router';
import IonicPreference from '@/IonicPreference';
import HomePage from '../views/HomePage.vue'
import Dashboard from '../views/Dashboard.vue'
import Question from '../views/Question.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    beforeEnter: [async()=>{
      var user = await IonicPreference.get('user')
      return user ? {name: 'Dashboard'} : true;
    }]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: [async()=>{
      var user = await IonicPreference.get('user')
      return user ? true : {name: 'Home'};
    }]
  },
  {
    path: '/level/:id/questions',
    name: 'Question',
    component: Question
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
