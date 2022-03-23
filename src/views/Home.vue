<template>
  <div class="home">
    <h1>Welcome to Music Matters Booking System</h1>
    <img alt="Music Matters logo" src="../assets/icon-transparent.png" width="350" height="350">
    <h2>©2022</h2>
  </div>
</template>


<script>
import firebase from "firebase/compat/app";
import "firebase/auth";
export default {
  name: 'app',
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

h1 {
  padding: 50px;
}

</style>

  