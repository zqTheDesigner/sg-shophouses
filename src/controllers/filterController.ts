import { computed, ref } from 'vue'

export interface FilterConfig {
  [layerId: string]: string[]
}

const filterConfig = ref<FilterConfig>({
  default: ['NAME', 'CH-NAME', 'STREET'],
})

const activeLayer = ref('default')

export const setActiveFilterLayer = (layerId: string) => {
  activeLayer.value = layerId
}

export const registerFilterCategories = (layerId: string, categories: string[]) => {
  filterConfig.value[layerId] = categories
}

export const availableFilterCategories = computed(() => {
  return filterConfig.value[activeLayer.value] ?? filterConfig.value.default ?? []
})

export { activeLayer }
