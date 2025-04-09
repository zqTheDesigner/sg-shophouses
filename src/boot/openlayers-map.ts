import { defineBoot } from '#q-app/wrappers'
// The style are only needed for some map controls.
// However, you can also style them by your own
import 'vue3-openlayers/styles.css'

import OpenLayersMap from 'vue3-openlayers'
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-vite/boot-files
export default defineBoot(({ app }) => {
  app.use(OpenLayersMap)
  console.log('use opne layers')
})
