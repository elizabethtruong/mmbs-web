<template>
  <div id="documentsGenerated">
     <h1 class="subheading black--text">Music Matters Documents</h1>
     <v-container class="my-5">
       <v-layout row wrap>
         <v-flex xs12 sm6 md4 lg3 v-for="doc in docTypes" :key="doc.type">
           <v-card class="text-xs-center ma-3">
             <v-responsive class="pt-4">
               image goes here
             </v-responsive>
             <v-card-text>
               <div class="subheading">{{ doc.type }}</div>
             </v-card-text>
             <v-card-actions>
               <v-btn depressed class="transparent">
                 <v-icon left small>mdi-login</v-icon>
                 <span>View</span>
               </v-btn>
             </v-card-actions>
            </v-card>
         </v-flex>
       </v-layout>
     </v-container>
  </div>
</template>

<script>
export default {
  name: 'documents',
  components: {
  },
  mounted() {
    this.setupFirebase();
  },

  data: () => {
     return {
       docTypes: [
         { type: 'Calendars' },
         { type: 'Invoices' },
         { type: 'Booking Lists'},
         { type: 'Confirmations'}
       ]
    };
  },
};
</script>