<template>
  <q-page class="flex">
    <div class="flex-row">
      <SearchBar class="absolute justify-center" style="z-index: 99; top: 0; width: 100%" />
      <!-- <MapLayersToggle
        class="absolute justify-right"
        style="z-index: 99; top: 20px; right: 20px; width: 100%; max-width: 300px"
      /> -->
    </div>
    <MainMap :points="{ 'Company Data': CompanyData }" :lines="{ Streets: StreetData }" />
  </q-page>
</template>

<script setup lang="ts">
import { CompanyData, StreetData } from '../controllers/mapDataController'
import MainMap from 'src/components/MainMap.vue'
import SearchBar from '../components/SearchBar.vue'
// import MapLayersToggle from 'src/components/MapLayersToggle.vue'
</script>
