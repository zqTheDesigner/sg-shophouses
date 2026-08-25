<template>
  <div>
    <YuanxiaoChart :data="yuanxiaoProcessions" />
    <ProcessionInfoCard
      v-for="(info, idx) in selectedYuanxiaoProcessionInfo"
      :key="idx"
      :info="info"
    />
  </div>
</template>

<script setup>
import sidebarDataController, {
  selectedYuanxiaoProcessionInfo,
} from "src/putian/stores/sidebarDataController"
import YuanxiaoChart from "./YuanxiaoChart.vue"
import ProcessionInfoCard from "./ProcessionInfoCard.vue"
import { onUnmounted, watchEffect } from "vue"
import { map } from "src/putian/stores/app"

const { yuanxiaoProcessions } = sidebarDataController

watchEffect(() => {
  Object.values(map.value.markers).map((m) => m.show())
  selectedYuanxiaoProcessionInfo.value?.map((v) => {
    const id = v?.uid_r.split("-")[0]
    // console.log(id);
    if (id) {
      map.value.markers?.[id]?.highlight()
    }
  })
})

onUnmounted(() => {
  Object.values(map.value.markers).map((m) => m.show())
})
</script>

<style lang="scss" scoped></style>
