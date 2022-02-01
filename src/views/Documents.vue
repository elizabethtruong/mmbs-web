<template>
  <div class="home">
    <h1>Welcome to Music Matters Booking System</h1>
    <img alt="Music Matters logo" src="../assets/icon-transparent.png" width="400" height="400">
    <h2>©2022</h2>
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

//   #button {
//   width: 125px;
//   height: 40px;
//   font-size: 100%;
//   color: black;
//   border: 1px solid black;
//   background-color: white;
// }

// h2 {
//     font-size: 200%;
//     color: rgb(255, 255, 255);
//   }

// p {
//     font-size: 200%;
//     color: rgb(255, 255, 255);
//   }

// #navigation5 {
//   padding: 0;
//   margin-top: -115px;
//   width: 150px;
//   background-color: rgb(60, 156, 255);
//   position: fixed;
//   height: 100%;
//   overflow: auto;
//   font-size: 150%;

//   a {
//     font-weight: bold;
//     color: black;
//     display: block;
//     padding: 16px;
//     &.router-link-exact-active {
//       background-color: #1364b3;
//       color: white;
//       text-decoration: none;
//     }
//   }

//   button {
//   width: 125px;
//   height: 40px;
//   font-size: 100%;
//   color: black;
//   border: 1px solid black;
//   background-color: white;
// }

//}

</style>