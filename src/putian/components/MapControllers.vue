<template>
  <div class="bg-white q-ma-md q-pa-sm q-pr-md" style="width: 250px" visible>
    <MapControllerOptions
      :label="content.baseMaps[lang]"
      :options="baseMapOptions"
      @select="(v) => setMapTileSource(v)"
    />

    <MapControllerDropdown
      :label="content.shorelines[lang]"
      :options="shorelines_options"
      @select="(s, option) => toggleMapShapeLayer(s, option)"
    />
    <MapControllerDropdown
      :label="content.waterIrrigation[lang]"
      :options="waterIrrigationOptions"
      @select="(s, option) => toggleMapShapeLayer(s, option)"
    />
    <MapControllerDropdown
      :label="content.villages[lang]"
      :options="villageOptions"
      @select="(s, option) => toggleMapMarkerLayer(s, option)"
    />

    <MapControllerDropdown
      :label="content.alliances[lang]"
      :options="allianceOptions"
      @select="(s, option) => toggleMapShapeLayer(s, option)"
    />
  </div>
</template>

<script setup>
/* eslint-disable */
import { useAppStore, map, mapTileSource } from "src/putian/stores/app"

import MapControllerDropdown from "./MapControllerDropdown.vue"
import MapControllerOptions from "./MapControllerOptions.vue"

import appController from "src/putian/stores/appController"

const { lang, isLoading } = appController

const content = {
  baseMaps: { en: "Base Maps", ch: "选择地图" },
  canals: { en: "Canals", ch: "运河" },
  shorelines: { en: "Shorelines", ch: "海岸线" },
  waterIrrigation: { en: "Water and Irrigation", ch: "水系与灌溉系统" },
  villages: { en: "villages", ch: "村落" },
  alliances: { en: "Alliances", ch: "联盟" },
}

const baseMapOptions = [
  {
    name: "streetMap",
    label: { en: "Street Map", ch: "街道地图" },
    value: {
      default: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      amap:
        "http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7",
    },
  },
  {
    name: "satellite",
    label: { en: "Satellite", ch: "卫星地图" },
    value: {
      default:
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      amap:
        "http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=6",
    },
  },
]

/**
 * Options : {
 *    style: controls map style, optioal
 *    showPopup: default false, show popup window with pointer detail
 *    default_checked: load map layer on load
 * }
 */

const shorelines_options = [
  {
    name: "ancientShoreline",
    label: { en: "Ancient", ch: "古代" },
    dataFile: "Ancient_Shoreline_Inverted.json",
    style: { fill: { color: "rgba(0,150,200, 0.3)" } },
  },
  {
    name: "tangShoreline",
    label: { en: "Tang Dynasty (~750 A.D.)", ch: "唐代 (~公元750年)" },
    dataFile: "Tang_Shoreline_Inverted.json",
    style: { fill: { color: "rgba(0,150,200, 0.3)" } },
  },
  {
    name: "songShoreline",
    label: { en: "Song Dynasty (~1100 A.D.)", ch: "宋代 (~公元1100年)" },
    dataFile: "Song_Shoreline_Inverted.json",
    style: { fill: { color: "rgba(0,150,200, 0.4)" } },
  },
  {
    name: "yuanShoreline",
    label: { en: "Yuan Dynasty (~1300 A.D.)", ch: "元代 (~公元1300年)" },
    dataFile: "Yuan_Shoreline_Inverted.json",
    style: { fill: { color: "rgba(0,150,200, 0.5)" } },
  },
  {
    name: "mingQingShoreline",
    label: { en: "Ming-Qing Dynasty (~1644 A.D.)", ch: "明清 (~公元1644年)" },
    dataFile: "MingQing_Shoreline_Inverted.json",
    style: { fill: { color: "rgba(0,150,200, 0.6)" } },
  },
]

const waterIrrigationOptions = [
  {
    name: "canals",
    label: { en: "Canals", ch: "运河" },
    dataFile: "Irrigation_Poly.json",
    style: {
      fill: { color: "rgba(0,0,0,0)" },
      stroke: { color: "rgb(84, 154, 194)" },
    },
  },
  {
    name: "waterBodies",
    label: { en: "Major Water Bodies", ch: "主要水系" },
    dataFile: "Irrigation_Poly.json",
    style: { fill: { color: "rgb(84, 154, 194)" } },
  },
]

const villageOptions = [
  {
    name: "villageStudied",
    label: { en: "Village Studied", ch: "已调查村落" },
    dataFile: "Village_Points_Studied_zh-fix.json",
    default_checked: true,
    showPopup: true,
    showInfo: true,
  },
  {
    name: "villageNotStudied",
    label: { en: "Village Not Studied", ch: "暂未调查村落" },
    dataFile: "Non-studiedPoints.json",
    showPopup: true,
    style: { fill: { color: "rgba(255, 200, 0)" } },
  },
]

const allianceOptions = [
  {
    name: "allianceStudied",
    label: { en: "Alliance Studied", ch: "已调查联盟" },
    dataFile: "Alliance_Polygons_Studied_zh-fix.json",
    default_checked: true,
    showPopup: true,
    showInfo: true,
  },
]

const setMapTileSource = (source) => {
  map.value.setMapTileSource(source[mapTileSource.value.value])
}

const toggleMapShapeLayer = async (show, option) => {
  const name = option.name
  const dataFile = option.dataFile
  const style = option.style

  if (!map.value.shapeLayers?.[name]) {
    // Simple GET API call for data located in public folder
    isLoading.value = true
    const res = await fetch(`/putian/data/${dataFile}`).finally(() => {
      isLoading.value = false
    })
    const data = await res.json()

    map.value.addShapes(data.features, name, option)
    style ? map.value.setShapeStyle(name, style) : null
    console.log(`${dataFile} loaded`)
  }

  show ? map.value.showShapes(name) : map.value.hideShapes(name)
}

const toggleMapMarkerLayer = async (show, option) => {
  const name = option.name
  const dataFile = option.dataFile
  const style = option.style

  if (!map.value.markerLayers?.[name]) {
    isLoading.value = true
    const res = await fetch(`/putian/data/${dataFile}`).finally(() => {
      isLoading.value = false
    })
    const data = await res.json()

    map.value.addMarkers(data.features, name, option)
    console.log(`${dataFile} loaded`)
  }
  show ? map.value.showMarkers(name) : map.value.hideMarkers(name)
}
</script>

<style lang="scss" scoped></style>
