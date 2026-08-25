<template>
  <div>
    <div class="row items-center justify-between q-mb-md">
      <p class="q-ma-none">{{ content.selectLang[lang] }}</p>
      <q-select
        class="q-mx-sm"
        dense
        outlined
        :options="langOptions"
        :model-value="langObj.label"
        @update:model-value="(l) => setLang(l)"
      />
    </div>

    <div class="row items-cente justify-between">
      <p class="q-ma-none">{{ content.selectMapSource[lang] }}</p>
      <q-select
        class="q-mx-sm"
        dense
        outlined
        :options="mapTileSourceOptions"
        :model-value="mapTileSource"
        @update:model-value="(l) => setMapTileSource(l)"
      />
    </div>
  </div>
</template>

<script setup>
import {
  mapTileSource,
  mapTileSourceOptions,
  setMapTileSource,
} from "src/putian/stores/app"

import appController from "src/putian/stores/appController"

const content = {
  selectLang: { en: "Language", ch: "语言" },
  selectMapSource: { en: "Select Map Source", ch: "选择地图层" },
}

const { setLang, langOptions, lang, langObj } = appController
</script>

<style lang="scss" scoped></style>
