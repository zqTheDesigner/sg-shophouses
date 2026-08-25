// Utilities
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import appController from "./appController";

const { lang } = appController;

const map = ref(null);

// For now the map will be selected between defaul (open layers defualt map) and map
// This option only affects the tile URL, there are other maps that doesn't allow
// Tile URL which will be harder to implicate
const mapTileSourceOptions = computed(() => {
  const labelMap = {
    default: { en: "Default", ch: "默认" },
    amap: { en: "A Map", ch: "高德地图" },
  };
  return [
    {
      label: labelMap.default[lang.value],
      value: "default",
    },
    { label: labelMap.amap[lang.value], value: "amap" },
  ];
});

const mapTileSourceRef = ref(mapTileSourceOptions.value[0]);

const setMapTileSource = (s) => (mapTileSourceRef.value = s);

const mapTileSource = computed(() => mapTileSourceRef.value);

const useAppStore = defineStore("app", {
  state: () => ({
    lang: "ch",
    langOptions: [
      { label: "中文", value: "ch" },
      { label: "English", value: "en" },
    ],
  }),
  getters: {
    getMap() {
      return this.map;
    },
  },
  actions: {
    setMap(m) {
      this.map = m;
    },
  },
});

export {
  useAppStore,
  map,
  mapTileSource,
  mapTileSourceOptions,
  setMapTileSource,
};
