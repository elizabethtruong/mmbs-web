<template>
  <!-- <div id="app">
    <div class="routing" id="nav" v-if="this.$route.path !== '/'">
      <router-link to="/home"><img class="logo" src="./assets/mm4-transparent.png" alt="MMBSLogo" width="300" height="75"></router-link>
      <router-link to="/venues">Venues</router-link> |
      <router-link to="/calendar">Calendar</router-link> |
      <router-link to="/bList">Bookings List</router-link> |
      <router-link to="/clients">Clients</router-link> |
      <router-link to="/documents">Documents</router-link>
      <router-link style="text-decoration: none; color: inherit; float: right;" to="/"><v-icon large>mdi-logout</v-icon></router-link>
    </div>
    <router-view/>
  </div> -->

  <v-app>
    <Navbar v-if='this.$route.path !== "/"' />
    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>

</template>

<body></body>

<style lang="scss">
#app {
  font-family: Avenir, Comic Sans MS, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  //background-color: #90A4AE;
}

// #nav {
//   padding: 30px;
//   font-size: 25px;
//   border: 2px solid black;
//   background-color:rgb(30, 136, 229);

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #FFFFFF;
//     }
//   }
// }

.logo {
  position: absolute;
  top: 1.5%;
  left: 1%;
}

body {
  background-color: #F5F5F5;
}
</style>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: { Navbar },
  data () {
    return {
      //
    }
  }
}
</script>

