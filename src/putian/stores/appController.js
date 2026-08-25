import { ref, computed } from "vue";

const sidebarTab = ref("");
const setSidebarTab = (t) => {
  sidebarTab.value = t;
};
// If Sidebar tab is "" means no active side bar tab, so it will not expand
const sidebarExpanded = computed(() => sidebarTab.value !== "");

const setLang = (l) => (langObj.value = l);

const isLoading = ref(false);

const langObj = ref({ label: "中文", value: "ch" });

const langOptions = [
  { label: "中文", value: "ch" },
  { label: "English", value: "en" },
];

export default {
  sidebarTab: computed(() => sidebarTab.value),
  setSidebarTab,
  sidebarExpanded,

  lang: computed(() => langObj.value.value),
  langObj: computed(() => langObj.value),
  setLang,
  langOptions,

  isLoading,
};
