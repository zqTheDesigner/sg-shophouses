<template>
  <q-page class="flex">
    <SearchBar class="absolute justify-center" style="z-index: 99; top: 0; width: 100%" />
    <MainMap :points="{ 'Company Data': CompanyData }" :lines="{ Streets: StreetData }" />
  </q-page>
</template>

<script setup lang="ts">
import { CompanyData, StreetData } from '../controllers/mapDataController'
import MainMap from 'src/components/MainMap.vue'
import SearchBar from '../components/SearchBar.vue'
</script>
