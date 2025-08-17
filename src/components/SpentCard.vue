<template>
  <v-card>
    <v-container>
      <v-row justify="space-between">
        <p class="text-overline ml-2 mb-2">Spent</p>
        <p class="text-overline mr-2 mb-2">Limit</p>
      </v-row>
      <v-row justify="space-between">
        <p class="text-h5 font-weight-light ml-2">${{ spent }}</p>
        <p class="text-h5 font-weight-light mr-2">${{ goal }}</p>
      </v-row>
    </v-container>

    <v-row>
      <v-progress-linear class="mb-5 mt-3" color="primary" rounded-bar="true" :model-value="percentToGoal" height="20"></v-progress-linear>
    </v-row>
  </v-card>
</template>

<script setup>

import { ref } from 'vue'

const props = defineProps({
  spent: String,
  goal: String
})

const percentToGoal = computed (() => {
  return (((props.spent / props.goal) * 100).toFixed(0))
})

</script>