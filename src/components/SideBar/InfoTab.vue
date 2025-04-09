<template>
  <div v-if="selectedFeatures.length" class="q-pa-md" style="max-width: 800px; margin-top: 20px">
    <h3>Selected Features ({{ selectedFeatures.length }})</h3>
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
  </div>
</template>

<script setup lang="ts">
import { selectedFeatures } from '../../controllers/mapDataController'
import { computed } from 'vue'

// Extract keys from the first selected feature to create list items dynamically
const listData = computed(() => {
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
</script>
