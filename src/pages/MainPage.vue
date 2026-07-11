<template>
  <q-page class="flex">
    <div class="flex-row">
      <SearchBar class="absolute justify-center" style="z-index: 99; top: 0; width: 100%" />
      <MapLayersToggle
        class="absolute justify-right"
        style="z-index: 99; top: 20px; right: 20px"
        :map-data-layers="mapDataLayers"
      />
    </div>
    <!-- <MainMap :points="{ 'Company Data': CompanyData }" :lines="{ Streets: StreetData }" /> -->
    <MainMap :content="content" :map-data-layers="mapDataLayers" />
  </q-page>
</template>

<script setup>
import { content, mapDataLayers } from '../controllers/contentController'
import MainMap from 'src/components/MainMap.vue'
import SearchBar from '../components/SearchBar.vue'
import MapLayersToggle from 'src/components/MapLayersToggle.vue'
</script>
