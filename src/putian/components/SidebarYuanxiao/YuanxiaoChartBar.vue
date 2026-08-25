<template>
  <div class="flex column">
    <div
      :style="`height:${(barHeight / maxBarHeight) * 200}px; width:5px`"
      class="yuanxiaoChartBar"
      :class="
        props.date === selectedYuanxiaoProcession?.date ? 'selectedYuanxiaoChartBar' : ''
      "
    >
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
        {{ props.date }}
      </q-tooltip>
    </div>
    <div style="height: 20px">
      <div v-if="props.date.split('-')[1] === '01'" class="absolute">
        | {{ content.month[props.date.split("-")[0]][lang] }}
      </div>
    </div>
  </div>
</template>

<script setup>
import appController from "src/putian/stores/appController"
import sidebarDataController from "src/putian/stores/sidebarDataController"
const { selectedYuanxiaoProcession } = sidebarDataController
const { lang } = appController
const props = defineProps({ date: {}, barHeight: {}, maxBarHeight: {} })

const content = {
  month: {
    "01": { ch: "农历一月", en: "First Lunar Month" },
    "02": { ch: "农历二月", en: "Second Lunar Month" },
  },
}
</script>

<style lang="scss" scoped>
.yuanxiaoChartBar {
  margin-right: 1px;
  background-color: black;
}
.yuanxiaoChartBar:hover,
.selectedYuanxiaoChartBar {
  background-color: red;
}
</style>
