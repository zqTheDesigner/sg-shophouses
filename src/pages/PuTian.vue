<template>
  <q-page class="flex">
    <div class="flex-row">
      <SearchBar class="absolute justify-center" style="z-index: 99; top: 0; width: 100%"  />
      <MapLayersToggle
        class="absolute justify-right"
        style="z-index: 99; top: 20px; right: 20px;"
        :map-data-layers="puTianMapDataLayers"
      />
    </div>
    <MainMap :content="puTianContent" :map-data-layers="puTianMapDataLayers" />
  </q-page>
</template>

<script setup >
// import { CompanyData, StreetData } from '../controllers/mapDataController'
import { puTianContent, puTianMapDataLayers } from 'src/controllers/contentController'
import MainMap from 'src/components/MainMap.vue'
import SearchBar from '../components/SearchBar.vue'
import MapLayersToggle from 'src/components/MapLayersToggle.vue'
</script>
