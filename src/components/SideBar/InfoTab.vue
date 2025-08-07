<template>
  <div v-if="listData.length == 0">
    <p>Please select feature on map to view detials.</p>
  </div>
  <!-- For locations with only 1 data point -->
  <div v-if="listData.length == 1">
    <h5>{{ listData[0] ? listData[0].NAME : '' }}</h5>
    <ul class="props">
      <li v-for="(value, key) in listData[0]" :key="key">
        <div>
          <span class="label"
            ><b>{{ key }}:</b>
          </span>
          <span class="value">{{ value }}</span>
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
        listData[0] ? (listData[0]['STREET'] ? listData[0]['STREET'] : listData[0]['address']) : ''
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
        icon="perm_identity"
        :label="feature.NAME || feature.siteNameEn"
        :caption="feature.COMPANY"
      >
        <ul class="props">
          <li v-for="(value, key) in feature" :key="key">
            <div v-if="key !== 'geometry'">
              <span class="label"
                ><b>{{ key }}:</b></span
              >
              <span class="value">{{ value }}</span>
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
