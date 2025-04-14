<template>
  <div class="flex row no-wrap q-pa-lg" style="width: 100%">
    <q-select
      filled
      :modelValue="filterCategory"
      class="bg-white"
      :options="companyDataCategory"
      label="Search By"
      style="width: 100%"
      @update:model-value="setFilterCategory"
    />
    <q-input
      :modelValue="filterKey"
      filled
      bg-color="white"
      style="width: 100%"
      label="Search"
      clearable
      @update:model-value="(v) => setFilterKey(v ? v.toString() : '')"
    />
  </div>
</template>

<script setup lang="ts">
import {
  companyDataCategory,
  filterCategory,
  filterKey,
  setFilterCategory,
  setFilterKey,
} from '../controllers/mapDataController'
</script>

<style scoped></style>
