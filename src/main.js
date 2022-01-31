import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import firebase from 'firebase/compat/app'
import "firebase/compat/auth"
import 'firebase/compat/firestore'
import vuetify from './plugins/vuetify'
import VueTextareaAutosize from 'vue-textarea-autosize'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(VueTextareaAutosize);


Vue.config.productionTip = false
Vue.prototype.$axios = axios;

// Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyABrXbvSkA_LqT0zKSTJ3_JHqNcxgyuxsQ",
  authDomain: "music-matters-229420.firebaseapp.com",
  databaseURL: "https://music-matters-229420.firebaseio.com",
  projectId: "music-matters-229420",
  storageBucket: "music-matters-229420.appspot.com",
  messagingSenderId: "939526187420",
  appId: "1:939526187420:web:9bfd8eb38ec627a575c059"

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();



//let app;

//firebase.auth().onAuthStateChanged(user => {
//console.log("user", user);
//if (!app) {
//app = new Vue({
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
//}
//});

// app = new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount("#app");
