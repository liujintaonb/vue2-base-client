<template>
  <div class="map-detail-con">
    <div id="map-detail"></div>
    <change-x-y-z
      :map="map"
      style="right: 20px; bottom: 30px"
      @update="drawZB"
    ></change-x-y-z>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import XYZ from "ol/source/XYZ";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import { Vector as VectorSource } from "ol/source";
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from "ol/style";
import Text from "ol/style/Text";
import ChangeXYZ from "@/components/map/changeXYZ";
export default {
  name: "MapDetail",
  props: {
    zuiBiaoContent: {
      type: Array,
      defalut: () => [],
    },
  },
  data() {
    return {
      map: null,
      features: null,
      vectorLayer: null,
    };
  },
  components: { ChangeXYZ },
  mounted() {
    this.initMap();
    this.drawZB();
  },
  methods: {
    // 初始化地图
    initMap() {
      this.map = new Map({
        layers: [
          new TileLayer({
            source: new XYZ({
              url:
                "http://t{0-7}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=001163910f4981cbe5ced093ef7e3019",
            }),
          }),
          new TileLayer({
            source: new XYZ({
              url:
                "http://t{0-7}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=001163910f4981cbe5ced093ef7e3019",
            }),
          }),
        ],
        target: document.getElementById("map-detail"),
        view: new View({
          center: [116.40263237, 40.00420887],
          zoom: 12,
          // minZoom: 7,
          // maxZoom: 14,
          projection: "EPSG:4326",
        }),
      });
    },
    // 获取坐标点Feature
    getPointFeature(point, text) {
      const features = [];
      const feature = new Feature({
        geometry: new Point(point),
        name: "Point",
        type: "Point",
        population: 4000,
        rainfall: 500,
      });
      const textConfig = {
        text: `${text}：${point[0]},${point[1]}`,
        textAlign: "center",
        textBaseline: "middle",
        rotation: 0,
        font: "normal 14px 微软雅黑",
        offsetY: -40,
        fill: new Fill({
          color: "#313131",
        }),
        backgroundFill: new Fill({
          color: "#ffffff",
        }),
        padding: [5, 10, 5, 10],
      };

      const textObj = new Text(textConfig);

      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 20],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: require("./../../assets/mu-biao-wei-zhi.png"),
        }),
        text: textObj,
      });

      feature.setStyle(iconStyle);

      features.push(feature);
      this.features = features;
    },
    getVectorLayer(features) {
      const styles = {
        geoMarker: new Style({
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({ color: "black" }),
            stroke: new Stroke({
              color: "white",
              width: 2,
            }),
          }),
        }),
      };
      const source = new VectorSource({
        features: this.features,
      });
      this.vectorLayer = new VectorLayer({
        source: source,
        style: function (feature) {
          return styles[feature.get("type")];
        },
      });
      this.map.addLayer(this.vectorLayer);
    },
    // 设置中心点
    configCenterPoint() {
      this.map.getView().setCenter(this.zuiBiaoContent[0].point, 12);
    },
    drawZB() {
      if (this.zuiBiaoContent.length) {
        this.configCenterPoint();
        this.zuiBiaoContent.forEach((item) => {
          this.getPointFeature(item.point, item.text);
          this.getVectorLayer();
        });
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.map-detail-con{
  width 100%;
  height 300px;
  position: relative;
}
#map-detail{
  width 100%;
  height 100%;
}
</style>
