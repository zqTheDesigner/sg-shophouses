<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-cyan-10 flex justify-between">
        <div></div>
        <h5 class="q-ma-md">Singapore Historical GIS</h5>

        <q-btn flat dense round style="visibility: hidden" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import { selectedFeatures } from 'src/controllers/mapDataController'

const miniState = ref(true)

const navContent = ref(false)

watch(miniState, () => {
  navContent.value = !miniState.value
})

watch(selectedFeatures, () => {
  if (selectedFeatures.value.length >= 1) {
    miniState.value = false
  } else {
    miniState.value = true
  }
})
</script>
