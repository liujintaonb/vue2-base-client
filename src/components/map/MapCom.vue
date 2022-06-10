<template>
  <div class="map-container">
    <div id="map">
      <div id="mapPopup" class="map-popup-all" v-show="popupShow">
        <div class="map-popup-closer" @click="closePopup">+</div>
        <div id="popup-content">
          <p>{{ popup.lfx }}</p>
          <p>{{ popup.area }}</p>
        </div>
      </div>
    </div>
    <change-x-y-z :map="map" style="right: 20px; bottom: 30px"></change-x-y-z>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import Overlay from "ol/Overlay";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource, XYZ } from "ol/source";
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Text,
  RegularShape,
  Icon,
} from "ol/style";
import { Polygon, Point } from "ol/geom";
import { Select } from "ol/interaction";
import Feature from "ol/Feature";
import ChangeXYZ from "@/components/map/changeXYZ";
import { findCenterPoint } from "@/common/baseFunction";
export default {
  name: "MapCom",
  components: { ChangeXYZ },
  data() {
    return {
      map: null,
      yfFeatures: null,
      ydFeature: null,
      lfxFeature: null,
      jiaoGuiPointsFeatures: [],
      popupShow: false,
      dialogOverlay: null,
      popup: {},
    };
  },
  props: {
    ydType: {
      type: String,
      required: true,
      default: "",
    },
    ydPoints: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    lfxData: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    yfPoints: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    centroidGeoJson: {
      type: Array,
      default() {
        return [];
      },
    },
    jiaoGuiPoints: {
      type: Array,
      default() {
        [];
      },
    },
  },
  methods: {
    initMap() {
      const map = new Map({
        layers: [this.dLayer, this.bLayer],
        target: "map",
        contorls: [],
        view: this.view,
      });
      this.map = map;
      // this.map.addInteraction(this.select);
      this.map.addLayer(this.infoLayer);
    },
    addYf() {
      if (!this.yfPoints) {
        return;
      }
      const featureArr = [];
      for (let item of this.yfPoints) {
        let obj;
        let style;
        obj = new Feature({
          geometry: new Point(item.point),
          name: "yf",
          population: 4000,
          rainfall: 500,
          id: item.uuid,
          xuHao: item.xuHao,
        });
        obj.setId(item.uuid);
        const shapeFillColor =
          item.name && item.name.startsWith("公用小样方")
            ? "#9000ff"
            : "#1170c9";
        style = new Style({
          fill: new Fill({
            color: "#ff0000",
          }),
          stroke: new Stroke({
            color: "#ff0000",
            width: 2,
          }),
          image: new RegularShape({
            fill: new Fill({
              color: shapeFillColor,
            }),
            points: 4,
            radius: 50,
            angle: Math.PI / 4,
          }),
          text: new Text({
            text: item.name || "",
            fill: new Fill({
              color: "#ffffff",
            }),
          }),
        });
        obj.setStyle(style);
        featureArr.push(obj);
      }
      this.yfFeatures = featureArr;
      this.infoSource.addFeatures(featureArr);
    },
    addYd() {
      if (!this.ydPoints) {
        return;
      }
      const coords = this.ydPoints;
      let ydArray = [];
      const style = new Style({
        stroke: new Stroke({
          color: "#1170c9",
          width: 2,
          lineDash: [4, 8],
        }),
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: "#ff000000",
          }),
        }),
      });
      coords.forEach((coord, index) => {
        console.log(coord);
        const geometry = new Polygon([coord]);
        const feature = new Feature({
          name: "yd",
          geometry,
          id: `yd-polygon${index}`,
        });
        feature.setStyle(style);
        ydArray.push(feature);
      });
      this.ydFeature = ydArray;
      this.infoSource.addFeatures(ydArray);
    },
    addLfx() {
      if (Array.isArray(this.lfxData) && this.lfxData.length > 0) {
        const lfxArray = [];
        for (const item of this.lfxData) {
          const geoJson = JSON.parse(item.geojson);
          let obj = [];
          if (geoJson.type === "MultiPolygon") {
            if (geoJson.coordinates.length === 0) return [];
            obj = geoJson.coordinates.map((item) => {
              return item[0];
            });
          } else {
            obj = geoJson.coordinates || [];
          }
          const geometry = new Polygon(obj);
          const feature = new Feature({
            id: item.lfx,
            name: "lfx：" + item.lfx,
            popupData: {
              lfx: "林分型编号：" + item.lfx,
              area: "面积(公顷)：" + (item.mj || "未知"),
            },
            geometry,
          });
          const style = new Style({
            fill: new Fill({
              color: "rgba(255,255,255,0)",
            }),
            stroke: new Stroke({
              color: "#9000ff",
              width: 2,
              lineDash: [4, 8],
            }),
            image: new CircleStyle({
              radius: 5,
              fill: new Fill({
                color: "#ff000000",
              }),
            }),
          });

          feature.setStyle(style);
          lfxArray.push(feature);
          let lfxPointArr = item.centroidGeoJson.coordinates || [];
          for (let i = 0; i < lfxPointArr.length; i++) {
            if (Array.isArray(lfxPointArr[i])) {
              this.getLfxPoints(item, lfxPointArr[i]);
            } else {
              this.getLfxPoints(item, lfxPointArr);
              break;
            }
          }
        }
        this.lfxFeature = lfxArray;
        console.log("192", "MapCom.vue", "addLfx", lfxArray);
        this.infoSource.addFeatures(lfxArray);
      }
    },
    // 绘制林分型点
    getLfxPoints(item, point) {
      console.log(item.lfx);
      // const point = item.centroidGeoJson.coordinates;
      const pointFeature = new Feature({
        geometry: new Point(point),
        name: "Point",
        type: "Point",
        population: 4000,
        rainfall: 500,
      });

      const textConfig = {
        text: `${item.lfx}\n${item.mj ? item.mj + "hm²" : "面积未知"}`,
        textAlign: "center",
        textBaseline: "middle",
        rotation: 0,
        font: "normal 12px 微软雅黑",
        offsetX: 0,
        offsetY: 23,
        padding: [2, 5, 2, 5],
      };

      const textObj = new Text(textConfig);

      const iconStyle = new Style({
        image: new Icon({
          anchorXUnits: "pixels",
          anchorYUnits: "pixels",
          src: require("../../assets/point.png"),
          scale: 0.5,
          anchorOrigin: "bottom-right",
          anchor: [8, 0],
        }),
        text: textObj,
      });
      pointFeature.setStyle(iconStyle);
      this.infoSource.addFeature(pointFeature);
    },
    // 绘制角规点
    getPointFeature(item) {
      const features = [];
      const feature = new Feature({
        geometry: new Point(item.point),
        name: "Point",
        type: "Point",
        population: 4000,
        rainfall: 500,
      });
      const textConfig = {
        text: item.title,
        textAlign: "center",
        textBaseline: "middle",
        rotation: 0,
        font: "normal 12px 微软雅黑",
        offsetX: 7,
        offsetY: -15,
        fill: new Fill({
          color: "#ffffff",
        }),
        backgroundFill: new Fill({
          color: "#549e59",
        }),
        padding: [2, 5, 2, 5],
      };

      const textObj = new Text(textConfig);

      const iconStyle = new Style({
        image: new Icon({
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: require("../../assets/jiaoguidian.png"),
          scale: 0.5,
        }),
        text: textObj,
      });
      feature.setStyle(iconStyle);
      this.jiaoGuiPointsFeatures.push(feature);
    },
    addJiaoGuiPoint() {
      if (!this.jiaoGuiPoints) {
        return false;
      }
      this.jiaoGuiPoints.forEach((item) => {
        this.getPointFeature(item);
      });
      this.infoSource.addFeatures(this.jiaoGuiPointsFeatures);
    },
    configView() {
      this.view.setCenter(this.centroidGeoJson);
      if (this.ydType === "bzd") {
        this.view.setZoom(18);
      } else if (this.ydType === "dyd") {
        this.view.setZoom(16);
      } else {
        this.view.setZoom(12);
      }
    },
    configPointerMove() {
      const mapDom = document.querySelector("#map");
      this.map.on("pointermove", (event) => {
        const pixel = this.map.getEventPixel(event.originalEvent);
        const hit = this.map.forEachFeatureAtPixel(pixel, (feature, layer) => {
          return feature.get("name") === "yf";
        });
        mapDom.style.cursor = hit ? "pointer" : "";
      });
    },
    configSingleClick() {
      var _this = this;
      _this.map.on("click", (evt) => {
        if (this.popupShow) {
          return;
        }
        const pixel = _this.map.getEventPixel(evt.originalEvent);
        const feature = _this.map.forEachFeatureAtPixel(
          pixel,
          (feature, layer) => {
            return feature;
          }
        );
        const tempId = feature.get("id");
        if (feature && tempId) {
          _this.popupShow = true;
          this.dialogOverlay = new Overlay({
            element: document.getElementById("mapPopup"),
            positioning: "bottom-center",
            stopEvent: false,
            offset: [0, 10],
          });
          _this.popup = feature.get("popupData");
          var coodinate = evt.coordinate;
          _this.dialogOverlay.setPosition(coodinate);
          _this.map.addOverlay(_this.dialogOverlay);
        } else {
          this.popupShow = false;
        }
      });
    },
    closePopup() {
      this.popupShow = false;
    },
  },
  computed: {
    view() {
      let view = new View({
        center: [116.40263237375537, 40.00420887168558],
        projection: "EPSG:4326",
        zoom: 1,
        minZoom: 4,
        maxZoom: 18,
      });
      return view;
    },
    dLayer() {
      const layer = new TileLayer({
        source: new XYZ({
          url:
            "http://t{0-7}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=001163910f4981cbe5ced093ef7e3019",
        }),
      });
      return layer;
    },
    bLayer() {
      const layer = new TileLayer({
        source: new XYZ({
          url:
            "http://t{0-7}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=001163910f4981cbe5ced093ef7e3019",
        }),
      });
      return layer;
    },
    infoLayer() {
      const layer = new VectorLayer({
        source: this.infoSource,
        style: new Style({
          fill: new Fill({
            color: "rgba(255, 255, 255, 0.2)",
          }),
          stroke: new Stroke({
            color: "#ffcc33",
            width: 2,
          }),
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({
              color: "#ffcc33",
            }),
          }),
        }),
      });
      return layer;
    },
    infoSource() {
      const source = new VectorSource({ wrapX: false });
      return source;
    },
    select() {
      const style = new Style({
        fill: new Fill({
          color: "rgba(255,255,255,0)",
        }),
        stroke: new Stroke({
          color: "#9000ff",
          width: 2,
        }),
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: "#ff000000",
          }),
        }),
      });
      const select = new Select({
        style,
      });
      select.on("select", (evt) => {
        const feature = evt.selected[evt.selected.length - 1];
        if (!feature) {
          return;
        }
        const uuid = feature.getId();
        const name = feature.get("name");
        const xuHao = feature.get("xuHao");
        feature.setStyle(style);
        if (name === "yf" && uuid) {
          this.$emit("itemClick", uuid, xuHao);
        }
      });
      return select;
    },
  },
  watch: {
    ydPoints(val) {
      if (this.ydFeature) {
        for (let feature of this.ydFeature) {
          this.infoSource.removeFeature(feature);
        }
      }
      this.addYd();
      this.configView();
    },
    yfPoints(val) {
      if (this.yfFeatures) {
        for (let feature of this.yfFeatures) {
          this.infoSource.removeFeature(feature);
        }
      }
      this.addYf();
      this.configView();
    },
    jiaoGuiPoints(val) {
      if (this.jiaoGuiPointsFeatures) {
        for (let feature of this.jiaoGuiPointsFeatures) {
          this.infoSource.removeFeature(feature);
        }
      }
      this.addJiaoGuiPoint();
      this.configView();
    },
    lfxData(val) {
      if (this.lfxFeature) {
        for (let feature of this.lfxFeature) {
          this.infoSource.removeFeature(feature);
        }
      }
      this.addLfx();
      this.configView();
    },
  },
  mounted() {
    this.initMap();
    this.addYd();
    this.addYf();
    this.addLfx();
    this.addJiaoGuiPoint();
    this.configView();
    this.configSingleClick();
    this.configPointerMove();
  },
};
</script>

<style scoped lang="scss">
.map-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 250px);
}
#map {
  /* width: 400px; */
  /* height: 400px; */
  width: 100%;
  height: 100%;
}
.map-popup-all {
  position: absolute;
  z-index: 400;
  bottom: 20px;
  left: 50%;
  min-width: 200px;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  padding: 12px;
  color: #606266;
  text-align: justify;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  word-break: break-all;
  .map-popup-closer {
    position: absolute;
    right: 0;
    top: 0;
    width: 20px;
    text-align: center;
    height: 20px;
    font-size: 26px;
    transform: rotate(45deg);
    color: #c5c5c5;
    cursor: pointer;
  }
  .map-popup-closer:hover {
    color: #888;
  }
  p {
    line-height: 30px;
  }
}
.map-popup-all::before {
  content: " ";
  width: 0;
  height: 0;
  border: solid 10px transparent;
  border-top-color: #fff;
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
