import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import BookingCalendar from '../views/BookingCalendar.vue';
import BookingList from '../views/BookingList.vue';
import Clients from '../views/Clients.vue';
import Documents from '../views/Documents.vue';
import Venues from '../views/Venues.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { 
      requiresAuth: true 
    }
  },

  {
    path: "/venues",
    name: "Venues",
    component: Venues,
    meta: { 
      requiresAuth: true 
    }
  },

  {
    path: "/",
    name: "login",
    component: Login
  },

  {
    path: "/calendar",
    name: "BookingCalendar",
    component: BookingCalendar,
    meta: { 
      requiresAuth: true 
    }
  },

  {
    path: "/bList",
    name: "bookinglist",
    component: BookingList,
    meta: { 
      requiresAuth: true 
    }
  },

  {
    path: "/clients",
    name: "clients",
    component: Clients,
    meta: { 
      requiresAuth: true 
    }
  },


  {
    path: "/documents",
    name: "documents",
    component: Documents,
    meta: { 
      requiresAuth: true 
    }
  },

  // If page does not exist, redirect to login
  {
    path: "*",
    redirect: '/'
  }

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  console.log("isauthenticated", isAuthenticated);
  if (requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
