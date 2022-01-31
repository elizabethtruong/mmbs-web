
<template>
<div id="cList">

  <div id="navigation4">
      <router-link to="/">Home</router-link>
      <!--<router-link to="/login">Login</router-link>-->
      <router-link to="/bookingcalendar">Bookings</router-link>
      <router-link to="/bookinglist">Bookings List</router-link>
      <router-link to="/clients"><img src="../assets/icon-transparent.png" alt="MMBSLogo" width="125" height="125">Clients</router-link>
      <router-link to="/documents">Documents</router-link>
      <button class="but" @click="signOut">Sign out</button>
    </div>
    <router-view />

  <v-data-table
    :headers="headers"
    :fields="clients"
    sort-by="performers"
    class="elevation-1"
    style="margin-left: 150px;"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Clients</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn style="background-color:rgb(60, 156, 255);" color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> New Item </v-btn>
          </template>
          <v-card>
            <v-card-title> <span class="text-h5">{{ formTitle }}</span> </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedField.email" label="email (required)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedField.performers" label="performer (required)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedField.stage" label="Stage"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedField.splitCheck" label="Split Check"></v-text-field>
                  </v-col>
                  
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteFieldConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template > <!--v-slot:item.actions="{ item }"-->
      <v-icon small class="mr-2" @click="editField(field)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteField(field)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="black" @click="getClients">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</div>
</template>


<script>

import { db } from '@/main'
import firebase from "firebase/compat/app";
import "firebase/auth";
export default {
  components: {
  },
  mounted() {
    this.setupFirebase();
  },

  data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Performer(s)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Stage', value: 'stage' },
        { text: 'Email', value: 'email' },
        { text: 'Split Check', value: 'splitCheck' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      clients: [],
      editedIndex: -1,
      editedField: {
        name: null,
        stage: null,
        email: null,
        splitCheck: null,
      },
    
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Field' : 'Edit Field'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.getClients()
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

    async getClients () {
      let snapshot = await db.collection('clients').get()
      const clients = []
      snapshot.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;
        clients.push(appData);
      })
      this.clients = clients;
    },

    /*async addClient () {
      if (this.email && this.stage) {
        await db.collection("clients").add({
          email: this.email,
          performers: this.performers,
          splitCheck: this.splitCheck.toLowerCase(),
          stage: this.stage,

        })
        this.getClients()
        this.email = '',
        this.performers = '',
        this.splitCheck = '',
        this.stage = ''
      } else {
        alert('You must enter email, and stage')
      }
    },*/

    /*editField (field) {
        this.editedIndex = this.clients.indexOf(field)
        this.editedField = Object.assign({}, field)
        this.dialog = true
      },

      deleteField (field) {
        this.editedIndex = this.clients.indexOf(field)
        this.editedField = Object.assign({}, field)
        this.dialogDelete = true
      },

      deleteFieldConfirm () {
        this.clients.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedField = Object.assign({}, this.defaultField)
          this.editedIndex = -1
        })
      },*/



    /*editClient (cl) {
      this.currentlyEditing = cl.id
    },
    async updateEvent (cl) {
      await db.collection('clients').doc(this.currentlyEditing).update({
        email: cl.email,
        performers: cl.performers,
        splitCheck: cl.splitCheck.toLowerCase(),
        stage: cl.stage
      })
      this.selectedOpen = false,
      this.currentlyEditing = null
    },
    async deleteClient (cl) {
      await db.collection("clients").doc(cl).delete()
      this.selectedOpen = false,
      this.getEvents()
    },*/
    
   /*closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedField = Object.assign({}, this.defaultField)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.clients[this.editedIndex], this.editedField)
        } else {
          this.clients.push(this.editedField)
        }
        this.close()
      },*/


  },
 
};

</script>

<!--<style lang="scss">

  #button {
  width: 125px;
  height: 40px;
  font-size: 100%;
  color: black;
  border: 1px solid black;
  background-color: white;
}


#navigation4 {
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

</style>-->

<!--<template>
      
  <div id="cList">
    <header></header>
    <top-header></top-header>
    <div id="navigation4">
      <router-link to="/">Home</router-link>-->
      <!--<router-link to="/login">Login</router-link>-->
      <!--<router-link to="/bookingcalendar">Bookings</router-link>
      <router-link to="/bookinglist">Bookings List</router-link>
      <router-link to="/clients"><img src="../assets/icon-transparent.png" alt="MMBSLogo" width="125" height="125">Clients</router-link>
      <router-link to="/documents">Documents</router-link>
      <button class="but" @click="signOut">Sign out</button>
    </div>
    <router-view />

    <v-app class="mx-auto;"
      max-width="700"
      style="margin-left: 150px;">


      <v-sheet height="64">
        <v-toolbar flat color="white">
          <div style="background-color:rgb(60, 156, 255); width: 165px;height: 35px; font-size: 100%;">
          <v-btn  color="primary" dark @click.stop="dialog = true">
            ADD NEW ClIENT
          </v-btn>
          </div>

          </v-toolbar>
      </v-sheet>

      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addClient">
              <v-text-field v-model="email" type="text" label="email (required)"></v-text-field>
              <v-text-field v-model="performers" type="text" label="performer (required)"></v-text-field>
              <v-text-field v-model="splitCheck" type="text" label="splitCheck (yes/no)"></v-text-field>
              <v-text-field v-model="stage" type="text" label="stage (required)"></v-text-field>
              <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
                Add client
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>



      <table> 
        <caption style="font-size: 30px; font-weight: bold;">Clients </caption>
           <thead>
               <tr>
                   <th>Performer(s)</th>
                   <th>Stage</th>
                   <th>Email</th>
                   <th>Split Check</th>
               </tr>

            </thead> 
            
            <tbody> 
                <tr v-for="client in clients" :key=client.id>
                    <td>{{client.performers}}</td>
                    <td>{{client.stage}}</td>
                    <td>{{client.email}}</td>
                    <td>{{client.splitCheck}}</td>
                </tr>
            </tbody>
        </table>
   
    </v-app>
 
  </div>

</template>

<script>
import { db } from '@/main'
import firebase from "firebase/compat/app";
import "firebase/auth";
export default {
  name: 'clients',
  components: {
  },
  mounted() {
    this.setupFirebase();
  },

 data: () => {
     return {
         clients: [],
         client: {
             email:null,

         },
      blah: "erik",
      loggedIn:false,
      dialog: false,
      dialogDate: false
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

    async getClients () {
      let snapshot = await db.collection('clients').get()
      const clients = []
      snapshot.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;
        clients.push(appData);
      })
      this.clients = clients;
    },

    async addClient () {
      if (this.email && this.stage) {
        await db.collection("clients").add({
          email: this.email,
          performers: this.performers,
          splitCheck: this.splitCheck.toLowerCase(),
          stage: this.stage,

        })
        this.getEvents()
        this.email = '',
        this.performers = '',
        this.splitCheck = '',
        this.stage = ''
      } else {
        alert('You must enter email, and stage')
      }
    },
    editClient (cl) {
      this.currentlyEditing = cl.id
    },
    async updateEvent (cl) {
      await db.collection('clients').doc(this.currentlyEditing).update({
        email: cl.email,
        performers: cl.performers,
        splitCheck: cl.splitCheck.toLowerCase(),
        stage: cl.stage
      })
      this.selectedOpen = false,
      this.currentlyEditing = null
    },
    async deleteClient (cl) {
      await db.collection("clients").doc(cl).delete()
      this.selectedOpen = false,
      this.getEvents()
    },


  },


created(){

    db.collection("clients").get().then((querySnapshot) => {
        //this.product = querySnapshot
        querySnapshot.forEach((doc) => {
            // doc.data() is never defined for query doc snapshots
            this.clients.push(doc.data());
    });
});

}
 
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


#navigation4 {
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

</style>-->