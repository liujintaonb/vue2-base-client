import 'ol/ol.css'
import Map from 'ol/Map'
// import Overlay from 'ol/Overlay'
import View from 'ol/View'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import XYZ from 'ol/source/XYZ'
// import TileWMS from 'ol/source/TileWMS'
import Point from 'ol/geom/Point'
import Polygon from 'ol/geom/Polygon'

import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import Circle from 'ol/geom/Circle'
import { Vector as VectorSource } from 'ol/source'
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from 'ol/style'
import Draw from 'ol/interaction/Draw'
import Text from 'ol/style/Text'
import { getLength } from 'ol/sphere'
import LineString from 'ol/geom/LineString'
import Overlay from 'ol/Overlay'

export const initMap = (id, url1, url2) => {
  const map = new Map({
    layers: [
      new TileLayer({
        source: new XYZ({
          url: url1 || 'http://t3.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=001163910f4981cbe5ced093ef7e3019'
        })
      }),
      new TileLayer({
        source: new XYZ({
          url: url2 || 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=001163910f4981cbe5ced093ef7e3019'
        })
      })
      // new TileLayer({
      //     source: new TileWMS({
      //         url: `${process.env.VUE_APP_MAP_VIEW}/cite/wms`,
      //         params: {
      //             layers: 'cite:xunhu_user_location',
      //             version: '1.1.0'
      //         },
      //         serverType: 'geoserver'
      //     })
      // })
    ],
    target: document.getElementById(id),
    view: new View({
      center: [108.5525, 34.3227],
      zoom: 4,
      // minZoom: 7,
      // maxZoom: 14,
      projection: 'EPSG:4326'
    })
  })

  return map
}

/**
 * @param line:lineString
 * **/
// 获取长度 lineString
export const formatLength = line => {
  const length = getLength(line, { projection: 'EPSG:4326' })
  // let output;
  // if (length > 100) {
  //     output = Math.round(length / 1000 * 100) / 100 +
  //     ' ' + 'km';
  // } else {
  //     output = Math.round(length * 100) / 100 +
  //     ' ' + 'm';
  // }
  return Math.round(length * 100) / 100
}

// 获取坐标点Feature
export const getPointFeature = (xy, text, type) => {
  const features = []
  const feature = new Feature({
    geometry: new Point(xy),
    name: 'Point',
    type: 'Point',
    population: 4000,
    rainfall: 500
  })
  const textConfig = {
    text: text,
    textAlign: 'center',
    textBaseline: 'middle',
    rotation: 0,
    font: 'normal 12px 微软雅黑',
    offsetY: type === 'mubiao' ? -30 : 25,
    fill: new Fill({
      color: '#ffffff'
    }),
    backgroundFill: new Fill({
      color: '#549e59'
    }),
    padding: [2, 5, 2, 5]
  }

  const textObj = new Text(textConfig)

  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 20],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: type === 'daka' ? require('../assets/da-ka-wei-zhi.png') : require('../assets/mu-biao-wei-zhi.png')
    }),
    text: textObj
  })

  feature.setStyle(iconStyle)

  features.push(feature)
  return features
}

// 获取坐标点Feature
export const setImgFeature = (xy, url) => {
  const overlay = new Overlay({
    element: document.getElementById('img-daka'),
    positioning: 'top-center',
    stopEvent: false,
    offset: [-100, -150]
  })
  overlay.setPosition(xy)

  return overlay
}

export const setDataPointOrPolygon = (arr) => {
  const features = []
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index]
    if (element.geometry.type === 'Polygon') {
      const feature = new Feature({
        geometry: new Polygon(element.geometry.coordinates),
        name: 'Polygon',
        type: 'Polygon',
        population: 4000,
        rainfall: 500
      })
      features.push(feature)
    }
  }
  return features
}

// 获取线Feature
export const getLineFeature = (coordinates) => {
  const features = []
  const feature = new Feature({
    geometry: new LineString(coordinates),
    name: 'LineString',
    type: 'LineString',
    population: 4000,
    rainfall: 500
  })

  features.push(feature)
  return features
}

export const getVectorLayer = (features) => {
  const styles = {
    route: new Style({
      stroke: new Stroke({
        width: 6,
        color: [237, 212, 0, 0.8]
      })
    }),
    LineString: new Style({
      stroke: new Stroke({
        width: 6,
        color: [237, 212, 0, 0.8]
      })
      //   text: new Text({
      //     text: 55555,
      //     textAlign: 'center',
      //     textBaseline: 'middle',
      //     font: 'normal 12px 微软雅黑',
      //     offsetY: -25,
      //     fill: new Fill({
      //       color: '#ffffff'
      //     }),
      //     backgroundFill: new Fill({
      //       color: '#549e59'
      //     }),
      //     padding: [2, 5, 2, 5]
      //   })
    }),
    Polygon: new Style({
      stroke: new Stroke({
        color: 'rgba(255,0,255,1)',
        lineDash: [4],
        width: 3
      }),
      fill: new Fill({
        color: 'rgba(255,0,255,0)'
      })
    }),
    icon: new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: 'data/icon.png'
      })
    }),
    geoMarker: new Style({
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({ color: 'black' }),
        stroke: new Stroke({
          color: 'white',
          width: 2
        })
      })
    })
  }

  const source = new VectorSource({
    features: features
  })
  const vectorLayer = new VectorLayer({
    source: source,
    style: function (feature) {
      return styles[feature.get('type')]
    }
  })
  return vectorLayer
}

// 添加绘图功能
export const handleAddHuoQingMian = (type, map, style) => {
  const source = new VectorSource({ wrapX: false })

  const drawVector = new VectorLayer({
    source: source
  })

  const draw = new Draw({
    source: source,
    // type: 'Polygon','LineString'
    type: type,
    style: new Style({
      stroke: new Stroke({
        color: '#65e977',
        width: 5
      })
    })
  })

  map.addLayer(drawVector)
  map.addInteraction(draw)

  return { source, drawVector, draw }
}

// 如果使用geojson
export function getGeojsonLayer (geojsonObject, color) {
  const images = new CircleStyle({
    radius: 5,
    fill: null,
    stroke: new Stroke({ color: color, width: 1 })
  })

  const styles = {
    Point: new Style({
      // @ts-ignore
      image: images
    }),
    LineString: new Style({
      stroke: new Stroke({
        color: color,
        width: 5
      })
    }),
    MultiLineString: new Style({
      stroke: new Stroke({
        color: color,
        width: 1
      })
    }),
    MultiPoint: new Style({
      // @ts-ignore
      image: images
    }),
    MultiPolygon: new Style({
      stroke: new Stroke({
        color: color,
        width: 1
      }),
      fill: new Fill({
        color: 'rgba(255, 255, 0, 0.1)'
      })
    }),
    Polygon: new Style({
      stroke: new Stroke({
        color: 'rgba(255,0,255,1)',
        lineDash: [4],
        width: 3
      }),
      fill: new Fill({
        color: color
      })
    }),
    GeometryCollection: new Style({
      stroke: new Stroke({
        color: color,
        width: 2
      }),
      fill: new Fill({
        color: color
      }),
      // @ts-ignore
      image: new CircleStyle({
        radius: 10,
        fill: null,
        stroke: new Stroke({
          color: color
        })
      })
    }),
    Circle: new Style({
      stroke: new Stroke({
        color: color,
        width: 2
      }),
      fill: new Fill({
        color: color
      })
    })
  }

  const styleFunction = function (feature) {
    return styles[feature.getGeometry().getType()]
  }

  const vectorSource = new VectorSource({
    // @ts-ignore
    features: new GeoJSON().readFeatures(geojsonObject)
  })

  vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)))

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: styleFunction
  })

  return vectorLayer
}

export const pointerFeature = (position) => {
  return new Feature({
    geometry: new Point(position),
    name: 'Point',
    population: 4000,
    rainfall: 500
  })
}
export function olStyle (fill, stroke) {
  return new Style({
    fill: new Fill({
      color: fill
    }),
    stroke: new Stroke({
      color: stroke,
      width: 2
    })
  })
}
