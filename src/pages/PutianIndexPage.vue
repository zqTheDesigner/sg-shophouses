<template>
  <q-page class="overflow-hidden">
    <div
      class="absolute"
      v-if="isLoading"
      style="width: 100vw; bottom: 0; top: 0; z-index: 999"
    >
      <q-inner-loading showing>
        <q-spinner color="dark-grey" size="4em" :thickness="5" />
      </q-inner-loading>
    </div>
    <div class="absolute" style="width: 100vw; bottom: 0; top: 0">
      <div class="flex row full-height">
        <MapSidebar />
        <Map />
      </div>

      <div class="absolute-right" style="z-index: 1">
        <MapControllers />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import Map from "src/putian/components/MainMap.vue"
import MapSidebar from "src/putian/components/MapSidebar.vue"
import MapControllers from "src/putian/components/MapControllers.vue"

import appController from "src/putian/stores/appController"

const { isLoading } = appController

defineOptions({
  name: "IndexPage",
})
</script>
