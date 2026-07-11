<template>
  <ol-map
    class="flex"
    style="min-width: 100vw; min-height: calc(100vh - 72px)"
    @click="handleMapClick"
    ref="mapRef"
  >
    <ol-view
      :center="props.content.mapCenter"
      :zoom="props.content.mapZoomLevel"
      projection="EPSG:4326"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <!-- Enable below 2 layers for Nanyang sources map -->

    <!-- Display Image Layer -->
    <!-- <ol-image-layer :visible="mapDataLayers[2] && mapDataLayers[2].show">
      <ol-source-image-static
        url="images/1950-map-combined.jpg"
        :imageSize="[13425, 7213]"
        :imageExtent="[103.7963526, 1.2502186, 103.9325787, 1.3263565]"
        projection="EPSG:4326"
      >
      </ol-source-image-static>
    </ol-image-layer> -->

    <!-- Display Image Layer -->
    <!-- <ol-image-layer :visible="mapDataLayers[3] && mapDataLayers[3].show">
      <ol-source-image-static
        url="images/map-downtown.jpg"
        :imageSize="[8156, 9638]"
        :imageExtent="[103.809855, 1.2590, 103.859158, 1.317654]"
        projection="EPSG:4326"
      >
      </ol-source-image-static>
    </ol-image-layer> -->

    <!-- Displaying Lines -->
    <!-- The way of displaying points and lines are hard coded, going to make it much smarter when add more layers -->
    <ol-vector-layer
      v-for="(lines, key) in lineGroups"
      :key="key"
      :visible="props.mapDataLayers[1] && props.mapDataLayers[1].show"
    >
      <ol-source-vector>
        <ol-feature v-for="(line, k) in lines" :key="k">
          <ol-geom-line-string :coordinates="line.coordinates"></ol-geom-line-string>
          <ol-style>
            <ol-style-stroke color="green" :width="line.level"></ol-style-stroke>
            <ol-style-text :text="line.street" font="12px sans-serif" />
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>

    <!-- Display Points -->
    <ol-vector-layer
      v-for="(features, key) in featureGroups"
      :key="key"
      :visible="props.mapDataLayers[0] && props.mapDataLayers[0].show"
    >
      <ol-source-cluster :distance="30">
        <ol-source-vector :features="features" />
      </ol-source-cluster>

      <ol-style :overrideStyleFunction="overrideStyleFunction" :key="styleVersion">
        <ol-style-stroke color="red" :width="2" />
        <ol-style-fill color="rgba(255,255,255,0.1)" />
        <ol-style-circle :radius="10">
          <ol-style-fill :color="getClusterColor(features)" />
          <ol-style-stroke color="#fff" :width="1" />
        </ol-style-circle>
        <ol-style-text text="test" />
      </ol-style>
    </ol-vector-layer>

    <!-- Display of mapDataLayers -->

    <div v-for="mapDataLayer in props.mapDataLayers" :key="mapDataLayer.title">
      <!-- Start from here is for SHGIS to display map points -->
      <ol-vector-layer v-if="mapDataLayer.type === 'point'" :visible="mapDataLayer.show">
        <ol-source-cluster :distance="30">
          <ol-source-vector :features="mapDataLayer.feature" />
        </ol-source-cluster>

        <ol-style
          :overrideStyleFunction="
            (feature, style, resolution) =>
              overrideStyleFunction(
                feature,
                style,
                resolution,
                mapDataLayer.markerColor,
                mapDataLayer.titleField
              )
          "
          :key="styleVersion"
        >
          <ol-style-stroke color="red" :width="2" />
          <ol-style-fill color="rgba(255,255,255,0.1)" />
          <ol-style-circle :radius="10">
            <ol-style-fill :color="mapDataLayer.markerColor" />
            <ol-style-stroke color="#fff" :width="1" />
          </ol-style-circle>
          <ol-style-text text="test" />
        </ol-style>
      </ol-vector-layer>
      <!-- End -->

      <!-- Polygons -->
      <ol-vector-layer :visible="mapDataLayer.show">
        <ol-source-vector :features="mapDataLayer.feature" />

        <ol-style>
          <ol-style-fill color="rgba(64, 196, 255, 0.30)" />
          <ol-style-stroke color="#0288d1" :width="2.5" />
        </ol-style>
      </ol-vector-layer>
    </div>
  </ol-map>
</template>

<script setup>
import { ref, computed } from "vue"
import { Feature } from "ol"
import { Stroke } from "ol/style"
import { Point } from "ol/geom"
import {
  clearSelectedFeatures,
  setSelectedFeatures,
  selectedFeatures,
} from "../controllers/mapDataController"

import { onMounted, watch } from "vue"

import WebGLTileLayer from "ol/layer/WebGLTile"
import GeoTIFF from "ol/source/GeoTIFF"
// import type { Feature as OlFeature } from 'ol'
// import type { Geometry } from 'ol/geom'

// import type { CompanyDataI, StreetDataI } from '../controllers/mapDataController'
// import type MapBrowserEvent from 'ol/MapBrowserEvent'
// import Stroke from 'ol/style/Stroke'
// import { content, mapDataLayers } from 'src/controllers/contentController'
// Type of data received based on props
const props = defineProps(["points", "lines", "content", "mapDataLayers"])

const mapRef = ref()

const historicalMapLayer = new WebGLTileLayer({
  opacity: 0.75,
  visible: true,

  source: new GeoTIFF({
    sources: [
      {
        url: "data/shgis/sg_1913.tiff",
      },
    ],
  }),
})

// const selectedClusterId = ref<string | null>(null)
const styleVersion = ref(0) // Add a version counter to force style updates

// What does this do???
const getClusterColor = (features) => {
  // console.log('getClusterColor')
  if (features === null) {
    return "006064"
  }
  if (
    features[0] &&
    selectedFeatures.value[0] &&
    features[0].get("X") === selectedFeatures.value[0].get("X")
  ) {
    return "orange"
  } else {
    return "#006064"
  }
}

// Helper function to convert each point to an OpenLayers Feature
function createFeature(point) {
  const feature = new Feature({
    geometry: new Point([point.X, point.Y]),
    ...point,
  })
  return feature
}

function wrapText(str, maxChars = 15) {
  const words = str.split(" ")
  const lines = []
  let line = ""

  for (const word of words) {
    if ((line + " " + word).trim().length <= maxChars) {
      line += (line ? " " : "") + word
    } else {
      lines.push(line)
      line = word
    }
  }

  if (line) lines.push(line)

  return lines.join("\n")
}

// Add this near the createFeature function
// function createLineFeature(lineData: any): OlFeature<Geometry> {
//   const feature = new Feature({
//     geometry: new LineString(lineData.coordinates),
//     ...lineData,
//   })
//   return feature
// }

// Preprocess points into grouped features
const featureGroups = computed(() => {
  const result = {}

  for (const key in props.points) {
    const pointsArray = props.points[key]
    result[key] = pointsArray.map(createFeature)
  }

  return result
})

const lineGroups = computed(() => {
  const result = {}

  for (const key in props.lines) {
    const linesArray = props.lines[key]
    result[key] = linesArray
  }

  return result
})

// //@ts-expect-error some error
const overrideStyleFunction = (
  feature,
  style,
  resolution,
  defaultColor = "#147179",
  titleField = "NAME"
) => {
  // console.log('overrideStyleFunction')
  // console.log({ feature, style, resolution })

  if (!resolution) {
    // console.log(resolution)
  }
  const clusteredFeatures = feature.get("features")
  const size = clusteredFeatures.length

  // If the first element in a cluster is selected, the whole cluster is selected
  // const isSelected =
  //   clusteredFeatures[0] &&
  //   selectedFeatures.value[0] &&
  //   clusteredFeatures[0].get('X') === selectedFeatures.value[0].get('X') &&
  //   clusteredFeatures[0].get('Y') === selectedFeatures.value[0].get('Y')

  // Check if ANY feature in the cluster is selected (instead of just the first one)
  const isSelected = clusteredFeatures.some((clusteredFeature) =>
    selectedFeatures.value.some(
      (selectedFeature) =>
        clusteredFeature.get("X") === selectedFeature.get("X") &&
        clusteredFeature.get("Y") === selectedFeature.get("Y")
    )
  )
  // Reset all cluster style color
  style.getImage().getFill().setColor(defaultColor)
  style.getImage().setRadius(10)

  // If contains feature
  if (size > 1) {
    style.getText().setText(size.toString())
    style.getText().getFill().setColor("#fff")

    new Stroke()
    style.getText().setFont("bold 13px Arial")
  } else if (size === 1 && clusteredFeatures[0] !== undefined) {
    style.getText().setText(
      // wrapText(
      clusteredFeatures[0].getProperties()[titleField] ||
        clusteredFeatures[0].getProperties()["siteNameEn"] ||
        clusteredFeatures[0].getProperties()["siteNameAlt1"]
      // )
    )
    wrapText("")
    style.getText().getFill().setColor("#000")
    style.getText().setFont("bold 13px Arial")
    // style.getText().setStroke(
    //   new Stroke({
    //     width: 1,
    //   })
    // )
  } else {
    // This is unlikely to happe, just prevent some ts warning
    // return
  }

  if (isSelected) {
    // console.log(clusteredFeatures, selectedFeatures)

    style.getImage().getFill().setColor("orange")
    style.getImage().setRadius(15)
  }

  return style
}

// Handle map clicks
function handleMapClick(event) {
  console.log("handleMapClick")
  const map = event.map
  // createPopupOverlay(map) // ensure overlay is added

  const pixel = event.pixel

  clearSelectedFeatures()

  map.forEachFeatureAtPixel(pixel, (feature) => {
    console.log("forEachFeatureAtPixel")
    const clusterFeatures = feature.get("features")
    if (clusterFeatures && clusterFeatures.length >= 1) {
      console.log(clusterFeatures)
      setSelectedFeatures(clusterFeatures)
    }
  })

  console.log("end ForEachFeature")

  styleVersion.value++
  // olStyleRef.value.overrideStyleFunction()
  console.log("end handle map click", styleVersion.value)
  return true
}

onMounted(() => {
  const map = mapRef.value?.map

  if (!map) {
    console.error("Cannot access OpenLayers map.")
    return
  }

  map.getLayers().insertAt(1, historicalMapLayer)
})

watch(props.mapDataLayers, () => {
  // set historicalMapLayer's visibility based on the last mapDataLayer's show property
  if (props.mapDataLayers.length > 0) {
    historicalMapLayer.setVisible(
      props.mapDataLayers[props.mapDataLayers.length - 1].show
    )
  }
})
</script>

<style scoped></style>
