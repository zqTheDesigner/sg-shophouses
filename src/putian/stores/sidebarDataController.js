import { ref, computed, watch } from "vue";
import appController from "./appController";
const { isLoading } = appController;

const fetchData = async (file_name) => {
  // console.warn(
  //   "sidebarDataController is depreciated, use dataController instead"
  // );
  const domain = "./putian/data/";
  console.log("load", file_name);
  try {
    isLoading.value = true;
    // console.log(domain, file_name)
    const data = await fetch(domain + file_name);
    const dataJSON = await data.json();
    isLoading.value = false;
    return dataJSON;
  } catch (err) {
    console.log(err);
    isLoading.value = false;
    return null;
  }
};

const surnameSearch = ref(null);

const fetchSurnameSearch = async () => {
  console.log('fetchsurnamesearch')
  if (surnameSearch.value === null) {
    isLoading.value = true;
    const data = await fetch("/putian/data/surname_search.json").finally(() => {
      isLoading.value = false;
    });
    const dataJson = await data.json();

    surnameSearch.value = dataJson;
  }
};

/**
 * Yuanxiao Processions data
 */
const yuanxiaoProcessions = ref(null);
const selectedYuanxiaoProcession = ref(null);

const fetchYuanxiaoProcessions = async () => {
  const file = "processions.json";
  yuanxiaoProcessions.value = await fetchData(file);
};

const selectYuanxiaoProcession = (d) => {
  selectedYuanxiaoProcession.value = d;
};

/**
 * Yuanxiao Processions Details (Info)
 */
const yuanxiaoProcessionInfoRef = ref(null);

export const fetchYuanxiaoProcessionInfo = async () => {
  const file = "procession_info.json";
  yuanxiaoProcessionInfoRef.value = await fetchData(file);
  // console.log(yuanxiaoProcessionInfoRef.value);
};

export const yuanxiaoProcessionInfo = computed(() => {
  if (!yuanxiaoProcessionInfoRef.value) {
    fetchYuanxiaoProcessionInfo();
  }
  return yuanxiaoProcessionInfoRef.value;
});
export const selectedYuanxiaoProcessionInfo = ref(null);

watch(
  selectedYuanxiaoProcession,
  () => {
    selectedYuanxiaoProcessionInfo.value = yuanxiaoProcessionInfo.value?.filter(
      (p) => selectedYuanxiaoProcession.value?.ID?.includes(p?.uid_r)
    );
  },
  { immediate: true }
);

export default {
  surnameSearch: computed(() => surnameSearch.value),
  fetchSurnameSearch,

  yuanxiaoProcessions: computed(() => {
    if (!yuanxiaoProcessions.value) {
      fetchYuanxiaoProcessions();
    }
    return yuanxiaoProcessions.value;
  }),

  selectYuanxiaoProcession,

  selectedYuanxiaoProcession: computed(() => selectedYuanxiaoProcession.value),
};
