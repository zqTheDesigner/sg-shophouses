<template>
  <div>
    <SidebarSelectUI
      :label="content.selectVillage[lang]"
      :options="preProcessOptions(villageSearch)"
      @select="(s) => (selectedVillage = s)"
    />

    <SidebarSelectUI
      :label="content.selectAlliance[lang]"
      :options="preProcessOptions(allianceSearch)"
      @select="(s) => (selectedAlliance = s)"
    />

    <SidebarSelectUI
      :label="content.selectGod[lang]"
      :options="preProcessOptions(godSearch)"
      @select="(s) => (selectedGod = s)"
    />

    <p>
      <!-- {{ selectedGod }} -->
    </p>
  </div>
</template>

<script setup>
import { ref, watchEffect, onUnmounted } from "vue"
import SidebarSelectUI from "../UI/SidebarSelectUI.vue"

import allianceSearch from "/public/putian/data/Alliance_search.json"
import godSearch from "/public/putian/data/primary_god_search.json"

import appController from "src/putian/stores/appController"
import mapDataController from "src/putian/stores/mapDataController"
import { map } from "src/putian/stores/app"

const { lang } = appController

const { villageSearch } = mapDataController

const content = {
  selectVillage: { ch: "选择村落", en: "Select Village(s)" },
  selectAlliance: { ch: "选择联盟", en: "Select Alliance(s)" },
  selectGod: { ch: "选择寺庙主神", en: "Select God(s)" },
}

const selectedVillage = ref()
const selectedAlliance = ref()
const selectedGod = ref()

watchEffect(() => {
  Object.values(map.value.markers).map((m) => m.show())
  selectedVillage?.value?.map((s) => {
    const id = s.value
    map.value.markers?.[id]?.highlight()
  })
  selectedGod?.value?.map((s) => {
    const ids = s.value
    // console.log(ids);
    ids.forEach((_id) => {
      const id = _id?.replace("P", "")
      // console.log(id);
      // console.log(map.value.markers[id])
      map.value.markers?.[id]?.highlight()
    })
  })
})

watchEffect(() => {
  Object.values(map.value.shapes).map((m) => m.show())
  selectedAlliance?.value?.map((s) => {
    const id = s.value
    map.value.shapes?.[id]?.highlight()
  })
})

const preProcessOptions = (options) =>
  options.map((option) => {
    return {
      label: option.title,
      value: option.id,
    }
  })

onUnmounted(() => {
  Object.values(map.value.shapes).map((m) => m.show())
  Object.values(map.value.markers).map((m) => m.show())
})
</script>

<style lang="scss" scoped></style>
