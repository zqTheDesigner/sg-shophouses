<template>
  <div class="bg-white">
    Map Layers
    <div class="flex column">
      <q-checkbox
        v-for="dataLayer in mapDataLayers"
        v-model="dataLayer.show"
        :label="dataLayer.title"
        :color="dataLayer.checkBoxColor"
        :key="dataLayer.title"
        keep-color
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { mapDataLayers } from 'src/controllers/contentController'

watch(
  mapDataLayers,
  () => {
    // console.log(mapDataLayers)
  },
  { deep: true },
)
</script>

<style scoped></style>
