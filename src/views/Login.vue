<template>
  <div>
    <center>
			<h1>Music Matters BS Login Portal:</h1>
		</center>
    <form @submit.prevent="pressed">
      <div class="login">
        <input type="text" placeholder="email" v-model="email" />
      </div>
      <div class="password">
        <input type="password" placeholder="password" v-model="password" />
      </div>

      <button style="background-color:rgb(30, 136, 229); width:250px; height:75px; font-size:125%;">Sign In</button>
       
    </form>
    <center>
			<br>
			<img src="../assets/icon-transparent.png" alt="MMBSLogo" width="80" height="80">
			<br>
      
			<p>© Music Matters 2022</p>
		</center>
    <div class="error" v-if="error">{{ error.message }}</div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    pressed() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          console.log(data);
          this.$router.replace({ name: "Home" });
        })
        .catch((error) => {
          this.error = error;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  color: inherit;
}

h1 {
			font-size: 150%;
			color:#2c3e50;
			}

h2 {
			font-size: 150%;
			color:#2c3e50;
		}

p {
			font-size: 150%;
			color:#2c3e50;
		}

input {
  width: 400px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
  background-color: #ECEFF1;
}

.error {
  color: white;
}

</style>
