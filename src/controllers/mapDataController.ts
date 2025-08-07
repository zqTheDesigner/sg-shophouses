import { ref, computed } from 'vue'

import type { Ref } from 'vue'

import type { Feature as OlFeature } from 'ol'
import { mapDataLayers, type MapDataI, type MapDataLayerI } from 'src/stores/mapDataStore'
import type { Geometry } from 'ol/geom'
import { Feature } from 'ol'
import { Point } from 'ol/geom'

interface StreetDataI {
  street: string
  level: number // or number if you prefer
  coordinates: [number, number][] // Array of [lng, lat] pairs
}

const companyDataCategory = [
  'NUMBER',
  'NAME',
  'CH-NAME',
  'ST-Number',
  'SCOPE OF BUSINESS',
  'Phone',
  'Cable Address',
  'Registered Date',
  'Capital',
  'Proprietors',
  'CH-Proprietors',
  'Telegraphic Address',
  'Page in Directory',
  'STREET',
]

const CompanyDataRaw: Ref<MapDataI[]> = ref([])
const StreetDataRaw: Ref<StreetDataI[]> = ref([])

const filterCategory: Ref<keyof MapDataI | undefined> = ref('NAME')
const filterKey = ref()

const CompanyData = computed(() => {
  if (!filterCategory.value || !filterKey.value || filterCategory.value === undefined) {
    return CompanyDataRaw.value
  }

  const normalizedFilterKey = filterKey.value.toLowerCase().replace(/\s/g, '')
  return CompanyDataRaw.value.filter((item) => {
    // To prevent typescript error
    if (filterCategory.value === undefined) return CompanyDataRaw.value

    // Get the value from the specified category
    const value = item[filterCategory.value]

    // Handle cases where value might be null or undefined
    if (value === null || value === undefined) {
      return false
    }

    // Convert to string, lowercase, and remove spaces for comparison
    const normalizedValue = String(value).toLowerCase().replace(/\s/g, '')

    // Check if the normalized value includes the normalized filter key
    return normalizedValue.includes(normalizedFilterKey)
  })
})

const StreetData = computed(() => StreetDataRaw.value)

const setFilterCategory = (cat: keyof MapDataI) => (filterCategory.value = cat)
const setFilterKey = (k: string) => (filterKey.value = k)

const fetchCompanyJSON = async (url: string): Promise<MapDataI[]> => {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

const fetchStreetJSON = async (url: string): Promise<StreetDataI[]> => {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

const selectedFeaturesRef: Ref<OlFeature[]> = ref([])
const selectedFeatures = computed(() => selectedFeaturesRef.value)
const setSelectedFeatures = (features: OlFeature[]) => {
  console.log('setSelectedFeatures')
  selectedFeaturesRef.value = features
  console.log('End setSelectedFeatures')
}
const clearSelectedFeatures = () => {
  selectedFeaturesRef.value = []
}

// const csvUrl = 'data/SG Shophouse DB.json'
const csvUrls = ['data/batch_1.json', 'data/batch_2.json']
const streetDataUrls = ['data/streets.json']

// Helper function to convert each point to an OpenLayers Feature
function createFeature(data: MapDataI): OlFeature<Geometry> {
  const feature = new Feature({
    geometry: new Point([data.X, data.Y]),
    ...data,
  })
  return feature
}

const selectedDataLayer: Ref<MapDataLayerI | undefined> = ref()

csvUrls.forEach((url) => {
  fetchCompanyJSON(url)
    .then((data) => {
      // console.log('Fetched data:', data)
      // You can work with the data here
      CompanyDataRaw.value = CompanyDataRaw.value.concat(data)
      // console.log(data)
    })
    .catch((error) => {
      console.error('Failed to fetch data:', error)
    })
})

streetDataUrls.forEach((url) => {
  fetchStreetJSON(url)
    .then((data) => {
      // console.log('Fetched data:', data)
      // You can work with the data here
      StreetDataRaw.value = StreetDataRaw.value.concat(data)
      // console.log(data)
    })
    .catch((error) => {
      console.error('Failed to fetch data:', error)
    })
})

mapDataLayers.forEach((mapData) => {
  const urls = mapData.dataUrls
  urls.forEach((url) => {
    fetchCompanyJSON(url)
      .then((data) => {
        if (mapData.data) {
          mapData.data = mapData.data.concat(data)
        } else {
          mapData.data = data
        }
      })
      .finally(() => {
        if (mapData.data) {
          mapData.feature = mapData.data.map(createFeature)
        }
        console.log('loaded,', mapData.title)
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error)
      })
  })
})

// fetchCompanyJSON(csvUrl)
//   .then((data) => {
//     // console.log('Fetched data:', data)
//     // You can work with the data here
//     CompanyDataRaw.value = data
//     // console.log(data)
//   })
//   .catch((error) => {
//     console.error('Failed to fetch data:', error)
//   })

export {
  CompanyData,
  selectedFeatures,
  setSelectedFeatures,
  clearSelectedFeatures,
  companyDataCategory,
  filterCategory,
  filterKey,
  setFilterCategory,
  setFilterKey,
  StreetData,
  selectedDataLayer,
}

export type { MapDataI as CompanyDataI, StreetDataI }

// ============================================================== //
// ============ Some Old Code Snippet, DO NOT DELETE ============ //

// const fetchCompanyData = async (url: string): Promise<CompanyDataI[]> => {
//   console.log('fetchCompanyData Start')
//   try {
//     const response = await fetch(url)
//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

//     const csvText = await response.text()
//     const lines = csvText.split('\n')

//     // Skip empty or insufficient data
//     if (!lines[0]) return []
//     if (lines.length < 2 || !lines[0].trim()) return []

//     const headers = lines[0].split(',').map((h) => h.trim()) as Array<keyof CompanyDataI>
//     const data: CompanyDataI[] = new Array(lines.length - 1)

//     let index = 0
//     for (let i = 1; i < lines.length; i++) {
//       const line = lines[i]
//       if (!line || !line.trim()) continue

//       const values = line.split(',')
//       const row: Partial<CompanyDataI> = {}

//       for (let j = 0; j < headers.length; j++) {
//         const header = headers[j] as keyof CompanyDataI
//         const rawValue = values[j]?.trim() ?? ''
//         row[header] = rawValue
//         if (header === 'X' || header === 'Y') row[header] = Number(rawValue)
//       }

//       data[index++] = row as CompanyDataI
//     }

//     console.log('fetchCompanyData Finished')
//     return data.slice(0, index) // remove unused slots
//   } catch (error) {
//     console.error('Error:', error)
//     throw error
//   }
// }
// const csvUrl =
//   'https://docs.google.com/spreadsheets/d/e/2PACX-1vR9S4_ZaOXJkPcDg3dsyiuoKyNYM3BxpaqbYFvDnLkELrSnUyuv_hRNFXkB2SPiz1jzYvKaNvZ4WNMI/pub?gid=0&single=true&output=csv'
