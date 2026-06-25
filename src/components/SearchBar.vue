<template>
  <div class="row justify-center q-py-md q-px-xl" style="width: 100%">
    <div class="row no-wrap shadow-10" style="max-width: 320px; width: 100%">
      <!-- <q-select
        filled
        :modelValue="filterCategory"
        class="bg-white"
        :options="companyDataCategory"
        label="Search By"
        style="max-width: 160px; width: 100%"
        @update:model-value="setFilterCategory"
        dense
      /> -->
      <q-input
        dense
        v-model="searchText"
        filled
        bg-color="white"
        style="max-width: 320px; width: 100%"
        label="Search"
        clearable
      >
        <template v-slot:append>
          <q-btn
            dense
            icon="search"
            color="teal-7"
            @click="setFilterKey(searchText); filterFeatures(searchText)"
          />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  // companyDataCategory,
  // filterCategory,
  filterKey,
  // setFilterCategory,
  setFilterKey,
  filterFeatures
} from '../controllers/mapDataController'

const searchText = ref(filterKey.value)
</script>

<style scoped></style>
