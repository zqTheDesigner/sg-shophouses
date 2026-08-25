<template>
  <div>
    <h5 class="q-my-sm">
      {{ selectedPointVillageData?.["name"] }}
      {{ selectedPointVillageData?.["name_zh"] }}
    </h5>
    <h5 class="q-my-sm">
      {{ selectedPointVillageData?.["Name"] }}
      {{ selectedPointVillageData?.["Name_zh"] }}
    </h5>

    <div v-if="lang === 'ch'">
      <p v-html="selectedPointDataCH" />

      <hr />
    </div>

    <div>
      <p v-html="selectedPointVillageData?.['raw_text']" />

      <div v-if="selectedPointVillageData?.['Village_Settlement']">
        <b>Village Settlement</b>
        <p>{{ selectedPointVillageData?.["Village_Settlement"] }}</p>
      </div>

      <div v-if="selectedPointVillageData?.['Surname_Groups']">
        <b>Surname Groups</b>
        <p>{{ selectedPointVillageData?.["Surname_Groups"] }}</p>
      </div>

      <div v-if="selectedPointVillageData?.['Village_Temples']">
        <b>Village Temples</b>
        <p>{{ selectedPointVillageData?.["Village_Temples"] }}</p>
      </div>

      <div v-if="selectedPointVillageData?.['Rituals_Yuanxiao_Processions']">
        <b>Yuanxiao Processions</b>
        <p>{{ selectedPointVillageData?.["Rituals_Yuanxiao_Processions"] }}</p>
      </div>

      <div v-if="selectedPointVillageData?.['Rituals_Birthday_Celebration_of_gods']">
        <b>Birthday Celebration of gods</b>
        <p>
          {{ selectedPointVillageData?.["Rituals_Birthday_Celebration_of_gods"] }}
        </p>
      </div>

      <div v-if="selectedPointVillageData?.['Rituals_Ritual_Groups']">
        <b>Ritual Groups (if present):</b>
        <p>{{ selectedPointVillageData?.["Rituals_Ritual_Groups"] }}</p>
      </div>
    </div>

    <!-- <p>{{ selectedPointVillageData }}</p> -->
  </div>
</template>

<script setup>
import { watchEffect, ref, onMounted, computed, onUnmounted, watch } from "vue"

import mapDataController from "src/putian/stores/mapDataController"
import appController from "src/putian/stores/appController"
import { map } from "src/putian/stores/app"

const { selectedPoint, selectedPointVillageData } = mapDataController
const { lang, isLoading } = appController

const selectedPointDataCH = ref("")
watchEffect(async () => {
  const id = selectedPoint.value?.properties?.UID_V || selectedPoint.value?.TOWNSHIP
  map.value.markers[id]?.highlight()
  map.value.shapes[id]?.highlight()
  if (lang.value === "ch") {
    isLoading.value = true
    const chData = await fetch(`/putian/data/inscriptions/${id}.txt`, {
      method: "GET",
      mode: "cors",
    })
      .catch((err) => console.log(err))
      .finally(() => {
        isLoading.value = false
      })

    const chDataTxt = await chData.text()

    selectedPointDataCH.value = chDataTxt
  } else {
    selectedPointDataCH.value = ""
  }
})

const selectedId = computed(
  () => selectedPoint.value?.properties?.UID_V ?? selectedPoint.value?.TOWNSHIP
)

watch(selectedId, (newVal, oldVal) => {
  console.log("watch selected id change")
  map.value.markers?.[oldVal]?.show()
  map.value.shapes?.[oldVal]?.show()
})

onMounted(() => {
  map.value.markers?.[selectedId.value]?.highlight()
  map.value.shapes?.[selectedId.value]?.highlight()
})

onUnmounted(() => {
  map.value.markers[selectedId.value]?.show()
  map.value.shapes[selectedId.value]?.show()
})
</script>

<style lang="scss" scoped></style>
