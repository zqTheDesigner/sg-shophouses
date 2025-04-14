<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="hidden"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="360"
      no-mini-animation
      show-if-above
      bordered
      :breakpoint="0"
    >
      <div class="flex row" :class="{ 'justify-center': miniState }">
        <div v-show="navContent">
          <InfoTab />
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import InfoTab from 'src/components/SideBar/InfoTab.vue'
import { selectedFeatures } from 'src/controllers/mapDataController'

const leftDrawerOpen = ref(true)

const miniState = ref(true)

// const activeTab = ref('info')

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

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
