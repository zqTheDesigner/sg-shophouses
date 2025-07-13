<template>
  <div class="row justify-center q-py-md q-px-xl" style="width: 100%">
    <div class="row no-wrap shadow-10" style="max-width: 440px; width: 100%">
      <q-select
        filled
        :modelValue="filterCategory"
        class="bg-white"
        :options="companyDataCategory"
        label="Search By"
        style="max-width: 160px; width: 100%"
        @update:model-value="setFilterCategory"
        dense
      />
      <q-input
        dense
        :modelValue="filterKey"
        filled
        bg-color="white"
        style="max-width: 320px; width: 100%"
        label="Search"
        clearable
        @update:model-value="(v) => setFilterKey(v ? v.toString() : '')"
      />
    </div>
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
