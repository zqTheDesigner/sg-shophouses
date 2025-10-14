import type { Feature as OlFeature } from 'ol'

interface MapDataI {
  X: number
  Y: number
  NUMBER?: string
  NAME?: string
  'CH-NAME': string
  'STREET (SINGAPORE)': string
  'ST-Number': string
  'SCOPE OF B': string
  Phone: string
  'Cable Address': string
  'Registered Date': string
  Capital: string
  Proprietor: string
  'Telegraphic Address': string
  'Other Note': string
  'Page in Directory': string
  Proprietors: string
  'CH-Proprietors': string
  links: [{ name: string; link: string }]
}

interface MapDataLayerI {
  show: boolean
  title: string
  dataUrls: string[]
  type: 'point' | 'polygon' | 'line' // string fallback for other possible values
  loaded: boolean //Track if the data already loaded
  data?: MapDataI[]
  feature: OlFeature[] | null
  markerColor: string
  checkBoxColor: string
  titleField: string | boolean
  locationField: string | boolean
}

export type { MapDataI, MapDataLayerI }
