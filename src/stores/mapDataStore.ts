import { type Reactive, reactive } from 'vue'
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

const mapDataLayers: Reactive<MapDataLayerI>[] = reactive([
  // {
  //   show: true,
  //   title: 'Singapore Old Shops',
  //   dataUrls: ['data/batch_1.json', 'data/batch_2.json'],
  //   type: 'point',
  //   loaded: false,
  //   feature: null,
  // },
  {
    show: true,
    title: 'Singapore Streets',
    dataUrls: ['data/streets.json'],
    type: 'line',
    loaded: false,
    feature: null,
    markerColor: '',
    checkBoxColor: 'green',
    titleField: false,
    locationField: false,
  },
  {
    show: true,
    title: 'Chinese Temples',
    dataUrls: ['data/02-SGPtemples.json'],
    type: 'point',
    loaded: false,
    feature: null,
    markerColor: '#E43636',
    checkBoxColor: 'red',
    titleField: 'siteNameEn',
    locationField: 'address',
  },
  {
    show: true,
    title: 'Chinese Associations',
    dataUrls: ['data/01-SGPchineseAssociations.json'],
    type: 'point',
    loaded: false,
    feature: null,
    markerColor: '#239BA7',
    checkBoxColor: 'teal-5',
    titleField: 'siteNameEn',
    locationField: 'address',
  },
  {
    show: true,
    title: 'Keramat Shrines',
    dataUrls: ['data/03-keramatShrines.json'],
    type: 'point',
    loaded: false,
    feature: null,
    markerColor: '#E1AA36',
    checkBoxColor: 'yellow-9',
    titleField: 'siteNameEn',
    locationField: 'siteNameAlt1',
  },
])

export { mapDataLayers }

export type { MapDataI, MapDataLayerI }
