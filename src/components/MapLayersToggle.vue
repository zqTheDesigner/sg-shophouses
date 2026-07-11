<template>
  <!-- <div class="bg-white q-pa-md" style="border-radius: 10px"> -->
  <div style="background-color: rgba(255, 255, 255, 0.7)" class="q-pa-xs">
    <q-btn-dropdown
      dense
      size="18px"
      style="max-width: 100%"
      color="cyan-10"
      dropdown-icon="layers"
      no-icon-animation
      v-model="mapLayersToggled"
      :menu-offset="[0, 10]"
    >
      <div class="q-mt-md">
        <div class="flex column">
          <q-checkbox
            v-for="dataLayer in props.mapDataLayers"
            v-model="dataLayer.show"
            :label="dataLayer.title"
            :color="dataLayer.checkBoxColor"
            :key="dataLayer.title"
            keep-color
          />
        </div>
      </div>
    </q-btn-dropdown>
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
// import { mapDataLayers } from 'src/controllers/contentController'

const props = defineProps(['mapDataLayers'])

const mapLayersToggled = ref(true)

watch(
  () => props.mapDataLayers,
  () => {
    console.log('start')
  },
  { deep: true },
)
</script>

<style scoped></style>
