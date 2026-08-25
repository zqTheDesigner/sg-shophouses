<template>
  <div
    class="bg-grey-4 q-pa-sm q-mb-sm"
    style="border-radius: 4px; border: 1px solid grey"
  >
    <div class="row">
      <b>{{ content.startdate[lang] }}: </b>{{ props.info?.startdate }}
    </div>
    <div class="row">
      <b>{{ content.enddate[lang] }}: </b>{{ props.info?.enddate }}
    </div>
    <div>
      <b>{{ content.villageName[lang] }}: </b>{{ props.info.VillageName }}
    </div>
    <p>{{ props.info.text }}</p>
  </div>
</template>

<script setup>
import appController from "src/putian/stores/appController"
const { lang } = appController
const props = defineProps({ info: {} })
const content = {
  startdate: { ch: "开始日期", en: "Start Date" },
  enddate: { ch: "结束日期", en: "End Date" },
  villageName: { ch: "村落", en: "Village Name" },
}
</script>

<style lang="scss" scoped></style>
