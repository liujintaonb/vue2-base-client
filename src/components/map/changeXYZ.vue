<template>
  <div
    v-on:mouseover="changeActive($event)"
    v-on:mouseout="removeActive($event)"
    class="map-nav-right-img"
  >
    <div
      v-for="(item, key) in mapNavImgArr"
      @click="mapNavImgClick(item, key)"
      style="margin: 0 6px"
      :class="[
        key == 5 ? 'action' : 'slide',
        item.name == activeLayer ? 'active-layer' : '',
      ]"
      :key="key"
    >
      <img :src="item.src" />
      <p v-text="item.name" class="map-nav-right-img-name"></p>
      <div class="tdt-iconLayers-layerCheckIcon"></div>
    </div>
  </div>
</template>

<script>
import { Tile as TileLayer } from "ol/layer";
import XYZ from "ol/source/XYZ";
import WMTS from "ol/source/WMTS";
import WMTSGrid from "ol/tilegrid/WMTS";
import { getTopLeft, getWidth } from "ol/extent";
import { get as getProj } from "ol/proj";

export default {
  props: {
    map: Object,
  },
  data() {
    const projectionExtent = getProj("EPSG:4326").getExtent();
    const size = getWidth(projectionExtent) / 256;
    const resolutions = [];
    for (var z = 2; z < 19; ++z) {
      resolutions[z] = size / Math.pow(2, z);
    }

    const dxImg = require("@/pages/map/map-query/map-img/di-xing-x.png");
    const wxImg = require("@/pages/map/map-query/map-img/wei-xing-x.png");
    const dtImg = require("@/pages/map/map-query/map-img/di-tu.png");
    return {
      resolutions,
      projectionExtent,
      // url 经纬度投影
      mapNavImgArr: [
        {
          src: wxImg,
          name: "风险普查0.8米影像",
          type: "fxpc",
          layers: ["img", "img08", "cia"],
          dUrl: true,
          bUrl: true,
        },
        {
          src: wxImg,
          name: "风险普查影像底图",
          type: "fxpc",
          layers: ["img", "cia"],
          dUrl: true,
          bUrl: true,
        },
        {
          src: dtImg,
          name: "风险普查矢量底图",
          type: "fxpc",
          layers: ["vec", "cva"],
          dUrl: true,
          bUrl: true,
        },
        {
          src: dxImg,
          name: "天地图地形",
          dUrl:
            "http://t{0-7}.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=001163910f4981cbe5ced093ef7e3019",
          bUrl:
            "http://t{0-7}.tianditu.com/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=001163910f4981cbe5ced093ef7e3019",
        },
        {
          src: wxImg,
          name: "天地图卫星",
          dUrl:
            "http://t{0-7}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=001163910f4981cbe5ced093ef7e3019",
          bUrl:
            "http://t{0-7}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=001163910f4981cbe5ced093ef7e3019",
        },
        {
          src: dtImg,
          name: "天地图地图",
          dUrl:
            "http://t{0-7}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=001163910f4981cbe5ced093ef7e3019",
          bUrl:
            "http://t{0-7}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=001163910f4981cbe5ced093ef7e3019",
        },
      ],
      mapConfig: {},
      activeLayer: "地图",
    };
  },
  methods: {
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

      let img;
      if (data.type === "fxpc") {
        img = new TileLayer({
          source: new WMTS({
            url:
              "https://fxpc.mem.gov.cn/data_preparation/39699eaf-2ebd-42fe-8553-de3ac44cac9b/161ba32a-106e-4197-a4e3-cd9f1ac5a6db/wmts?geokey=AB0EC656D56BD380345A16C87D539C6C&request=gettile",
            layer: data.layers[0],
            style: "default",
            matrixSet: "c",
            format: "tiles",
            wrapX: true,
            tileGrid: new WMTSGrid({
              origin: getTopLeft(this.projectionExtent),
              //resolutions: res.slice(0, 15),
              resolutions: this.resolutions,
              matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            }),
          }),
        });
      } else {
        img = new TileLayer({
          source: new XYZ({
            url: dUrl,
          }),
        });
      }
      this.map.getLayers().setAt(1, img);

      if (bUrl) {
        this.map.removeLayer(this.mapConfig.mapText);
        if (data.type === "fxpc") {
          this.mapConfig.mapText = new TileLayer({
            source: new WMTS({
              url:
                "https://fxpc.mem.gov.cn/data_preparation/39699eaf-2ebd-42fe-8553-de3ac44cac9b/161ba32a-106e-4197-a4e3-cd9f1ac5a6db/wmts?geokey=AB0EC656D56BD380345A16C87D539C6C&request=gettile",
              layer: data.layers[1],
              style: "default",
              matrixSet: "c",
              format: "tiles",
              wrapX: true,
              tileGrid: new WMTSGrid({
                origin: getTopLeft(this.projectionExtent),
                //resolutions: res.slice(0, 15),
                resolutions: this.resolutions,
                matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
              }),
            }),
          });
        } else {
          this.mapConfig.mapText = new TileLayer({
            source: new XYZ({
              url: bUrl,
            }),
          });
        }
        this.map.addLayer(this.mapConfig.mapText);
      } else if (this.mapConfig.mapText) {
        this.map.removeLayer(this.mapConfig.mapText);
      }

      if (data.type === "fxpc" && data.layers.length > 2) {
        this.mapConfig.mapMark = new TileLayer({
          source: new WMTS({
            url:
              "https://fxpc.mem.gov.cn/data_preparation/39699eaf-2ebd-42fe-8553-de3ac44cac9b/161ba32a-106e-4197-a4e3-cd9f1ac5a6db/wmts?geokey=AB0EC656D56BD380345A16C87D539C6C&request=gettile",
            layer: data.layers[2],
            style: "default",
            matrixSet: "c",
            format: "tiles",
            wrapX: true,
            tileGrid: new WMTSGrid({
              origin: getTopLeft(this.projectionExtent),
              //resolutions: res.slice(0, 15),
              resolutions: this.resolutions,
              matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            }),
          }),
        });
        this.map.addLayer(this.mapConfig.mapMark);
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
      this.$emit("update");
    },
  },
};
</script>

<style lang="stylus" scoped>
.map-nav-right-img {
  position: absolute;
  bottom: 100px;
  right: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.map-nav-right-img .action {
  width: 80px;
  height: 110px;
  vertical-align: middle;
}

.map-nav-right-img .slide, .action {
  display: inline-block;
  cursor: pointer;
  position: relative;
  width: 80px;
  height: 110px;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  box-sizing: border-box;
  box-shadow: 0 0 5px #6a6a6a;
  vertical-align: middle;
}

.map-nav-right-img .active-layer {
  box-shadow 0 0 5px 3px #2d885f;
}

.map-nav-right-img .slide {
  display: none;
}

.map-nav-right-img .slide img {
  width: 100%;
  height: 110px;
}

.map-nav-right-img .action img {
  width: 100%;
  height: 110px;
}

.map-nav-right-img .map-nav-right-img-name {
  position: relative;
  display flex;
  align-items center;
  justify-content center;
  height: 40px;
  top: -42px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 12px;
}
</style>
