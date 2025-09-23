<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-cyan-10 flex justify-start">
        <q-btn flat dense round style="visibility: hidden" />
        <div>
          <MainHeader class="full-width" />
        </div>
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
import MainHeader from 'src/components/MainHeader.vue'
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
