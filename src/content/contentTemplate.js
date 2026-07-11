import { reactive } from 'vue'

const content = {
  siteTitle: '',
  mapZoomLevel: 12,
  mapCenter: [103.85, 1.346],
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
    show: true, // Show this layer on the map by default
    title: 'United Temples', // Title of the layer
    dataUrls: ['data/united-temples.json'], // URLs to fetch data for this layer
    type: 'point', // Type of data (point, line, polygon)
    loaded: false, // Indicates if the layer data has been loaded
    feature: null, // Placeholder for the features created from the data
    markerColor: '#008ab8', // Color of the markers for this layer
    checkBoxColor: 'blue-8', // Color of the checkbox in the UI for this layer
    titleField: 'siteNameEn', // Field in the data to use as the title for features
    locationField: 'siteNameAlt1', // Field in the data to use as the location for features
  },
  {
    show: true,
    title: 'United Temples',
    dataUrls: ['data/united-temples.json'],
    type: 'point',
    loaded: false,
    feature: null,
    markerColor: '#008ab8',
    checkBoxColor: 'blue-8',
    titleField: 'siteNameEn',
    locationField: 'siteNameAlt1',
  },
])

export { content, mapDataLayers }
