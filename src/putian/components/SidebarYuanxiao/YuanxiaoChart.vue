<template>
  <div>
    <q-scroll-area style="height: 230px; max-width: 300px">
      <div class="flex row no-wrap items-end content-end">
        <YuanxiaoChartBar
          v-for="(d, idx) in props.data"
          :key="idx"
          :bar-height="d.ID.length"
          :max-bar-height="maxBarHeight"
          :date="d.date"
          @click="selectYuanxiaoProcession(d)"
        />
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup>
import { computed } from "vue"
import YuanxiaoChartBar from "./YuanxiaoChartBar.vue"
import sidebarDataController from "src/putian/stores/sidebarDataController"
const { selectYuanxiaoProcession } = sidebarDataController
const props = defineProps({ data: {} })

const maxBarHeight = computed(() => {
  return Math.max(...props.data.map((d) => d.ID.length))
})
</script>

<style lang="scss" scoped></style>
