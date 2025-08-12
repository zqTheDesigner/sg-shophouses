<template>
  <ol-map
    class="flex"
    style="min-width: 100vw; min-height: calc(100vh - 72px)"
    @click="handleMapClick"
    ref="mapRef"
  >
    <ol-view :center="[103.85, 1.346]" :zoom="12" projection="EPSG:4326" />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <!-- Displaying Lines -->
    <!-- <ol-vector-layer v-for="(lines, key) in lineGroups" :key="key">
      <ol-source-vector>
        <ol-feature v-for="(line, k) in lines" :key="k">
          <ol-geom-line-string :coordinates="line.coordinates"></ol-geom-line-string>
          <ol-style>
            <ol-style-stroke color="green" :width="line.level"></ol-style-stroke>
            <ol-style-text :text="line.street" font="12px sans-serif" />
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer> -->

    <!-- Display Points -->
    <!-- <ol-vector-layer v-for="(features, key) in featureGroups" :key="key">
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
    </ol-vector-layer> -->

    <div v-for="mapDataLayer in mapDataLayers" :key="mapDataLayer.title">
      <ol-vector-layer :visible="mapDataLayer.show">
        <ol-source-cluster :distance="30">
          <ol-source-vector :features="mapDataLayer.feature" />
        </ol-source-cluster>

        <ol-style
          :overrideStyleFunction="
            (feature: any, style: any, resolution: any) =>
              overrideStyleFunction(feature, style, resolution, mapDataLayer.markerColor)
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
    </div>
  </ol-map>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { Feature } from 'ol'
// import { Point } from 'ol/geom'
import {
  clearSelectedFeatures,
  setSelectedFeatures,
  selectedFeatures,
} from '../controllers/mapDataController'
import type { Feature as OlFeature } from 'ol'
import type { Geometry } from 'ol/geom'
// import type { CompanyDataI } from '../controllers/mapDataController'
import type MapBrowserEvent from 'ol/MapBrowserEvent'
// import Stroke from 'ol/style/Stroke'
import { mapDataLayers } from 'src/stores/mapDataStore'

// const props = defineProps(['points', 'lines'])

const mapRef = ref()
// const selectedClusterId = ref<string | null>(null)
const styleVersion = ref(0) // Add a version counter to force style updates

// const getClusterColor = (features: OlFeature[] | null) => {
//   // console.log('getClusterColor')
//   if (features === null) {
//     return '006064'
//   }
//   if (
//     features[0] &&
//     selectedFeatures.value[0] &&
//     features[0].get('X') === selectedFeatures.value[0].get('X')
//   ) {
//     return 'orange'
//   } else {
//     return '#006064'
//   }
// }

// Helper function to convert each point to an OpenLayers Feature
// function createFeature(point: CompanyDataI): OlFeature<Geometry> {
//   const feature = new Feature({
//     geometry: new Point([point.X, point.Y]),
//     ...point,
//   })
//   return feature
// }

// Add this near the createFeature function
// function createLineFeature(lineData: any): OlFeature<Geometry> {
//   const feature = new Feature({
//     geometry: new LineString(lineData.coordinates),
//     ...lineData,
//   })
//   return feature
// }

// Preprocess points into grouped features
// const featureGroups = computed<Record<string, OlFeature<Geometry>[]>>(() => {
//   const result: Record<string, OlFeature<Geometry>[]> = {}

//   for (const key in props.points) {
//     const pointsArray = props.points[key]
//     result[key] = pointsArray.map(createFeature)
//   }

//   return result
// })

// const lineGroups = computed<Record<string, StreetDataI[]>>(() => {
//   const result: Record<string, []> = {}

//   for (const key in props.lines) {
//     const linesArray = props.lines[key]
//     result[key] = linesArray
//   }

//   return result
// })

// @ts-expect-error some error
const overrideStyleFunction = (feature, style, resolution, defaultColor) => {
  // console.log('overrideStyleFunction')
  // console.log({ feature, style, resolution })

  if (!resolution) {
    // console.log(resolution)
  }
  const clusteredFeatures: OlFeature[] = feature.get('features')
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
        clusteredFeature.get('X') === selectedFeature.get('X') &&
        clusteredFeature.get('Y') === selectedFeature.get('Y'),
    ),
  )
  // Reset all cluster style color
  style.getImage().getFill().setColor(defaultColor)
  style.getImage().setRadius(10)

  // If contains feature
  if (size > 1) {
    style.getText().setText(size.toString())
    style.getText().getFill().setColor('#fff')
  } else if (size === 1 && clusteredFeatures[0] !== undefined) {
    style
      .getText()
      .setText(
        clusteredFeatures[0].getProperties()['NAME'] ||
          clusteredFeatures[0].getProperties()['siteNameEn'] ||
          clusteredFeatures[0].getProperties()['siteNameAlt1'],
      )
    style.getText().getFill().setColor('#000')
  } else {
    // This is unlikely to happe, just prevent some ts warning
    // return
  }

  if (isSelected) {
    // console.log(clusteredFeatures, selectedFeatures)

    style.getImage().getFill().setColor('orange')
    style.getImage().setRadius(15)
  }

  return style
}

// Handle map clicks
function handleMapClick(event: MapBrowserEvent<PointerEvent>) {
  console.log('handleMapClick')
  const map = event.map
  // createPopupOverlay(map) // ensure overlay is added

  const pixel = event.pixel

  clearSelectedFeatures()

  map.forEachFeatureAtPixel(pixel, (feature) => {
    console.log('forEachFeatureAtPixel')
    const clusterFeatures = feature.get('features') as OlFeature<Geometry>[] | undefined
    // const geometry = feature.getGeometry() as Point
    // const coord = geometry.getCoordinates()
    if (clusterFeatures && clusterFeatures.length >= 1) {
      // console.log(clusterFeatures)
      setSelectedFeatures(clusterFeatures)
    }
  })

  console.log('end ForEachFeature')

  styleVersion.value++
  // olStyleRef.value.overrideStyleFunction()
  console.log('end handle map click', styleVersion.value)
  return true
}
</script>

<style scoped></style>
