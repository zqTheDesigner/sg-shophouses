<template>
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
      Details of <b>{{ selectedFeatures.length }}</b> Shophouses
    </p>
    <p><b>Street: </b> {{ listData[0] ? listData[0]['STREET (SI'] : '' }}</p>
    <p><b>Street Number: </b> {{ listData[0] ? listData[0]['ST-Number'] : '' }}</p>

    <q-list bordered class="rounded-borders full-width column">
      <q-expansion-item
        v-for="(feature, key) in listData"
        :key="key"
        expand-separator
        icon="perm_identity"
        :label="feature.NAME"
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
</template>

<script setup lang="ts">
import { selectedFeatures } from '../../controllers/mapDataController'
import { computed, ref, watch } from 'vue'

const listDataCount = ref(10)

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

watch(selectedFeatures, () => {
  listDataCount.value = 10
})
</script>
