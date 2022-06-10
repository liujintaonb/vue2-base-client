import { Tile as TileLayer } from 'ol/layer'
import TileWMS from 'ol/source/TileWMS'

export default {
  data () {
    return {
      // 国界线
      countryWms: null,
      // 行省
      shengWms: null,
      // 行市
      shiWms: null,
      xianWms: null
    }
  },
  mounted () {
    // 国界线
    this.countryWms = this.layerOfCountry()
    // 连行省
    this.shengWms = this.layerOfSheng()
    // 连行市
    this.shiWms = this.layerOfShi()
    //
    this.xianWms = this.layerOfXian()
  },
  methods: {
    // 国界线
    layerOfCountry () {
      return new TileLayer({
        source: new TileWMS({
          // 未发布
          url: `${process.env.VUE_APP_MAP_VIEW}/cite/wms`,
          params: {
            layers: 'cite:guojie',
            version: '1.1.0'
          },
          serverType: 'geoserver'
        }),
        zIndex: 1
      })
    },
    // 省
    layerOfSheng () {
      return new TileLayer({
        source: new TileWMS({
          // 未发布
          url: `${process.env.VUE_APP_MAP_VIEW}/cite/wms`,
          params: {
            layers: 'cite:xz_quguo',
            version: '1.1.0'
          },
          serverType: 'geoserver'
        }),
        zIndex: 2
      })
    },
    // 市
    layerOfShi () {
      return new TileLayer({
        source: new TileWMS({
          // 未发布
          url: `${process.env.VUE_APP_MAP_VIEW}/cite/wms`,
          params: {
            layers: 'cite:xz_city',
            version: '1.1.0'
          },
          serverType: 'geoserver'
        }),
        zIndex: 3
      })
    },
    // 县
    layerOfXian () {
      return new TileLayer({
        source: new TileWMS({
          // 未发布
          url: `${process.env.VUE_APP_MAP_VIEW}/cite/wms`,
          params: {
            layers: 'cite:xz_county',
            version: '1.1.0'
          },
          serverType: 'geoserver'
        }),
        zIndex: 4
      })
    }
  }
}
