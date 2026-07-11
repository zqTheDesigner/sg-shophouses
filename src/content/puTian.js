import { reactive } from 'vue'

const content = {
  siteTitle: '',
  mapZoomLevel: 12.5,
  mapCenter: [119.1, 25.43],
  headerLinks: [
    { label: '', link: '' },
    // { label: 'Data', link: '' },
    // { label: 'People', link: '' },
    // { label: 'About', link: '' },
  ],
  about: {
    title: '',
    subtitle: '',
    bgImage: '',
    content: '',
  },
  landingPage: {
    title: '',
    subtitle: '',
    bgImage: '',
    content: '',
  },
  dataPage: {
    title: '',
    subtitle: '',
    bgImage: '',
    content: '',
  },
}

const mapDataLayers = reactive([
  {
    show: true,
    title: 'Ancient Shoreline',
    dataUrls: ['data/putian/Ancient_Shoreline_Inverted.json'],
    type: 'polygon',
    loaded: false,
    feature: null,
    markerColor: '#008ab8',
    checkBoxColor: 'blue-8',
    titleField: 'Chinese Name',
    locationField: 'Township',
  },

  {
    show: true,
    title: 'Irrigation Polygons',
    dataUrls: ['data/putian/irrigation_poly.json'],
    type: 'polygon',
    loaded: false,
    feature: null,
    markerColor: '#008ab8',
    checkBoxColor: 'blue-8',
    titleField: 'Chinese Name',
    locationField: 'Township',
  },
  {
    show: true,
    title: 'Village Studied',
    dataUrls: ['data/putian/Village_Points_Studied.json'],
    type: 'point',
    loaded: false,
    feature: null,
    markerColor: '#76b6cb',
    checkBoxColor: 'blue-8',
    titleField: 'CH-NAME',
    locationField: 'CH-NAME',
  },
])

export { content, mapDataLayers }
