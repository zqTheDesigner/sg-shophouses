// Purpose of this controller is to serve the specific content
// all the content .ts code should be in the same structure
// The only thing need to do is to uncomment the correct content data

// Temporary fix - also need to edit code in MainMap.vue to display the correct map data layers
// Also need to modify the mapDataController.ts the csvUrls part

// import { content, mapDataLayers } from '../content/sgShops'
import { content, mapDataLayers } from 'src/content/shgis'

// For SHGIS to display PuTian Data
import { content as puTianContent, mapDataLayers as puTianMapDataLayers } from 'src/content/puTian'

export { content, mapDataLayers }
 
// For SHGIS to display PuTian Data
export { puTianContent, puTianMapDataLayers }
