<template>
  <div>
    <v-app>
       <v-content>
          <Calendar/>
        </v-content>
        <input 
          type="button" value="Generate PDF" 
          style="background-color: #4CAF50; width: 125px; height: 35px; font-size: 100%; margin-left: 50%; margin-bottom: 80px;" @click="generateReport">
    <vue-html2pdf 
        :show-layout="false" 
        :float-layout="true" 
        :enable-download="true" 
        :preview-modal="false" 
        :paginate-elements-by-height="1400" 
        filename="calendar" 
        :pdf-quality="2" 
        :manual-pagination="false" 
        pdf-format="a4" 
        pdf-orientation="landscape" 
        pdf-content-width="1125px" 
        @progress="onProgress($event)" 
        @hasStartedGeneration="hasStartedGeneration()" 
        @hasGenerated="hasGenerated($event)" 
        ref="html2Pdf" 
    > 

        <section slot="pdf-content"> 
          <section class="pdf-content">
            <Calendar/>
          </section>
        </section> 

    </vue-html2pdf> 
    </v-app>
  </div>
</template>

<script>

import VueHtml2pdf from 'vue-html2pdf'
import Calendar from '../components/Calendar';
export default {
  name: 'BookingCal',
  components: {
    Calendar,
    VueHtml2pdf
  },

  methods: {
    generateReport () { 
      this.$refs.html2Pdf.generatePdf() 
    } 
  }
}

</script>
