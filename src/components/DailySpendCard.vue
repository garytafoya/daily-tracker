<template>
  <v-card>
    
    <!-- {{spent}} -->


    <v-container>
      <v-row>
        <p class="text-overline ml-2 mb-2">Daily Limit</p>
      </v-row>
      <v-row justify="space-between">
        <p class="text-h5 font-weight-light ml-2">${{ amount }}</p>
      </v-row>
    </v-container>
  
  </v-card>
</template>

<script setup>

import { ref } from 'vue'

const props = defineProps({
  amount: String
})

</script>