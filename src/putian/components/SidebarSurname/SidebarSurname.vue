<template>
  <div>
    <!-- {{ selectedSurname }} -->
    <SidebarSelectUI
      :label="content.selectSurname[lang]"
      :options="surnameSearchOptions"
      @select="(s) => (selectedSurname = s)"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watchEffect } from "vue"
import sidebarDataController from "src/putian/stores/sidebarDataController"
import appController from "src/putian/stores/appController"
import { map } from "src/putian/stores/app"

import SidebarSelectUI from "../UI/SidebarSelectUI.vue"

const { surnameSearch, fetchSurnameSearch } = sidebarDataController

const { lang } = appController

// const { map } = app;

const content = {
  selectSurname: { ch: "选择姓氏", en: "Select Surname" },
}

onMounted(async () => {
  await fetchSurnameSearch()
  console.log(surnameSearch.value)
  // selectedSurname.value = surnameSearch.value[0];
})

const surnameSearchOptions = computed(() => {
  if (surnameSearch.value) {
    return surnameSearch.value.map((s) => {
      return { label: s.title, value: s.id }
    })
  } else {
    return null
  }
})

const selectedSurname = ref()

watchEffect(() => {
  Object.values(map.value.markers).map((m) => m.show())
  selectedSurname?.value?.map((s) => {
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
onUnmounted(() => {
  Object.values(map.value.markers).map((m) => m.show())
})
</script>

<style lang="scss" scoped></style>
