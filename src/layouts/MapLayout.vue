<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-cyan-10 flex justify-start">
        <q-btn
          flat
          dense
          round
          :icon="miniState ? 'menu' : 'menu_open'"
          aria-label="Menu"
          @click="toggleMini"
        />

        <MainHeader class="full-width" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="360"
      no-mini-animation
      :mini-width="64"
      show-if-above
      :mini="miniState"
      bordered
      :breakpoint="360"
    >
      <div class="flex row no-wrap" :class="{ 'justify-center': miniState }">
        <q-tabs
          v-model="activeTab"
          vertical
          class="text-teal q-ma-none q-pa-none"
          style="width: 64px"
        >
          <q-tab
            name="info"
            icon="info_outline"
            style="width: 64px"
            @click="() => (miniState = false)"
          />
          <!-- <q-tab name="innerAlarms" icon="alarm" style="width: 64px" /> -->
          <!-- <q-tab name="innerMovies" icon="movie" style="width: 64px" /> -->
        </q-tabs>

        <q-tab-panels
          v-model="activeTab"
          animated
          class="full-width"
          transition-prev="slide-down"
          transition-next="slide-up"
        >
          <q-tab-panel name="info">
            <InfoTab />
          </q-tab-panel>

          <q-tab-panel name="innerAlarms">
            <div class="text-h4 q-mb-md">Alarms</div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque
              magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima
              assumenda consectetur culpa fuga nulla ullam. In, libero.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque
              magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima
              assumenda consectetur culpa fuga nulla ullam. In, libero.
            </p>
          </q-tab-panel>

          <q-tab-panel name="innerMovies">
            <div class="text-h4 q-mb-md">Movies</div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque
              magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima
              assumenda consectetur culpa fuga nulla ullam. In, libero.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque
              magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima
              assumenda consectetur culpa fuga nulla ullam. In, libero.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque
              magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima
              assumenda consectetur culpa fuga nulla ullam. In, libero.
            </p>
          </q-tab-panel>
        </q-tab-panels>
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
import MainHeader from 'src/components/MainHeader.vue'
const leftDrawerOpen = ref(false)

const miniState = ref(true)

// const tab = ref()
const activeTab = ref('info')

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

function toggleMini() {
  miniState.value = !miniState.value
}
</script>
