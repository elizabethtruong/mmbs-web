<template>
  <div id="app">
    <div class="routing" id="nav" v-if="this.$route.path !== '/login'">
      <router-link to="/">Home</router-link> |
      <router-link to="/calendar">Calendar</router-link> |
      <router-link to="/bList">Bookings List</router-link> |
      <router-link to="/clients">Clients</router-link> |
      <router-link to="/documents">Documents</router-link> | 
      <router-link to="/login">Log Out</router-link>
    </div>
    <router-view/>
  </div>
</template>

<body></body>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  font-size: 25px;
  border: 2px solid black;
  background-color: #1E88E5;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #FFFFFF;
    }
  }
}

body {
  background-color: #F5F5F5;
}
</style>

