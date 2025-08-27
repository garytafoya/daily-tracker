<template>
  <v-card>
    
    <!-- {{spent}} -->


    <v-container>
      <v-row>
        <p class="text-overline ml-2">Days Left</p>
      </v-row>
      <v-row justify="space-between">
        <p class="text-h4 font-weight-light ml-2">{{percent}}</p>
      </v-row>
    </v-container>
  
  </v-card>
</template>

<script setup>

import { ref } from 'vue'

const props = defineProps({
  percent: String
})

</script>