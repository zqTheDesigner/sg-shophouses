<template>
  <ol-map class="flex" style="min-width: 100vw; min-height: 100vh" @click="handleMapClick">
    <ol-view :center="[103.85, 1.286]" :zoom="15" projection="EPSG:4326" />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-vector-layer v-for="(features, key) in featureGroups" :key="key">
      <ol-source-cluster :distance="40">
        <ol-source-vector :features="features" />
      </ol-source-cluster>

      <ol-style :overrideStyleFunction="overrideStyleFunction">
        <ol-style-stroke color="red" :width="2" />
        <ol-style-fill color="rgba(255,255,255,0.1)" />
        <ol-style-circle :radius="10">
          <ol-style-fill color="#3399CC" />
          <ol-style-stroke color="#fff" :width="1" />
        </ol-style-circle>
        <ol-style-text text="test" />
      </ol-style>
    </ol-vector-layer>
  </ol-map>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Feature } from 'ol'
import Point from 'ol/geom/Point'
import { clearSelectedFeatures, setSelectedFeatures } from '../controllers/mapDataController'
import type { Feature as OlFeature } from 'ol'
import type { Geometry } from 'ol/geom'
import type { CompanyDataI } from '../controllers/mapDataController'
import type MapBrowserEvent from 'ol/MapBrowserEvent'

const props = defineProps(['points'])

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
  // console.log({ feature, style, resolution })
  if (!resolution) {
    console.log(resolution)
  }
  const clusteredFeatures = feature.get('features')
  const size = clusteredFeatures.length
  if (size > 1) {
    style.getText().setText(size.toString())
  } else {
    style.getText().setText(clusteredFeatures[0].getProperties('NAME')['NAME'])
  }
  return style
}

// Handle map clicks
function handleMapClick(event: MapBrowserEvent<PointerEvent>) {
  const map = event.map
  // createPopupOverlay(map) // ensure overlay is added

  const pixel = event.pixel

  clearSelectedFeatures()

  map.forEachFeatureAtPixel(pixel, (feature) => {
    const clusterFeatures = feature.get('features') as OlFeature<Geometry>[] | undefined
    // const geometry = feature.getGeometry() as Point
    // const coord = geometry.getCoordinates()
    if (clusterFeatures && clusterFeatures.length >= 1) {
      console.log(clusterFeatures)
      setSelectedFeatures(clusterFeatures)
    }
  })

  // map.forEachFeatureAtPixel(pixel, (feature: OlFeature<Geometry>) => {
  //   const clusterFeatures = feature.get('features') as OlFeature<Geometry>[] | undefined

  //   const geometry = feature.getGeometry() as Point
  //   const coord = geometry.getCoordinates()

  //   if (clusterFeatures && clusterFeatures.length > 1) {
  //     // Cluster clicked
  //     const names = clusterFeatures.map((f) => f.get('name')).join('<br>')
  //     popupContent.value = `<strong>Cluster (${clusterFeatures.length})</strong><br>${names}`
  //     popupOverlay?.setPosition(coord)
  //   } else if (clusterFeatures?.length === 1) {
  //     // Single feature
  //     const props = clusterFeatures[0].getProperties()
  //     popupContent.value = `<strong>${props.name}</strong>`
  //     popupOverlay?.setPosition(coord)
  //   }

  return true // stop after first feature
  // })
}
</script>

<style scoped></style>
