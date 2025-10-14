<template>
  <div v-if="listData.length == 0">
    <p>Please select feature on map to view detials.</p>
  </div>
  <!-- For locations with only 1 data point -->
  <div v-if="listData.length == 1">
    <h5>{{ listData[0] ? listData[0].NAME || listData[0]['Address'] : '' }}</h5>
    <ul class="props">
      <li v-for="(value, key) in listData[0]" :key="key">
        <div>
          <span class="label"
            ><b>{{ key }}:</b>
          </span>
          <span class="value"> x </span>
        </div>
      </li>
    </ul>
  </div>

  <!-- For locations with multiple data point -->
  <div v-if="listData.length > 1" style="width: 100%" class="column justify-center">
    <p>
      Details of <b>{{ selectedFeatures.length }}</b> Location{{
        selectedFeatures.length > 1 ? 's' : ''
      }}
    </p>
    <p>
      <b>Street: </b>
      {{
        listData[0] ? listData[0]['STREET'] || listData[0]['address'] || listData[0]['Address'] : ''
      }}
    </p>
    <p v-show="listData[0] && listData[0]['ST-Number']">
      <b>Street Number: </b> {{ listData[0] ? listData[0]['ST-Number'] : '' }}
    </p>

    <q-btn rounded dense class="q-mb-md" color="teal" @click="() => (tableView = true)"
      >View In Table</q-btn
    >

    <q-list bordered class="rounded-borders full-width column">
      <q-expansion-item
        v-for="(feature, key) in listData"
        :key="key"
        expand-separator
        icon="business"
        :label="feature.NAME || feature.siteNameEn || feature.Name"
        :caption="feature.COMPANY"
      >
        <ul class="props">
          <li v-for="(value, key) in feature" :key="key">
            <div v-if="key !== 'geometry'">
              <span class="label"
                ><b>{{ key }}:</b></span
              >
              <span class="value"
                ><q-markdown v-if="key == 'detail'">{{ value }}</q-markdown>
                <span v-else>{{ value }}</span></span
              >
            </div>
          </li>
        </ul>
      </q-expansion-item>
    </q-list>

    <q-btn
      flat
      color="teal"
      class="q-my-sm"
      @click="() => (listDataCount = listDataCount + 10)"
      v-if="selectedFeatures.length > listData.length"
      >Show More ({{ listData.length }}/ {{ selectedFeatures.length }})</q-btn
    >
  </div>

  <q-dialog v-model="tableView">
    <q-table
      :rows="fullListData"
      :columns="columns"
      row-key="NAME"
      style="max-width: 1400px"
      class="my-sticky-header-table"
      dense
      flat
      bordered
      wrap-cells
      virtual-scroll
      :rows-per-page-options="[10, 20, 50]"
    />
  </q-dialog>
</template>

<script setup lang="ts">
import { selectedFeatures } from '../../controllers/mapDataController'
import { computed, ref, watch } from 'vue'

const listDataCount = ref(10)

const tableView = ref(false)

// Extract keys from the first selected feature to create list items dynamically
const listData = computed(() => {
  return selectedFeatures.value.slice(0, listDataCount.value).map((feature) => {
    const properties = feature.getProperties()
    const data: Record<string, string> = {}
    for (const key in properties) {
      if (key !== 'geometry') {
        // Skip the geometry
        data[key] = properties[key]
      }
    }
    return data
  })
})

const fullListData = computed(() => {
  return selectedFeatures.value.map((feature) => {
    const properties = feature.getProperties()
    const data: Record<string, string> = {}
    for (const key in properties) {
      if (key !== 'geometry') {
        // Skip the geometry
        data[key] = properties[key]
      }
    }
    return data
  })
})

watch(selectedFeatures, () => {
  listDataCount.value = 10
})

const columns = computed(() => {
  const firstRow = listData.value[0]
  if (!firstRow) return []

  return Object.keys(firstRow)
    .filter((key) => key !== 'X' && key !== 'Y')
    .map((key) => ({
      name: key,
      label: key,
      field: key,
      sortable: true,
    }))
})
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #eeeeee

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
