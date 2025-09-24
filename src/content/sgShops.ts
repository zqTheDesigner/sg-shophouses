import { type MapDataLayerI } from 'src/stores/mapDataStore'
import { type Reactive, reactive } from 'vue'

const content = {
  siteTitle: 'SG Old Shops',
  mapZoomLevel: 14.5,
  mapCenter: [103.84, 1.286],
  headerLinks: [
    { label: 'Map', link: 'map' },
    { label: 'Content', link: 'content' },
    { label: 'Data', link: 'data' },
    { label: 'People', link: 'people' },
    { label: 'About', link: 'about' },
  ],
  about: {
    title: 'Singapore Old House',
    subtitle: '',
    bgImage: '/images/markus-leo-g5YqLybBtmA-unsplash.jpg',
    content: `## Project Description/项目简介 (ongoing...) \n\n This research project, "Mapping the Vernacular City," presents a groundbreaking spatial analysis of Singapore's urban fabric during a critical period of its history. At its core is a newly constructed geospatial dataset that precisely locates over 14,000 shophouses from the 1950s, meticulously mapped onto the contemporary landscape of Singapore. This innovative methodology allows us to transcend traditional archival research, offering an unprecedented, bird's-eye view of the city's most iconic building typography at the dawn of its transition to modernity. \n The project's primary objective is to investigate the distribution, density, and clustering of these shophouses to reveal previously hidden patterns of urban development, economic activity, and community formation. By georeferencing historical maps, directories, and aerial photographs, we have not only placed these structures on a modern map but have also begun to reconstruct the vanished streetscapes of 1950s Singapore. This dataset serves as a foundational layer for multi-layered historical inquiry.\n Key research questions include: How did shophouse density correlate with specific ethnic enclaves, transportation networks, and commercial hubs? What can the spatial distribution tell us about the socio-economic hierarchies of the time? Furthermore, by comparing the 1950s map with present-day satellite imagery, the project will quantitatively and qualitatively analyze the extent of urban renewal, conservation efforts, and the literal erasure of historical precincts. This comparative analysis provides a powerful narrative of change, loss, and preservation.\n Ultimately, this project moves beyond architecture to write a social history from the ground up. The shophouse was not merely a building but the lived environment for a vast majority of the city's population—combining residence, commerce, and light industry. By mapping these 14,000 points, we are reconstructing the skeleton of mid-century Singaporean life, enabling a deeper understanding of how the city's physical form shaped, and was shaped by, the daily experiences of its people. The findings will be disseminated through an interactive public digital map, academic publications, and visualizations, making this vital aspect of Singapore's heritage accessible to all.`,
  },
  landingPage: {
    title: 'Singapore Old House',
    subtitle: '',
    bgImage: '/images/markus-leo-g5YqLybBtmA-unsplash.jpg',
    content: `## Project Description/项目简介 (ongoing...) \n\n This research project, "Mapping the Vernacular City," presents a groundbreaking spatial analysis of Singapore's urban fabric during a critical period of its history. At its core is a newly constructed geospatial dataset that precisely locates over 14,000 shophouses from the 1950s, meticulously mapped onto the contemporary landscape of Singapore. This innovative methodology allows us to transcend traditional archival research, offering an unprecedented, bird's-eye view of the city's most iconic building typography at the dawn of its transition to modernity. \n The project's primary objective is to investigate the distribution, density, and clustering of these shophouses to reveal previously hidden patterns of urban development, economic activity, and community formation. By georeferencing historical maps, directories, and aerial photographs, we have not only placed these structures on a modern map but have also begun to reconstruct the vanished streetscapes of 1950s Singapore. This dataset serves as a foundational layer for multi-layered historical inquiry.\n Key research questions include: How did shophouse density correlate with specific ethnic enclaves, transportation networks, and commercial hubs? What can the spatial distribution tell us about the socio-economic hierarchies of the time? Furthermore, by comparing the 1950s map with present-day satellite imagery, the project will quantitatively and qualitatively analyze the extent of urban renewal, conservation efforts, and the literal erasure of historical precincts. This comparative analysis provides a powerful narrative of change, loss, and preservation.\n Ultimately, this project moves beyond architecture to write a social history from the ground up. The shophouse was not merely a building but the lived environment for a vast majority of the city's population—combining residence, commerce, and light industry. By mapping these 14,000 points, we are reconstructing the skeleton of mid-century Singaporean life, enabling a deeper understanding of how the city's physical form shaped, and was shaped by, the daily experiences of its people. The findings will be disseminated through an interactive public digital map, academic publications, and visualizations, making this vital aspect of Singapore's heritage accessible to all.`,
  },
  dataPage: {
    title: 'Data',
    subtitle: 'Subtitle About Data',
    bgImage: '/images/markus-leo-g5YqLybBtmA-unsplash.jpg',
    content:
      '## Data\n The Data contains shophouse locations and other information from 1950s Singapore',
  },
  peoplePage: {
    title: 'People',
    subtitle: '',
    bgImage: '/images/as8.jpeg',
    content: '',
    people: [
      {
        name: 'DEAN, Kenneth',
        subtitle: 'Research Leader',
        info: 'Prof Kenneth Dean is Kwan Im Thong Hood Cho Temple Professor in the Humanities Division at Yale-NUS College, and Professor at Department of Chinese Studies, NUS. He has been Cluster Leader of the Religion and Globalisation Cluster at ARI since January 2015, on an 8-year joint appointment as Professor with the Religion and Globalisation Cluster, Inter-Asia Engagements Cluster, and the NUS Department of Chinese Studies. He received his PhD and MA in Chinese from Stanford University. His recent publications include Epigraphical Materials on the History of Religion in Fujian: Zhanghou Region (Fuzhou 2019), Secularism in South, East, and Southeast Asia (NY: Palgrave, 2018), co-edited with Peter van der Veer, and Chinese Epigraphy of Singapore: 1819-1911 (2 vols.) (Singapore: NUS Press, 2017), co-edited with Dr Hue Guan Thye. He also directed Bored in Heaven: A Film about Ritual Sensation (2010), on celebrations around Chinese New Year in Putian, Fujian, China. His other publications include Ritual Alliances of the Putian Plain, 2 vols. (Leiden: Brill, 2010) (with Zheng Zhenman). His current project involves the construction of two interactive, multi-media databases, Singapore Historical GIS (SHGIS) and Singapore Biographical Database (SBDB). These projects may be viewed online at http://shgis.nus.edu.sg and http://sbdb.nus.edu.sg.',
      },
      {
        name: 'YU, Kang',
        subtitle: 'Postdoctoral Fellow',
        info: 'Dr Yu Kang commenced his appointment as Postdoctoral Fellow with the Religion and Globalisation Cluster on 21 February 2023. He obtained his PhD in Chinese Studies at NUS in 2022 with a thesis focusing on Huizhou merchants and their transregional trade institutions. His current research interests include business history and overseas Chinese, with a particular focus on the networks interweaving Chinese temples and businesses in Southeast Asia. At ARI he will work on projects on the historical records of temples and businesses in Singapore, aiming to build a new database that will add another layer to the Singapore Historical GIS.',
      },
      {
        name: 'Wang Sisi',
        subtitle: 'Postdoctoral Fellow',
        info: 'Wang Sisi is a Postdoctoral Fellow in Buddhist Studies at the National University of Singapore. Her research interests include Chinese Buddhism, sacred space, pilgrimage, social history of late imperial and modern China, and Sino-Southeast Asian interactions. She obtained a PhD in Chinese Studies at the National University of Singapore, with a dissertation on Mount Jiuhua in late imperial and Republican China. Wang’s postdoctoral research focuses on transnational Buddhist interactions in modern Asia. She aims to investigate the role of Buddhist sacred sites in the conduct of religious diplomacy, as well as the Buddhist networks between China and the overseas Chinese in Southeast Asia.',
      },
      {
        name: 'Zhang Qiao',
        subtitle: 'Independent Scholar & Artist',
        info: 'Multidisciplinary creative professional with over a decade of experience spanning art, design, AI, and digital humanities research. Founder of ArchPlate, a home-based printmaking studio focused on developing eco-friendly electro-etching techniques as a safer and more sustainable alternative to acid-based printmaking. As an independent scholar, I have contributed to research teams in NUS on overseas Chinese heritage, applying digital humanities methods such as GIS mapping, text digitization, and AI- based analysis to cultural archives. With a background in UI/UX design, web development, and data engineering, I bridge technology and the humanities to create tools and artworks that are both innovative and human-centered. My work seeks to connect craft, history with identity, and digital practice with the tactile world of printmaking',
      },
    ],
  },
  contentPage: {
    title: 'Content',
    subtitle: '',
    bgImage: '/images/library.jpg',
    content: '',
    listOfContent: [
      {
        title: 'Sample Page 1',
        subtitle: 'Sample Page',
        link: 'https://fass.nus.edu.sg/cs/',
        brief: 'Sample Link, the link will be open in a new tab by default',
      },
      {
        title: 'Sample Local Article',
        subtitle: 'This is a article inside the website',
        link: '/samplearticle',
        brief: 'By default, will open in new tab',
      },
    ],
  },
}

const mapDataLayers: Reactive<MapDataLayerI>[] = reactive([
  {
    show: true,
    title: 'Singapore Old Shops',
    dataUrls: ['data/batch_1.json', 'data/batch_2.json'],
    type: 'point',
    loaded: false,
    feature: null,
    markerColor: '#E43636',
    checkBoxColor: 'green',
    titleField: false,
    locationField: false,
  },
  {
    show: true,
    title: 'Singapore Streets',
    dataUrls: ['data/streets.json'],
    type: 'line',
    loaded: false,
    feature: null,
    markerColor: '#239BA7',
    checkBoxColor: 'teal-5',
    titleField: 'siteNameEn',
    locationField: 'address',
  },
])

export { content, mapDataLayers }
