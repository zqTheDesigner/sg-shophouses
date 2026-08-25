import { computed, ref } from "vue";
import villageRawText from "/public/putian/data/Village_raw_text.json";
import alliacneRawText from "/public/putian/data/Alliance_raw_text.json";
import villageSearch from "/public/putian/data/village_search.json";

const selectedPoint = ref({});
const selectMapPoint = (d) => (selectedPoint.value = d);
// const selectedPointVillageData = computed(()=>selectedPoint.value["properties"]["UID_V"])

const selectedPointVillageData = computed(() => {
  if (selectedPoint.value["properties"]?.["UID_V"]) {
    return villageRawText.filter(
      (d) => d["UID"] === selectedPoint.value["properties"]["UID_V"]
    )[0];
  } else if (selectedPoint.value?.["TOWNSHIP"]) {
    return alliacneRawText.filter(
      (d) => d["UID_A"] === selectedPoint.value["TOWNSHIP"]
    )[0];
  } else {
    return "detail not found";
  }
});

const getVillage = (id) => {
  return villageSearch.filter((v) => v.id === id)[0];
};

export default {
  selectedPoint: computed(() => selectedPoint.value),
  selectMapPoint,
  selectedPointVillageData,
  villageSearch,
  getVillage,
};
