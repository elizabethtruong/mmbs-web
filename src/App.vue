<template>
  <div id="app">
    
    <div id="nav" style="background-color:rgb(35, 35, 35);">
      <!--<router-link to="/">Home</router-link> |-->
      <router-link to="/login"><img src="./assets/icon-transparent.png" alt="MMBSLogo" width="50" height="50"></router-link>
      <!--<router-link to="/bookingcalendar">Booking Calendar</router-link>-->
    </div>
    <!--<h2 style="color:black">Music Matters Bookings</h2>-->
    <router-view />
    
  </div>
</template>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  //background-color: rgb(35, 35, 35);

}


#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: black;
    //display: block;
    //padding: 16px;
    &.router-link-exact-active {
      background-color: #1364b3;
      //color: white;
      //text-decoration: none;
    }
  }
}
</style>

