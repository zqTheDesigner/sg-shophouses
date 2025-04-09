<script setup lang="ts">
import MainMap from 'src/components/MainMap.vue'
import { CompanyData } from '../controllers/mapDataController'
</script>

<template>
  <q-page class="flex">
  
    <MainMap :points="{ 'Company Data': CompanyData }" />
  </q-page>
</template>
