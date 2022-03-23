<template>
<v-app>
    <v-data-table
        :headers="headers"
        :items="clients"
        sort-by="performers"
        class="elevation-1"
    >
    <template v-slot:top>
        <v-toolbar 
            flat
        >
            <v-toolbar-title>Clients</v-toolbar-title>
            <v-divider
                class="mx-4" 
                inset 
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="500px"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            style="background-color:rbg(60, 156, 255);"
            color="primary"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
            >
                New Client
            </v-btn>
        </template>
        
        <v-card>
            <v-card-title>
            <span class="text-h5">New Client</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                  <v-form>

                            <v-text-field
                            v-model="editedItem.performers"
                            label="Performer(s)*"
                            required
                            ></v-text-field>

                            <v-text-field
                            v-model="editedItem.stage"
                            label="Stage*"
                            required
                            ></v-text-field>


                            <v-text-field
                            v-model="editedItem.email"
                            label="Email*"
                            required
                            ></v-text-field>

                            <v-text-field
                            v-model="editedItem.phoneNumber"
                            label="Phone Number*"
                            required
                            ></v-text-field>

                            <v-select
                            v-model="editedItem.splitCheck"
                            :items="['Yes', 'No']"
                            label="Split Check*"
                            required
                            ></v-select>
                            
                            <small>*indicates required field</small>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="close"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="save"
                            >
                                Save
                            </v-btn>
                  </v-form>
                </v-container>
            </v-card-text>
    </v-card>
    </v-dialog>
    
    <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this client?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
        </v-data-table>
    </v-app>
</template>

<script>
  import { db } from '@/main'

  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Performer(s)',
          align: 'start',
          sortable: false,
          value: 'performers',
        },
        { text: 'Stage', value: 'stage' },
        { text: 'Email', value: 'email' },
        { text: 'Phone Number', value: 'phoneNumber' },
        { text: 'Split Check?', value: 'splitCheck' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      clients: [],
      editedIndex: -1,
      editedItem: {
        performers: null,
        stage: null,
        email: null,
        phoneNumber: null,
        splitCheck: null,
      },
      defaultItem: {
        performers: '',
        stage: '',
        email: '',
        phoneNumber: '',
        splitCheck: '',
      },
    }),
    mounted () {
      this.getClients()
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
      this.initialize()
    },

    methods: {
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
      getClientName () {
        return document.getElementById('performers').value
      },
      async addClient () {
        if (this.performers && this.email && this.phoneNumber && this.stage && this.splitCheck) {
          this.save()
          await db.collection('clients').add({
            performers: this.performers,
            stage: this.stage,
            email: this.email,
            phoneNumber: this.phoneNumber,
            splitCheck: this.splitCheck,
          })
          this.getClients()
          this.performers = '',
          this.stage = '',
          this.email = '',
          this.phoneNumber = '',
          this.splitCheck = ''
        } else {
          alert('You must enter all client information')
        }
      },
      async updateClient (item) {
        await db.collection('clients').doc.update({
          clientName: item.performers,
          stage: item.stage,
          email: item.email,
          phoneNumber: item.phoneNumber,
          splitCheck: item.splitCheck
        })
      },
      async deleteClient (item) {
        await db.collection("clients").doc(item).delete()
        this.selectedOpen = false,
        this.getClients()
    },
      editItem (item) {
        this.editedIndex = this.clients.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteItem (item) {
        this.editedIndex = this.clients.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        this.clients.splice(this.editedIndex, 1)
        this.closeDelete()
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.clients[this.editedIndex], this.editedItem)
        } else {
          this.clients.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>