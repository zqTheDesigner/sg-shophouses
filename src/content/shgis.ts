import { type MapDataLayerI } from 'src/stores/mapDataStore'
import { type Reactive, reactive } from 'vue'

const content = {
  siteTitle: 'Singapore Historical Gis',
  mapZoomLevel:12,
  mapCenter:[103.85, 1.346],
  headerLinks: [
    { label: 'Content', link: '' },
    { label: 'Data', link: '' },
    { label: 'People', link: '' },
    { label: 'About', link: '' },
  ],
  about: {
    title: 'Singapore Historical GIS',
    subtitle: 'Welcome to SHGIS！新加坡历史GIS, 欢迎您！',
    bgImage: '',
    content:
      '##Project Description/项目简介 (ongoing...)\n This Singapore Historical GIS Website is based on the “A Historical Geographical Information System for Singapore” project funded by the Singapore Ministry of Education (grant number MOE2015-T2-2-135). This project aims to position Singapore as a major player in the Digital Humanities by building a comprehensive historical GIS in the field of Singapore Studies. This project will result in a highly innovative SHGIS website. This project innovates by combining Chinese and English archival sources into a searchable database, by combining and linking archival sources together with large amounts of data on Chinese socio-cultural institutions gathered in fieldwork over the past 5 years into a common GIS platform, and by creating software to enable users to generate their own map of the distribution of features found within the database. We envision the SHGIS website as a long-term continuously developing research tool and an accumulating, searchable digital archive.\n新加坡历史GIS网站以新加坡教育部资助的“新加坡历史地理信息系统”项目（授权号：MOE2015-T2-2-135）为基础。该项目旨在通过在新加坡研究领域建立全面的历史地理信息系统，以此将新加坡定位为人文数码的主要参与者。该项目将建成一个高度创新的SHGIS网站。这个项目的创新方式有三：其一是通过将中文和英文档案资源整合到一个可搜索的数据库中；其二是通过将档案资源与过去5年里汇集在田野调查中的中国社会文化机构的大量数据整合联结在一起并结合到一个共同的地理信息系统平台中；其三是通过创造软件使用户能够生成他们在数据库中所发现的功能分布图。我们将SHGIS网站设想为一个长期持续发展的研究工具和一个累积的可检索的数字档案。',
  },
}

const mapDataLayers: Reactive<MapDataLayerI>[] = reactive([
  {
    show: true,
    title: 'United Temples',
    dataUrls: ['data/united-temples.json'],
    type: 'point',
    loaded: false,
    feature: null,
    markerColor: 'red',
    checkBoxColor: 'red',
    titleField: 'siteNameEn',
    locationField: 'siteNameAlt1',
  },
  {
    show: false,
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
    show: false,
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
    show: false,
    title: 'Keramat Shrines',
    dataUrls: ['data/03-keramatShrines.json'],
    type: 'point',
    loaded: false,
    feature: null,
    markerColor: '#E1AA36',
    checkBoxColor: 'yellow-9',
    titleField: 'siteNameEn',
    locationField: 'siteNameAlt1',
  }
])

export { content, mapDataLayers }
