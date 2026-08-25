<template>
  <div>
    <div id="map" ref="map_root"></div>
    <div id="popup" class="ol-popup">
      <a href="#" v-show="false" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content">test</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { MainMap } from "../map.js"
import { map } from "src/putian/stores/app.js"
const map_root = ref()

onMounted(() => {
  map.value = new MainMap(map_root.value)
})
</script>

<style lang="scss">
#map {
  position: absolute;
  height: 100%;
  width: 100%;
}

.ol-popup {
  position: absolute;
  background-color: white;
  pointer-events: none;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 180px;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: "✖";
}
.ol-rotate {
  display: none;
}
.ol-control {
  margin: 4px;
}
</style>
