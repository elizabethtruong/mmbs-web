<template>
  <div id="documentsGenerated">
      <center>
            <h2>Music Matters Documents</h2>
            <p>Artist invoices and booking confirmations to be found here</p>
        </center>
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

h1 {
  padding: 50px;
}

</style>