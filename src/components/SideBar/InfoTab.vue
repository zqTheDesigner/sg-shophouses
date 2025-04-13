<template>
  <div v-if="selectedFeatures.length" class="q-pa-md" style="max-width: 800px; margin-top: 20px">
    <q-list bordered class="rounded-borders">
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
      @click="() => (listDataCount = listDataCount + 10)"
      v-if="selectedFeatures.length > listData.length"
      >Show More</q-btn
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
