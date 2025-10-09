import { type MapDataLayerI } from 'src/stores/mapDataStore'
import { type Reactive, reactive } from 'vue'

const content = {
  siteTitle: 'Singapore Historical Business Database',
  mapZoomLevel: 16,
  mapCenter: [103.84, 1.286],
  headerLinks: [
    { label: 'Map', link: 'map' },
    { label: 'Paper', link: 'content' },
    { label: 'Data', link: 'data' },
    { label: 'People', link: 'people' },
    { label: 'About', link: 'about' },
    { label: 'Acknowledgement', link: 'acknowledgement' },
  ],
  about: {
    title: 'Singapore Historical Business Database',
    subtitle: '',
    bgImage: '/images/markus-leo-g5YqLybBtmA-unsplash.jpg',
    content: `Singapore Historical Business Database is a website that reconstructs the spatial evolution of Singapore’s urban landscape by mapping locations of companies across different historical eras, thereby giving us a glimpse of the city state’s transformation into a global commercial hub that it is today.\n\n<img src='/images/map image.png' style='max-width:800px;width:100%'>Tapping on a comprehensive 1949 business directory, our team is building an extensive database of Singapore’s businesses to analyse the city’s economic and social structures during the colonial era. The 1949 Business Name Registration Directory is a treasure trove of information that contains more than 14,000 business names and 30,000 proprietors, and allows us to study how some businesses have evolved to keep up with the times and how others have vanished as.\n\nWe begin our exploration along the bustling banks of Boat Quay by using GIS technology to dot the locations of a myriad of companies around the vicinity. The diversity of businesses ranging from shipping companies to sundries shops in the downtown area – known colloquially in Hokkien as po dei (坡底) – is testament to Singapore’s role as a regional entrepot with trade crisscrossing the East and the West since the early 1800s.\n\nThis first phase of our project was funded by the National Heritage Board’s Heritage Research Grant (HRG059) and we have plans to expand our research in two main areas: (1) enriching existing entries with primary sources related to each business; (2) developing new GIS layers representing the 19th and early 20th centuries based on newly collected historical materials.`,
  },
  landingPage: {
    title: 'Singapore Historical Business Database',
    subtitle: '',
    bgImage: '/images/markus-leo-g5YqLybBtmA-unsplash.jpg',
    content: ``,
  },
  dataPage: {
    title: 'Data',
    subtitle: 'Subtitle About Data',
    bgImage: '/images/markus-leo-g5YqLybBtmA-unsplash.jpg',
    content: '',
    data: [
      { title: 'Boat Quay', link: 'csv/Boat Quay.csv' },
      { title: 'Collyer Quay', link: 'csv/Collyer Quay.csv' },
      { title: 'Havelock Road', link: 'csv/Havelock Road.csv' },
    ],
  },
  peoplePage: {
    title: 'People',
    subtitle: '',
    bgImage: '/images/as8.jpeg',
    content: '',
    people: [
      {
        name: 'YU, Kang',
        subtitle: 'Research Fellow',
        info: 'YU Kang is a research fellow with the Religion and Globalisation Cluster at the Asia Research Institute. He obtained his PhD in Chinese Studies at NUS with a thesis focusing on Huizhou merchants and their transregional trade institutions. His research interests include business history and overseas Chinese. He is currently the Principal Investigator of a Heritage Research Grant supported by National Heritage Board and is working on a book about importers and exporters in Singapore.',
      },
      {
        name: 'Wang Sisi',
        subtitle: 'Research Fellow',
        info: 'WANG Sisi is a research fellow in the Department of Chinese Studies at National University of Singapore. Her research interests include Chinese Buddhism and overseas Chinese history. She received her PhD in Chinese Studies from NUS, with a dissertation examining the development of Mount Jiuhua into a pilgrimage centre during late imperial and Republican China. She is the translator of Lisan Fayuan (離散法緣), a book by NUS Associate Prof by Jack Meng-Tat Chia, and has published articles in Asian Theatre Journal and New History (Xin Shixue) journal. Currently, she is working on a book project about Southeast Asia’s Guanyin temples since the 17th century.',
      },
      {
        name: 'LEE Chyen Yee',
        subtitle: 'Research Associate',
        info: 'LEE Chyen Yee is an associate faculty member of SUSS who lectures on economics, political economy and communications. A former journalist with Reuters, she has since ventured into research in economics history focusing on Southeast Asia and China. She is currently working on a project funded by the National Heritage Board on the history and networks of Chinese businesses in Singapore during colonial times. Previously, she co-authored a paper published in the World Development journal on China’s poverty campaign.',
      },
      {
        name: 'Zhang Qiao',
        subtitle: 'Independent Scholar & Artist',
        info: 'ZHANG Qiao is a multidisciplinary creative professional with over a decade of experience spanning art, design, AI, and digital humanities research. He is a founder of ArchPlate, a home-based printmaking studio that focuses on developing eco-friendly electro-etching techniques as a safer and more sustainable alternative to acid-based printmaking. As an independent scholar, he has contributed to research teams in NUS on overseas Chinese heritage by applying digital humanities methods, such as GIS mapping, text digitisation, and AI-based analysis, to study cultural archives.',
      },
    ],
    'special-advisors': [
      {
        name: 'Kenneth DEAN',
        info: 'Professor at the Department of Chinese Studies at NUS and Cluster Leader of the Religion and Globalisation Cluster at the Asia Research Institute',
      },
      {
        name: 'KOH Khee Heong',
        info: 'Associate Professor at the Department of Chinese Studies at NUS',
      },
    ],
  },
  contentPage: {
    title: 'Paper',
    subtitle: '',
    bgImage: '/images/library.jpg',
    content: '',
    listOfContent: [
      {
        title: '',
        subtitle: 'Lee, C.Y. (2025). Maps, money, and merchants in colonial Singapore. ARIscope.',
        link: 'https://ari.nus.edu.sg/ariscope/maps-money-merchants-colonial-singapore/',
        brief: '',
      },
      {
        title: '',
        subtitle:
          'Lee, C. Y. (2025). Trading tales from a 1949 directory: Mapping Boat Quay’s commercial heart. MUSE SG. ',
        link: 'https://www.roots.gov.sg/MUSE/articles/Trading-Tales-from-a-1949-Directory-Mapping-Boat-Quays-Commercial-Heart',
        brief: '',
      },
    ],
  },
  acknowledgementPage: {
    title: 'Acknowledgement',
    subtitle: '',
    bgImage: '/images/nus.png',
    content: '',
    shops: [
      {
        name: 'Eng Diang Huat 翁展发 ',
        image: '',
      },
      {
        name: ' Pek Sin Choon 白新春',
        image: '/images/Pek Sin Choon.jpg',
      },
      {
        name: 'Chop Wah On 华安  ',
        image: '',
      },
      {
        name: 'Ng Choon Seng 黄春生 ',
        image: '',
      },
      {
        name: 'Kim Chuan Choon 金泉春 ',
        image: '',
      },
      {
        name: 'Gan Chong Bee 源崇美',
        image: '',
      },
    ],
    individuals: [
      {
        name: 'Mr. Victor Yue 尤祥瑞',
        image: '',
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
    checkBoxColor: 'teal-8',
    titleField: false,
    locationField: false,
  },
  {
    show: false,
    title: 'Singapore Streets',
    dataUrls: ['data/streets.json'],
    type: 'line',
    loaded: false,
    feature: null,
    markerColor: '#147179',
    checkBoxColor: 'green-8',
    titleField: 'siteNameEn',
    locationField: 'address',
  },
  {
    show: false,
    title: 'Singapore 1950s Map',
    dataUrls: [],
    type: 'line',
    loaded: false,
    feature: null,
    markerColor: '#147179',
    checkBoxColor: 'amber-8',
    titleField: 'siteNameEn',
    locationField: 'address',
  },
])

export { content, mapDataLayers }
