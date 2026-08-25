<template>
  <q-btn
    flat
    :icon="props.icon"
    :label="props.label"
    color="cyan-9"
    :class="sidebarTab === props.tab ? 'bg-grey-3' : ''"
  >
    <LanternIcon v-if="props.img === 'lantern'" color="cyan-9" />
  </q-btn>
</template>

<script setup>
import LanternIcon from "./LanternIcon.vue"
import appController from "src/putian/stores/appController"

const { sidebarTab } = appController
const props = defineProps({
  icon: {},
  img: {},
  src: {},
  label: {},
  color: { default: "black" },
  tab: {},
})
</script>

<style lang="scss" scoped></style>
