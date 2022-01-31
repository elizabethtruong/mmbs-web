<template>
  <div id="content" class="content">
    <header>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/vuetify/2.3.10/vuetify.css"/>
    </header>
    <top-header></top-header>
    <div id="navigation3">
      <router-link to="/">Home</router-link>
      <!--<router-link to="/login">Login</router-link>-->
      <router-link to="/bookingcalendar">Bookings</router-link>
      <router-link to="/bookinglist"><img src="../assets/icon-transparent.png" alt="MMBSLogo" width="125" height="125">Bookings List</router-link>
      <router-link to="/clients">Clients</router-link>
      <router-link to="/documents">Documents</router-link>
      <button class="but" @click="signOut">Sign out</button>
    </div>
    <router-view />
    <div ref="document">


    <v-app class="mx-auto"
      max-width="700"
      style="margin-left: 150px;">

            
        <table> 
            <caption style="font-size: 30px; font-weight: bold;">The Exchange Live Music Bookings<br>  <span> by Date  </span> <br> <span> Month Year </span>
                  </caption>
           <thead>
                
               <tr>
                   <th>Artist</th>
                   <th>Gig Time</th>
                   <th>Compensation</th>
               </tr>

            </thead> 
            
            <tbody> 
                <tr v-for="booking in calEvent" :key=booking.id>
                    <td>{{booking.clientName}}</td>
                    <td>{{booking.start + ' to ' + booking.end}}</td>
                    <td>{{ '$' + booking.price}}</td>
                </tr>
            </tbody>
        </table>
<div class="text-xs-center; mt-10">
        <button  style="background-color:rgb(60, 156, 255); width: 125px;height: 35px; font-size: 100%;" @click="exportToPDF">
          Download PDF</button>

</div>

 
    </v-app>

    </div>
    
  </div>


</template>


<script>
//import jsPDF from 'jspdf' 
import html2pdf from 'html2pdf.js'
//import html2canvas from "html2canvas"
import { db } from '@/main'
import firebase from "firebase/compat/app";
import "firebase/auth";
export default {
  name: 'booking',
  components: {
  },
  mounted() {
    this.setupFirebase();
  },

 data: () => {
     return {
         calEvent: [],
         booking: {
             clientName:null,
             start:null,
             conmpesation:null

         },
      blah: "erik",
      loggedIn:false,
    };
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


      exportToPDF () {
				html2pdf(this.$refs.document, {
					margin: 0,
					filename: 'document.pdf',
					image: { type: 'jpeg', quality: 0.98,},
					html2canvas: { dpi: 192, letterRendering: true },
					jsPDF: { unit: 'in', format: 'a4', orientation: 'p' }
				})
			},
            
   
    },     

created(){

  /*db.collection("calEvent").get().then((querySnapshot) => {
        //this.product = querySnapshot
        const promises = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never defined for query doc snapshots
            promises.push(doc.orderBy("date").equalTo("2021-11-26")); 
        });
            return Promise.all(promises);
    }).then(results => {
            //console.log(results);
            results.forEach(querySnapshot => {
                querySnapshot.forEach(event => {
                    this.calEvent.push(event.val());
                });     
            });

  });*/



        
    db.collection("calEvent").get().then((querySnapshot) => {
        //this.product = querySnapshot
        querySnapshot.forEach((doc) => {
            // doc.data() is never defined for query doc snapshots
            this.calEvent.push(doc.data());
    });
});



}


 
};
</script>

<style lang="scss">

.content {
  color: rgb(35, 35, 35);
}

  #button {
  width: 125px;
  height: 40px;
  font-size: 100%;
  color: black;
  border: 1px solid black;
  background-color: white;
}


#navigation3 {
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
