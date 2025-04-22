<template>
  <ol-map
    class="flex"
    style="min-width: 100vw; min-height: calc(100vh - 72px)"
    @click="handleMapClick"
    ref="mapRef"
  >
    <ol-view :center="[103.85, 1.286]" :zoom="15" projection="EPSG:4326" />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-vector-layer v-for="(features, key) in featureGroups" :key="key">
      <ol-source-cluster :distance="30">
        <ol-source-vector :features="features" />
      </ol-source-cluster>

      <ol-style :overrideStyleFunction="overrideStyleFunction"  :key="styleVersion" >
        <ol-style-stroke color="red" :width="2" />
        <ol-style-fill color="rgba(255,255,255,0.1)" />
        <ol-style-circle :radius="10">
          <ol-style-fill :color="getClusterColor(features)"/>
          <ol-style-stroke color="#fff" :width="1" />
        </ol-style-circle>
        <ol-style-text text="test" />
      </ol-style>
    </ol-vector-layer>
  </ol-map>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Feature } from 'ol'
import Point from 'ol/geom/Point'
import {
  clearSelectedFeatures,
  setSelectedFeatures,
  selectedFeatures,
} from '../controllers/mapDataController'
import type { Feature as OlFeature } from 'ol'
import type { Geometry } from 'ol/geom'
import type { CompanyDataI } from '../controllers/mapDataController'
import type MapBrowserEvent from 'ol/MapBrowserEvent'

const props = defineProps(['points'])

const mapRef = ref()
// const selectedClusterId = ref<string | null>(null)
const styleVersion = ref(0) // Add a version counter to force style updates

const getClusterColor = (features: OlFeature[]) => {
  console.log('getClusterColor')
  if (
    features[0] &&
    selectedFeatures.value[0] &&
    features[0].get('X') === selectedFeatures.value[0].get('X')
  ) {
    return 'orange'
  } else {
    return '#006064'
  }
}

// Helper function to convert each point to an OpenLayers Feature
function createFeature(point: CompanyDataI): OlFeature<Geometry> {
  const feature = new Feature({
    geometry: new Point([point.X, point.Y]),
    ...point,
  })
  return feature
}

// Preprocess points into grouped features
const featureGroups = computed<Record<string, OlFeature<Geometry>[]>>(() => {
  const result: Record<string, OlFeature<Geometry>[]> = {}

  for (const key in props.points) {
    const pointsArray = props.points[key]
    result[key] = pointsArray.map(createFeature)
  }

  return result
})

// @ts-expect-error some error
const overrideStyleFunction = (feature, style, resolution) => {
  console.log('overrideStyleFunction')
  // console.log({ feature, style, resolution })

  if (!resolution) {
    // console.log(resolution)
  }
  const clusteredFeatures: OlFeature[] = feature.get('features')
  const size = clusteredFeatures.length

  // If the first element in a cluster is selected, the whole cluster is selected
  const isSelected =
    clusteredFeatures[0] &&
    selectedFeatures.value[0] &&
    clusteredFeatures[0].get('X') === selectedFeatures.value[0].get('X') &&
    clusteredFeatures[0].get('Y') === selectedFeatures.value[0].get('Y')


  // Reset all cluster style color
  style.getImage().getFill().setColor('#006064')

  // If contains feature
  if (size > 1) {
    style.getText().setText(size.toString())
    style.getText().getFill().setColor('#fff')
  } else if (size === 1 && clusteredFeatures[0] !== undefined) {
    style.getText().setText(clusteredFeatures[0].getProperties()['NAME'])
    style.getText().getFill().setColor('#000')
  } else {
    // This is unlikely to happe, just prevent some ts warning
    // return
  }

  if (isSelected) {
    style.getImage().getFill().setColor('orange')
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
