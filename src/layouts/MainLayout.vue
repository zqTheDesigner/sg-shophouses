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
      :width="300"
      :mini="miniState"
      no-mini-animation
      show-if-above
      bordered
      :breakpoint="640"
    >
      <div class="flex row" :class="{ 'justify-center': miniState }">
        <!-- <q-list padding>

          <q-item>
            <q-icon name="info" @click="activeTab = 'info'" size="md" />
          </q-item>

          <q-item>
            <q-icon name="face" @click="activeTab = 'user'" size="md" />
          </q-item> -->

        <!-- <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" class="hidden" /> -->
        <!-- </q-list> -->

        <!-- <q-scroll-area class="fit"> -->
        <div v-show="navContent">
          <InfoTab />
        </div>
        <!-- </q-scroll-area> -->
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
  // if (miniState.value) {
  //   navContent.value = !miniState.value
  // } else {
  //   setTimeout(() => {
  //     navContent.value = !miniState.value
  //   }, 100)
  // }
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
