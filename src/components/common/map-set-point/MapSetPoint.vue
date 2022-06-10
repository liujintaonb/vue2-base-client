<template>
  <div>
    <el-dialog
      id="map-dialog"
      :close-on-click-modal="false"
      title="地图选点"
      :visible.sync="show"
      width="800px"
      v-dialog-drag
    >
      <div style="padding: 7px 0">
        <el-button type="primary" size="small" @click="saveDialogBtn"
          >确定</el-button
        >
        <el-button type="primary" size="small" @click="show = false"
          >取消</el-button
        >
      </div>
      <div class="map-query-box" v-if="show">
        <div>
          <el-input
            style="width: 300px; height: 40px"
            id="mapQueryId"
            placeholder="坐标、行政区域搜索查找定位"
            v-model="mapQuery"
          >
            <el-button
              type="success"
              slot="append"
              class="queryBtn"
              @click="mapQueryClick"
              style="
                background-color: #549e5a;
                border-color: #549e5a;
                color: white;
              "
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </div>
        <div
          id="searchResultPanel"
          style="border: 0 solid #c0c0c0; width: 150px"
        ></div>
      </div>
      <div v-if="show" id="map" style="width: 100%; height: 500px"></div>
      <div v-if="show" id="mouse-position"></div>
      <div
        v-on:mouseover="changeActive($event)"
        v-on:mouseout="removeActive($event)"
        class="map-nav-right-img"
      >
        <div
          @click="mapNavImgClick(item, key)"
          style="margin: 0 4px"
          :class="[
            key === 1 ? 'action' : 'slide',
            item.name === activeLayer ? 'active-layer' : '',
          ]"
          v-for="(item, key) in mapNavImgArr"
          :key="key"
        >
          <img :src="item.src" />
          <p 活立竹="item.name" class="map-nav-right-img-name"></p>
          <div class="tdt-iconLayers-layerCheckIcon"></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { initMap } from "@/common/map";
import "ol/ol.css";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import XYZ from "ol/source/XYZ";
import MousePosition from "ol/control/MousePosition";
import { format } from "ol/coordinate";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import VectorSource from "ol/source/Vector";

import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from "ol/style";

import LayersMixin from "@/common/LayersMixin";
import { REGEXP_LAT_N, REGEXP_LON_E } from "@/common/unit";

export default {
  mixins: [LayersMixin],
  name: "MapSetPoint",
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      mapNavImgArr: [
        {
          src: require("../../../pages/map/map-query/map-img/wei-xing.png"),
          name: "卫星",
          dUrl:
            "http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=001163910f4981cbe5ced093ef7e3019",
          bUrl:
            "http://t3.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=001163910f4981cbe5ced093ef7e3019",
        },
        {
          src: require("../../../pages/map/map-query/map-img/di-tu.png"),
          name: "地图",
          dUrl:
            "http://t3.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=001163910f4981cbe5ced093ef7e3019",
          bUrl:
            "http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=001163910f4981cbe5ced093ef7e3019",
        },
        {
          src: require("../../../pages/map/map-query/map-img/di-xing.png"),
          name: "地形",
          dUrl:
            "http://t3.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=001163910f4981cbe5ced093ef7e3019",
          bUrl:
            "http://t3.tianditu.com/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=001163910f4981cbe5ced093ef7e3019",
        },
      ],
      activeLayer: "卫星",
      mapConfig: {},
      mapQuery: "",
      addDialogShow: false,
      features: "",
      show: false,
      addMap: null,
    };
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    // 根据坐标汉字查询
    mapQueryClick() {
      if (!this.mapQuery) {
        return false;
      }
      if (this.mapQuery.indexOf(",")) {
        let arrValue = this.mapQuery.split(",");
        if (
          REGEXP_LON_E.test(Number(arrValue[0])) &&
          REGEXP_LAT_N.test(Number(arrValue[1]))
        ) {
          const arr = this.mapQuery.split(",");
          this.addMap.getView().setZoom(10);
          this.addMap.getView().setCenter(arr);
          this.addMapDrwaSource.clear();
          this.addBm(arr);
        } else {
          this.search(this.mapQuery);
        }
      } else {
        this.search(this.mapQuery);
      }
    },
    search(value) {
      console.log(value);
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-undef
        let geocoder = new T.Geocoder();
        geocoder.getPoint(value, (result) => {
          let xy = [
            result.getLocationPoint().lng,
            result.getLocationPoint().lat,
          ];
          this.addMap.getView().setZoom(10);
          this.addMap.getView().setCenter(xy);
          this.addMapDrwaSource.clear();
          this.addBm(xy);
          // this.setDanWeiXzCodeByXy(true, xy);
          resolve(true);
        });
      });
    },
    changeActive() {
      const htmlCollection = document.getElementsByClassName("slide");
      this.setDisplay(htmlCollection, "inline-block");
    },
    removeActive() {
      const htmlCollection = document.getElementsByClassName("slide");
      this.setDisplay(htmlCollection, "none");
    },
    setDisplay(htmlConllection, type) {
      for (let index = 0; index < htmlConllection.length; index++) {
        const element = htmlConllection[index];
        element.style.display = type;
      }
    },
    // 切换图层
    mapNavImgClick(data, key) {
      this.activeLayer = data.name;
      // dUrl 图形url bUrl 标注Url
      const { dUrl, bUrl } = data;

      const img = new TileLayer({
        source: new XYZ({
          url: dUrl,
        }),
      });
      this.addMap.getLayers().setAt(1, img);

      if (bUrl) {
        this.addMap.removeLayer(this.mapConfig.mapText);
        this.mapConfig.mapText = new TileLayer({
          source: new XYZ({
            url: bUrl,
          }),
        });
        this.addMap.addLayer(this.mapConfig.mapText);
      } else if (this.mapConfig.mapText) {
        this.addMap.removeLayer(this.mapConfig.mapText);
      }

      // 单选按钮
      const htmlCollection = document.getElementsByClassName(
        "tdt-iconLayers-layerCheckIcon"
      );
      for (let index = 0; index < htmlCollection.length; index++) {
        const element = htmlCollection[index];
        if (index === key) {
          element.style.background =
            "url(http://api.tianditu.com/v4.0/image/map/maptype/check.png) 4px 4px no-repeat #fff";
        } else {
          element.style.background = "";
        }
      }
      // 保持数据在最上方
      // this.map.removeLayer(this.mapVector);
      // setTimeout(() => {
      //     this.map.addLayer(this.mapVector);
      // }, 500);
    },
    setShow(bool) {
      this.show = bool;
    },
    // 设置汇聚源
    setFeatures(xy) {
      let feature = new Feature({
        geometry: new Point(xy),
        name: "Point",
        population: 4000,
        rainfall: 500,
      });

      let iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 20],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: require("@/assets/mu-biao-wei-zhi.png"),
        }),
      });

      feature.setStyle(iconStyle);
      this.features = [feature];
    },
    setCenter(center, zoom) {
      this.$nextTick(() => {
        this.addMap.getView().setCenter(center);
        this.addMap.getView().setZoom(zoom);
      });
    },
    clearFeatures() {
      this.features = [];
    },
    saveDialogBtn() {
      const c = this.addMapDrwaSource
        .getFeatures()[0]
        .getGeometry()
        .getCoordinates();
      if (c) {
        this.$emit("getMapContdinates", [
          Number(c[0].toFixed(8)),
          Number(c[1].toFixed(8)),
        ]);
        this.show = false;
      } else {
        this.$emit("getMapContdinates", []);
      }
    },
    getMap() {
      return this.addMap;
    },
    biaoJiLuXian() {
      this.$nextTick(() => {
        this.addMap = initMap(
          "map",
          this.mapNavImgArr[1].dUrl,
          this.mapNavImgArr[1].burl
        );
        console.log(this.addMap);
        this.addMap.addLayer(this.countryWms);
        // 移动时候显示当前坐标
        let mousePositionControl = new MousePosition({
          coordinateFormat: function (coordinate) {
            return format(
              coordinate,
              `经度:${coordinate[0].toFixed(6)}  纬度:${coordinate[1].toFixed(
                6
              )}`
            );
          },
          className: "custom-mouse-position",
          target: document.getElementById("mouse-position"),
          undefinedHTML: "",
        });
        this.addMap.addControl(mousePositionControl);
        this.addMap.getView().on("change:resolution", () => {
          if (this.addMap.getView().getZoom() >= 9) {
            this.addMap.removeLayer(this.xianWms);
            this.addMap.addLayer(this.xianWms);
          } else {
            this.addMap.removeLayer(this.xianWms);
          }
          if (this.addMap.getView().getZoom() >= 7) {
            this.addMap.removeLayer(this.shiWms);
            this.addMap.addLayer(this.shiWms);
          } else {
            this.addMap.removeLayer(this.shiWms);
          }
        });

        // 当前地图总数据源
        this.addMapDrwaSource = new VectorSource();

        // 如果有数据源中存在数据则设置标注
        if (this.features) {
          this.addMapDrwaSource.addFeatures(this.features);
        }

        // 设置数据源层
        var vector = new VectorLayer({
          source: this.addMapDrwaSource,
          zIndex: 10,
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

        this.addMap.addLayer(vector);

        // this.setAddMapDraw();

        this.addMap.on("click", (e) => {
          // if (this.startAddBm) {
          this.addMapDrwaSource.clear();
          this.addBm(e.coordinate);
          // }
        });

        var ac = new window.BMap.Autocomplete({
          // 建立一个自动完成的对象
          input: "mapQueryId",
          location: this.addMap,
        });

        ac.addEventListener("onhighlight", function (e) {
          // 鼠标放在下拉列表上的事件
          var str = "";
          var _value = e.fromitem.value;
          var value = "";
          if (e.fromitem.index > -1) {
            value =
              _value.province +
              _value.city +
              _value.district +
              _value.street +
              _value.business;
          }
          str =
            "FromItem<br />index = " +
            e.fromitem.index +
            "<br />value = " +
            value;

          // value = "";
          if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value =
              _value.province +
              _value.city +
              _value.district +
              _value.street +
              _value.business;
          }
        });
        ac.addEventListener("onconfirm", (e) => {
          // 鼠标点击下拉列表后的事件
          let value = e.item.value;
          let myValue =
            value.province +
            value.city +
            value.district +
            value.street +
            value.business;
          this.search(myValue);
        });
      });
    },
    // 添加点标注
    addBm(position) {
      let iconFeature = new Feature({
        geometry: new Point(position),
        name: "Point",
        population: 4000,
        rainfall: 500,
      });

      let iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 20],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: require("@/assets/mu-biao-wei-zhi.png"),
        }),
      });

      iconFeature.setStyle(iconStyle);

      this.features = [iconFeature];
      this.addMapDrwaSource.addFeature(iconFeature);
    },
  },
};
</script>

<style lang="stylus" scoped>
/deep/#map-dialog .el-dialog__body{
  padding-top 0;
}
.map-nav-right-img {
  position: absolute;
  bottom: 100px;
  right: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.map-nav-right-img .action {
  width: 80px;
  height: 80px;
  float: right;
  vertical-align: middle;
}

.map-nav-right-img .slide, .action {
  display: inline-block;
  cursor: pointer;
  position: relative;
  width: 80px;
  height: 80px;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  box-sizing: border-box;
  box-shadow: 0 0 5px #000;
  vertical-align: middle;
}

.map-nav-right-img .active-layer {
  border: 3px solid #2d885f;
}

.map-nav-right-img .slide {
  display: none;
}
.map-nav-right-img .slide img {
  width: 100%;
  height: 100px;
}

.map-nav-right-img .action img {
  width: 100%;
  height: 100px;
}

.map-nav-right-img .map-nav-right-img-name {
  position: relative;
  height: 20px;
  top: -22px;
  background: rgba(255, 255, 255, 0.6);
}

.map-query-box {
  position: absolute;
  top: 110px;
  left: 70px;
  z-index: 1;
}

#mouse-position {
  // width: 100%;
  right: 20px;
  position: absolute;
  line-height: 32px;
  height: 32px;
  bottom: 30px;
  background: rgba(0, 0, 0, 1);
  opacity: 0.5;
  padding: 0 10px;
}

#mouse-position span {
  display: inline-block;
  padding: 0 20px;
  line-height: 32px;
  color: white;
  min-width: 120px;
}

/deep/ #mouse-position .custom-mouse-position {
  display: inline-block;
  color: white;
}
</style>
<style>
.tangram-suggestion-main {
  z-index: 9999 !important;
}
#mapQueryId {
  line-height: 40px;
  height: 40px;
}
</style>
