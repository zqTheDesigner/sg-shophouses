import { ref, computed, watch } from 'vue'
import { mapDataLayers, puTianMapDataLayers } from './contentController'

import { Feature } from 'ol'
import { Point } from 'ol/geom'
import MultiPolygon from 'ol/geom/MultiPolygon'

const companyDataCategory = [
  'NUMBER',
  'Name',
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

const CompanyDataRaw = ref([])
const StreetDataRaw = ref([])

const filterCategory = ref('Name')
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
    if (typeof value == 'object') {
      return false
    }

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

const setFilterCategory = (cat) => (filterCategory.value = cat)
const setFilterKey = (k) => (filterKey.value = k)

const fetchCompanyJSON = async (url) => {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// New generic function to fetch map data by URL
const fetchMapData = async (url) => {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

const fetchStreetJSON = async (url) => {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response.json()
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

const selectedFeaturesRef = ref([])
const selectedFeatures = computed(() => selectedFeaturesRef.value)
const setSelectedFeatures = (features) => {
  console.log('setSelectedFeatures')
  selectedFeaturesRef.value = features
  console.log('End setSelectedFeatures')
}
const clearSelectedFeatures = () => {
  selectedFeaturesRef.value = []
}

// const csvUrl = 'data/SG Shophouse DB.json'

// Enable below 2 lines for Nanyang Sources data
// const csvUrls = ['data/batch_1.json', 'data/batch_2.json','data/batch_3.json']
// const streetDataUrls = ['data/streets.json']

// Temporary fix - to display SHGIS data
const csvUrls = ['']
const streetDataUrls = ['']

// Helper function to convert each point to an OpenLayers Feature
// function createFeature(data) {
//   console.log('Creating feature for data:', data)
//   const feature = new Feature({
//     geometry: new Point([data.X, data.Y]),
//     ...data,
//   })
//   return feature
// }

// function createPolygonFeature(data) {
//   console.log('Creating polygon feature for data:', data)
//   return new Feature({
//     geometry: new MultiPolygon(data.GEOMETRY.coordinates),
//     ...data,
//   })
// }

function createFeature(data, type) {
  if (type === 'point') {
    // console.log('Creating point feature for data:')
    return new Feature({
      geometry: new Point([data.X, data.Y]),
      ...data,
    })
  }

  if (type === 'polygon') {
    // console.log('Creating polygon feature for data:')
    return new Feature({
      geometry: new MultiPolygon(data.GEOMETRY.coordinates),
      ...data,
    })
  }
}

const selectedDataLayer = ref()

// This has been used only for NanyangSources
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

// This only been used for NanyangSources and 1 street data
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

// Actual main data loading function
mapDataLayers.forEach((mapLayer) => {
  const urls = mapLayer.dataUrls
  // console.log('Loading data for:', mapLayer.dataRef.value)
  urls.forEach((url) => {
    fetchMapData(url)
      .then((data) => {
        if (mapLayer.data) {
          mapLayer.data = mapLayer.data.concat(data)
        } else {
          mapLayer.data = data
        }
      })
      .finally(() => {
        if (mapLayer.data) {
          mapLayer.feature = mapLayer.data.map((data) => createFeature(data, mapLayer.type))
        }
        console.log('loaded,', mapLayer.title)
        // console.log(mapLayer.feature.getGeometry().getType())
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error)
      })
  })
})

const filterFeatures = (newKey) => {
  mapDataLayers.forEach((mapLayer) => {
    if (mapLayer.show) {
      if (!newKey) {
        mapLayer.feature = mapLayer.data.map((data) => createFeature(data, mapLayer.type))
      } else {
        const normalizedFilterKey = newKey.toLowerCase().replace(/\s/g, '')

        mapLayer.feature = mapLayer.data
          .filter((item) => {
            return Object.values(item).some((value) => {
              if (value === null || value === undefined) return false
              if (typeof value === 'object') return false

              return String(value).toLowerCase().replace(/\s/g, '').includes(normalizedFilterKey)
            })
          })
          .map((data) => createFeature(data, mapLayer.type))
      }
    }
  })

  console.log(newKey)
}

// For PuTian data loading
puTianMapDataLayers.forEach((mapLayer) => {
  const urls = mapLayer.dataUrls
  urls.forEach((url) => {
    fetchMapData(url)
      .then((data) => {
        if (mapLayer.data) {
          mapLayer.data = mapLayer.data.concat(data)
        } else {
          mapLayer.data = data
        }
      })
      .finally(() => {
        if (mapLayer.data) {
          mapLayer.feature = mapLayer.data.map((data) => createFeature(data, mapLayer.type))
        }
        console.log('loaded,', mapLayer.title, mapLayer.data)
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error)
      })
  })
})

const puTianFilteredFeatures = (newKey) => {
  puTianMapDataLayers.forEach((mapLayer) => {
    if (mapLayer.show) {
      if (!newKey) {
        mapLayer.feature = mapLayer.data.map((data) => createFeature(data, mapLayer.type))
      } else {
        const normalizedFilterKey = newKey.toLowerCase().replace(/\s/g, '')

        mapLayer.feature = mapLayer.data
          .filter((item) => {
            return Object.values(item).some((value) => {
              if (value === null || value === undefined) return false
              if (typeof value === 'object') return false

              return String(value).toLowerCase().replace(/\s/g, '').includes(normalizedFilterKey)
            })
          })
          .map((data) => createFeature(data, mapLayer.type))
      }
    }
  })

  console.log(newKey)
}

// This is the global search and filter function
watch(filterKey, (newKey) => {
  console.log(newKey)
})

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
  filterFeatures,

  // For PuTian data
  puTianFilteredFeatures,
}

// export type { MapDataI as CompanyDataI, StreetDataI }

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
