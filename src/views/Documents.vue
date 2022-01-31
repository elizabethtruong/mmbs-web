<template>
  <div id="documentsGenerated">
    <header></header>
    <top-header></top-header>
    <div id="navigation5">
      <router-link to="/">Home</router-link>
      <!--<router-link to="/login">Login</router-link>-->
      <router-link to="/bookingcalendar">Bookings</router-link>
      <router-link to="/bookinglist">Bookings List</router-link>
      <router-link to="/clients">Clients</router-link>
      <router-link to="/documents"><img src="../assets/icon-transparent.png" alt="MMBSLogo" width="125" height="125">Documents</router-link>
      <button class="but" @click="signOut">Sign out</button>
    </div>
    <router-view />
    <v-app class="mx-auto"
      max-width="700"
      style="margin-left: 150px;">

      <center>
            <h2>MusicMatters Documents</h2>
            <p>Documents will go here</p>
        </center>
   

    </v-app>
 
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/auth";
export default {
  name: 'documents',
  components: {
  },
  mounted() {
    this.setupFirebase();
  },

  methods: {
    setupFirebase() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          console.log("signed in");
          this.loggedIn = true;
        } else {
          // No user is signed in.
          this.loggedIn = false;
          console.log("signed out", this.loggedIn);
        }
      });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "login" });
        });
    },
  },


  data: () => {
     return {
      blah: "erik",
      loggedIn:false,
    };
  },
};
</script>

<style lang="scss">

  #button {
  width: 125px;
  height: 40px;
  font-size: 100%;
  color: black;
  border: 1px solid black;
  background-color: white;
}

h2 {
    font-size: 200%;
    color: rgb(255, 255, 255);
  }

p {
    font-size: 200%;
    color: rgb(255, 255, 255);
  }

#navigation5 {
  padding: 0;
  margin-top: -115px;
  width: 150px;
  background-color: rgb(60, 156, 255);
  position: fixed;
  height: 100%;
  overflow: auto;
  font-size: 150%;

  a {
    font-weight: bold;
    color: black;
    display: block;
    padding: 16px;
    &.router-link-exact-active {
      background-color: #1364b3;
      color: white;
      text-decoration: none;
    }
  }

  button {
  width: 125px;
  height: 40px;
  font-size: 100%;
  color: black;
  border: 1px solid black;
  background-color: white;
}

}

</style>