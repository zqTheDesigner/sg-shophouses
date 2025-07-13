import { ref, computed } from 'vue'

import type { Ref } from 'vue'

import type { Feature as OlFeature } from 'ol'

interface CompanyDataI {
  X: number
  Y: number
  NUMBER: string
  NAME: string
  'CH-NAME': string
  "STREET (SI": string
  'ST-Number': string
  'SCOPE OF B': string
  Phone: string
  'Cable addr': string
  Registered: string
  Capital: string
  Proprietor: string
  'CH-Proprie': string
  Telegraphi: string
  'Other Note': string
  'Page in Di': string
  'Proprietors': string
  'CH-Proprietors': string
}

const companyDataCategory = [
  'Y',
  'NUMBER',
  'NAME',
  'CH-NAME',
  'STREET (SI',
  'ST-Number',
  'SCOPE OF B',
  'Phone',
  'Cable addr',
  'Registered',
  'Capital',
  'Proprietor',
  'CH-Proprie',
  'Telegraphi',
  'Other Note',
  'Page in Di',
  'Proprietors',
  'CH-Proprietors'
]

const CompanyDataRaw: Ref<CompanyDataI[]> = ref([])

const filterCategory: Ref<keyof CompanyDataI | undefined> = ref('NAME')
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

const setFilterCategory = (cat: keyof CompanyDataI) => (filterCategory.value = cat)
const setFilterKey = (k: string) => (filterKey.value = k)

const fetchCompanyJSON = async (url: string): Promise<CompanyDataI[]> => {
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

const csvUrl = 'data/SG Shophouse DB.json'

fetchCompanyJSON(csvUrl)
  .then((data) => {
    // console.log('Fetched data:', data)
    // You can work with the data here
    CompanyDataRaw.value = data
    // console.log(data)
  })
  .catch((error) => {
    console.error('Failed to fetch data:', error)
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
}

export type { CompanyDataI }

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
