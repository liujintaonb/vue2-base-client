<template>
  <div>
    <div class="map-box">
      <!--      地图载体-->
      <div id="homeMap" :style="homeMapStyle"></div>
      <!-- 鼠标追踪显示经纬度载体 -->
      <div id="mouse-position"></div>
      <div class="map-nav-left-tree" v-show="leftTreeShow">
        <div class="map-nav-left-tree-title">
          <span style="text-align: center"> 图层列表 </span>
        </div>
        <el-tree
          v-show="leftTreeShow"
          id="tree"
          :indent="20"
          :data="treeDataNew"
          show-checkbox
          default-expand-all
          @check-change="treeNodeClick"
          @node-click="treeChildClick"
          :render-content="treeRender"
          node-key="id"
          :default-checked-keys="treeCheckEdArr"
        ></el-tree>
        <div class="map-nav-left-tree-jiantou" @click="leftTreeShow = false">
          <img src="../../../assets/jiantou.png" alt />
        </div>
      </div>
      <div class="map-query-box">
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
          style="border: 1px solid #c0c0c0; width: 150px"
        ></div>
      </div>

      <div
        v-on:mouseover="changeActive($event)"
        v-on:mouseout="removeActive($event)"
        class="map-nav-right-img"
      >
        <div
          @click="mapNavImgClick(item, key)"
          v-for="(item, key) in mapNavImgArr"
          :key="key"
          style="margin: 0 4px"
          :class="[
            key === 5 ? 'action' : 'slide',
            item.name === activeLayer ? 'active-layer' : '',
          ]"
        >
          <img :src="item.src" />
          <p v-text="item.name" class="map-nav-right-img-name"></p>
          <div class="tdt-iconLayers-layerCheckIcon"></div>
        </div>
      </div>

      <div class="map-nav-left-box">
        <div
          class="map-nav-left-box-child-div"
          @click="leftTreeShow = !leftTreeShow"
        >
          <img
            v-if="leftTreeShow === false"
            src="../../../assets/tuceng.png"
            alt
          />
          <img
            v-if="leftTreeShow === true"
            src="../../../assets/tuceng-color.png"
            alt
          />
          <span style="display: block; font-size: 12px">图层</span>
        </div>
      </div>
      <!--  图例      -->
      <div class="legend-button" @click="showLegend">图例</div>
      <div class="legend-container">
        <legend-com v-if="isLegendVisible" @close="hideLegend"></legend-com>
      </div>
      <!--        行政单位-->
      <div class="dan-wei-box">
        <dan-wei ref="danWeiRef" @change="danWeiChange"></dan-wei>
        <dan-wei-sg v-if="isSenGong" @change="danWeiChangeBySg"></dan-wei-sg>
      </div>
      <!-- 样地弹框-->
      <div id="yangdi-detail" v-show="tableData.length > 0">
        <el-table height="100" :data="tableData" style="width: 300px">
          <el-table-column align="center" prop="bianhao" label="编号">
          </el-table-column>
          <el-table-column
            align="center"
            prop="status"
            :formatter="formatterStatus"
            label="状态"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<!--<script src="./index.js"></script>-->
<script>
import Map from "ol/Map";
import View from "ol/View";
import {
  VectorTile as VectorTileLayer,
  Tile as TileLayer,
  Vector as VectorLayer,
} from "ol/layer";
import WMTS from "ol/source/WMTS";
import WMTSGrid from "ol/tilegrid/WMTS";
import { get as getProj } from "ol/proj";
import * as olProj from "ol/proj";
import XYZ from "ol/source/XYZ";
import "ol/ol.css";
import MousePosition from "ol/control/MousePosition";
import { format, createStringXY } from "ol/coordinate";
import { Stroke, Style, Circle as CircleStyle } from "ol/style";
import Overlay from "ol/Overlay";
import { getTopLeft, getWidth } from "ol/extent";
import Fill from "ol/style/Fill";
import Feature from "ol/Feature";
import danWei from "@/components/common/danwei/danwei";
import danWeiSg from "@/components/common/danwei/danweiSg";
import LineString from "ol/geom/LineString";
import Polygon from "ol/geom/Polygon";
import { getMapDataOfDaYangDi } from "./api";
import { createXYZ } from "ol/tilegrid";
import Storage from "@/common/storage";
import TileWMS from "ol/source/TileWMS";
import { ScaleLine, FullScreen, Control } from "ol/control";
import {
  Vector as VectorSource,
  VectorTile as VectorTileSource,
} from "ol/source";
import { GeoJSON, MVT } from "ol/format";
import Draw from "ol/interaction/Draw";
import { unByKey } from "ol/Observable";
import { getArea, getLength } from "ol/sphere";
import { easeOut } from "ol/easing";
import LegendCom from "@/pages/map/map-query/legend/LegendCom";
import { statusMap } from "@/common/baseData";
import { isSenGongFn } from "@/common/util";
import { cloneDeep } from "lodash";

const MeasureControl = (function (Control) {
  function MeasureControl(options) {
    var button = document.createElement("button");
    button.innerHTML = options.text;
    button.title = options.tooltip;
    var element = document.createElement("div");
    element.className =
      "ol-measure ol-unselectable ol-control " + options.className;
    element.appendChild(button);

    Control.call(this, {
      element: element,
      target: options.target,
    });

    button.addEventListener("click", options.click, false);
  }

  if (Control) {
    Object.setPrototypeOf(MeasureControl, Control);
  }
  MeasureControl.prototype = Object.create(Control && Control.prototype);
  MeasureControl.prototype.constructor = MeasureControl;
  return MeasureControl;
})(Control);

const treeDataType = {
  // 行政界线
  sheng: "sheng",
  shi: "shi",
  xian: "xian",
  //内蒙森工边界
  sgbj: "sgbj",
  // 基础信息
  jumindi: "jumindi",
  shuixi: "shuixi",
  // 资源分布
  senlin: "senlin",
  // 样地
  yangdi: "yangdi",
  biaozhundiqiaomu: "biaozhundiqiaomu",
  biaozhundiguanmu: "biaozhundiguanmu",
  dayangdi: "dayangdi",
  //网格瓦片
  colrow: "wangge",
};

const tileLayers = [
  treeDataType.colrow,
  treeDataType.sheng,
  treeDataType.shi,
  treeDataType.xian,
  treeDataType.jumindi,
  treeDataType.shuixi,
  treeDataType.senlin,
  treeDataType.biaozhundiguanmu,
  treeDataType.biaozhundiqiaomu,
  treeDataType.dayangdi,
  treeDataType.sgbj,
];

export default {
  data() {
    const projectionExtent = getProj("EPSG:4326").getExtent();
    const size = getWidth(projectionExtent) / 256;
    const resolutions = [];
    for (var z = 2; z < 19; ++z) {
      resolutions[z] = size / Math.pow(2, z);
    }

    const dxImg = require("./map-img/di-xing-x.png");
    const wxImg = require("./map-img/wei-xing-x.png");
    const dtImg = require("./map-img/di-tu.png");
    return {
      resolutions,
      projectionExtent,
      isSenGong: isSenGongFn(),
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
      activeLayer: "地图",
      homeMapStyle: {
        width: "100%",
        height: window.innerHeight - 140 + "px",
      },
      drawVectors: [],
      mapConfig: {},
      leftTreeShow: false,
      mapQuery: "",
      tableData: [],
      treeDataNew: [
        {
          id: 1,
          label: "行政边界",
          children: [
            {
              id: 2,
              type: treeDataType.colrow,
              label: "行政边界",
              icon: "el-icon-my-xing-zheng-sheng",
            },
          ],
        },
        {
          id: 5,
          label: "基础信息",
          children: [
            {
              id: 6,
              type: treeDataType.jumindi,
              label: "居民地",
              icon: "el-icon-my-ju-min-di",
            },
            {
              id: 7,
              type: treeDataType.shuixi,
              label: "水系",
              icon: "el-icon-my-shui-xi",
            },
          ],
        },
        {
          id: 8,
          label: "资源分布",
          children: [
            {
              id: 9,
              type: treeDataType.senlin,
              label: "森林分布",
              icon: "el-icon-my-sen-lin-fen-bu",
            },
          ],
        },
        {
          id: 9,
          label: "样地",
          type: treeDataType.yangdi,
          children: [
            {
              id: 10,
              type: treeDataType.biaozhundiqiaomu,
              label: "乔木林标准地",
              icon: "el-icon-my-biao-zhun-di-qiao-mu",
            },
            {
              id: 11,
              type: treeDataType.biaozhundiguanmu,
              label: "灌木林标准地",
              icon: "el-icon-my-biao-zhun-di-guan-mu",
            },
            {
              id: 12,
              type: treeDataType.dayangdi,
              label: "大样地",
              icon: "el-icon-my-da-yang-di",
            },
          ],
        },
      ],
      initTrue: false,
      daYangDiFeatureArr: [],
      biaoZhunDiGuanMuFeatureArr: [],
      biaoZhunDiQiaoMuFeatureArr: [],
      treeCheckEdArr: [],
      treeCheckRowData: [],
      isLegendVisible: false,
      mapSource: null,
      mapVector: null,
    };
  },
  components: {
    danWei,
    danWeiSg,
    LegendCom,
  },
  destroyed() {
    // 恢复浏览器右键事件
    document.oncontextmenu = function () {
      return true;
    };
  },
  async mounted() {
    if (this.isSenGong) {
      let copyTreeDataNew = cloneDeep(this.treeDataNew);
      copyTreeDataNew[0].children.push({
        id: 3,
        type: treeDataType.sgbj,
        label: "森工边界",
        icon: "el-icon-my-sgbj",
      });
      this.treeDataNew = copyTreeDataNew;
    }
    // 暂时屏蔽浏览器右键事件
    document.oncontextmenu = function () {
      return false;
    };

    this.initMap();

    await this.initData(Storage.get("fuserInfo").xzCode, true);

    this.initTrue = true;
  },
  methods: {
    formatterStatus(row) {
      return statusMap[+row.status] || "未知状态";
    },
    // 行政单位变更回调
    danWeiChange(value) {
      console.log("change");
      console.log(value);
      if (!value.cfrcode) {
        this.map.getView().setCenter([116.39973879, 40.00582361]);
        this.map.getView().setZoom(4);
        return false;
      }
      if (this.initTrue) {
        this.map.getView().setCenter([value.lon, value.lat]);
        this.map.getView().setZoom(12);
        // 清空数据源
        // this.mapSource.clear();
        this.initData(value.cfrcode ? value.cfrcode : 0);
      } else {
        this.map.getView().setCenter([value.lon, value.lat]);
        this.map.getView().setZoom(12);
      }
    },
    // 行政单位森工变更回调
    danWeiChangeBySg(value) {
      console.log("change");
      console.log(value);
      if (!value.c_frcode) {
        this.map.getView().setCenter([116.39973879, 40.00582361]);
        this.map.getView().setZoom(4);
        return false;
      }
      if (this.initTrue) {
        this.map.getView().setCenter([value.lon, value.lat]);
        this.map.getView().setZoom(12);
        // 清空数据源
        // this.mapSource.clear();
        this.initData(value.c_frcode ? value.c_frcode : 0);
      } else {
        this.map.getView().setCenter([value.lon, value.lat]);
        this.map.getView().setZoom(12);
      }
    },
    async initData(xzCode) {
      const isXzCode = xzCode && String(xzCode) !== "null";
      // 旧数据处理
      if (this.daYangDiLayer) {
        this.daYangDiLayer.getSource().clear();
        this.daYangDiFeatureArr = [];
        this.map.removeLayer(this.daYangDiLayer);
      }
      if (this.biaoZhunDiGuanMuLayer) {
        this.biaoZhunDiGuanMuLayer.getSource().clear();
        this.biaoZhunDiGuanMuFeatureArr = [];
        this.map.removeLayer(this.biaoZhunDiGuanMuLayer);
      }
      if (this.biaoZhunDiQiaoMuLayer) {
        this.biaoZhunDiQiaoMuLayer.getSource().clear();
        this.biaoZhunDiQiaoMuFeatureArr = [];
        this.map.removeLayer(this.biaoZhunDiQiaoMuLayer);
      }

      // 新数据处理
      let daYangDiRes = await getMapDataOfDaYangDi(
        isXzCode
          ? { typeName: "dayangdi", xzCode: xzCode }
          : { typeName: "dayangdi" }
      );
      let biaoZhunDiQiaoMuRes = await getMapDataOfDaYangDi(
        isXzCode
          ? { typeName: "biaozhundi", xzCode: xzCode, type: "1" }
          : { typeName: "biaozhundi", type: "1" }
      );
      let biaoZhunDiGuanMuRes = await getMapDataOfDaYangDi(
        isXzCode
          ? { typeName: "biaozhundi", xzCode: xzCode, type: "2" }
          : { typeName: "biaozhundi", type: "2" }
      );

      this.daYangDiFeatureArr = this.makeFeatures(daYangDiRes);
      this.daYangDiLayer = new VectorLayer({
        zIndex: 42,
        source: new VectorSource({
          wrapX: false,
          features: this.daYangDiFeatureArr,
        }),
        style: new Style({
          fill: new Fill({
            color: "rgba(0, 202, 195, 0.5)",
          }),
          stroke: new Stroke({
            color: "rgba(0, 202, 195, 0.5)",
            width: 15,
          }),
        }),
      });

      this.biaoZhunDiGuanMuFeatureArr = this.makeFeatures(biaoZhunDiGuanMuRes);
      this.biaoZhunDiGuanMuLayer = new VectorLayer({
        zIndex: 41,
        source: new VectorSource({
          wrapX: false,
          features: this.biaoZhunDiGuanMuFeatureArr,
        }),
        style: new Style({
          fill: new Fill({
            color: "rgba(0, 0, 255, 0.5)",
          }),
          stroke: new Stroke({
            color: "rgba(0, 0, 255, 0.5)",
            width: 15,
          }),
        }),
      });

      this.biaoZhunDiQiaoMuFeatureArr = this.makeFeatures(biaoZhunDiQiaoMuRes);
      this.biaoZhunDiQiaoMuLayer = new VectorLayer({
        zIndex: 41,
        source: new VectorSource({
          wrapX: false,
          features: this.biaoZhunDiQiaoMuFeatureArr,
        }),
        style: new Style({
          fill: new Fill({
            color: "rgba(134,31,160,0.5)",
          }),
          stroke: new Stroke({
            color: "rgba(134,31,160,0.5)",
            width: 15,
          }),
        }),
      });
      this.treeCheckRowData.map((item) => {
        console.log(item);
        this.treeNodeClick(item, true);
      });
      console.log("test", this.treeCheckRowData);
    },
    // 根据api获取res数据 绑定地图
    makeFeatures(res) {
      let featureArr = [];
      for (let index = 0; index < res.features.length; index++) {
        const element = res.features[index];
        let obj;
        obj = new Feature({
          geometry: new Polygon(element.geometry.coordinates),
          name: "Polygon",
          row: element.properties,
          population: 4000,
          rainfall: 500,
        });

        obj.setId(`${element.properties.bianhao}`);
        featureArr.push(obj);
      }
      return featureArr;
    },
    // 地图初始化
    initMap() {
      // 国界线
      this.countryWms = new TileLayer({
        source: new TileWMS({
          // 未发布
          url: `${process.env.VUE_APP_MAP_VIEW}/cite/wms`,
          params: {
            layers: "cite:guojie",
            version: "1.1.0",
          },
          serverType: "geoserver",
        }),
        zIndex: 6,
      });
      // 水系
      this.shuiXiWms = new TileLayer({
        source: new TileWMS({
          // 未发布
          url: `${process.env.VUE_APP_MAP_VIEW}/cite/wms`,
          params: {
            layers: "cite:senlinziyuan_shuixi",
            version: "1.1.0",
          },
          // serverType: 'geoserver'
        }),
        zIndex: 20,
      });
      // 居民地
      this.juMinDiWms = new TileLayer({
        source: new TileWMS({
          // 未发布
          url: `${process.env.VUE_APP_MAP_VIEW}/cite/wms`,
          params: {
            layers: "cite:senlinziyuan_jumindi",
            version: "1.1.0",
          },
          // serverType: 'geoserver'
        }),
        zIndex: 21,
      });
      // 森林分布
      this.senLinXiWms = new TileLayer({
        source: new TileWMS({
          // 未发布
          url: `${process.env.VUE_APP_MAP_VIEW}/cite/wms`,
          params: {
            layers: "cite:senlinziyuan_lindi",
            version: "1.1.0",
          },
          serverType: "geoserver",
        }),
        zIndex: 22,
      });

      // 森工边界
      this.vectorSgbj = new TileLayer({
        source: new TileWMS({
          // 未发布
          url: `${process.env.VUE_APP_MAP_VIEW}/cite/wms`,
          params: {
            layers: "cite:neimeng_boundary",
            version: "1.1.0",
          },
          serverType: "geoserver",
        }),
        zIndex: 23,
      });

      //MVT
      // color: "rgba(207,207,207,1)",
      this.country = new Style({
        stroke: new Stroke({
          color: "rgba(169, 162, 174,1)",
          width: 2,
        }),
        fill: new Fill({
          color: "rgba(233, 229, 216,0)",
        }),
      });

      this.newCountry = new Style({
        stroke: new Stroke({
          color: "rgba(207,207,207,1)",
          width: 2,
        }),
        fill: new Fill({
          color: "rgba(233, 229, 216,0)",
        }),
      });
      this.vector4326 = new VectorTileLayer({
        // 矢量切片的数据源
        source: new VectorTileSource({
          projection: "EPSG:4326",
          format: new MVT({
            idProperty: "iso_a3",
          }),
          tileGrid: createXYZ({
            extent: olProj.get("EPSG:4326").getExtent(),
            maxZoom: 22,
          }),
          // 矢量切片服务地址
          tileUrlFunction: (tileCoord) => {
            if (
              this.map.getView().getZoom() &&
              this.map.getView().getZoom() >= 5
            ) {
              return `https://fxpc.mem.gov.cn/data_preparation/39699eaf-2ebd-42fe-8553-de3ac44cac9b/161ba32a-106e-4197-a4e3-cd9f1ac5a6db/geoc?geokey=AB0EC656D56BD380345A16C87D539C6C&tilecol=${
                tileCoord[1]
              }&tilerow=${tileCoord[2]}&tileMatrix=${
                tileCoord[0] - 1
              }&code=00&issimple=false`;
            }
          },
        }),
        style: this.country,
      });

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
        target: document.getElementById("homeMap"),
        view: new View({
          // center: [108.5525, 34.3227],
          center: [116.39973879, 40.00582361],
          zoom: 4,
          // minZoom: 7,
          // maxZoom: 14,
          projection: "EPSG:4326",
        }),
      });
      this.map.addLayer(this.countryWms);

      this.mapSource = new VectorSource({ wrapX: false });

      // 主页地图主要层级
      this.mapVector = new VectorLayer({
        source: this.mapSource,
      });
      this.map.addLayer(this.mapVector);

      this.map.on("singleclick", async (e) => {
        if (this.draw) {
          return;
        }
        if (this.yangdiOverlay) {
          this.map.removeOverlay(this.yangdiOverlay);
        }
        let features = this.map.getFeaturesAtPixel(e.pixel);
        console.log(99);
        console.log(features);
        if (features.length > 0) {
          this.tableData = features.map((v) => {
            return v.values_.row;
          });
          if (!this.yangdiOverlay) {
            this.yangdiOverlay = new Overlay({
              element: document.getElementById("yangdi-detail"),
              offset: [15, 0],
              positioning: "center-left",
            });
          }
          this.yangdiOverlay.setPosition(e.coordinate);
          this.map.addOverlay(this.yangdiOverlay);
        }
      });

      // 设置搜索功能
      // eslint-disable-next-line no-undef
      var ac = new BMap.Autocomplete({
        // 建立一个自动完成的对象
        input: "mapQueryId",
        location: this.map,
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

        value = "";
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
        console.log(e);
        console.log(e);
        this.search(myValue);
      });

      this.initRadio();
      this.addScaleLine();
      this.addFullScreenControl();
      this.addLineControl();
      this.addShapeControl();
      this.addClearControl();
      this.addMousePositionControl();
      this.listenZoomChange();
    },
    // 根据坐标汉字查询
    mapQueryClick() {
      // eslint-disable-next-line no-invalid-regexp
      let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      if (reg.test(this.mapQuery)) {
        this.search(this.mapQuery);
      } else if (this.mapQuery) {
        const arr = this.mapQuery.split(",");
        this.map.getView().setZoom(10);
        this.map.getView().setCenter(arr);
        // this.setDanWeiXzCodeByXy(true, arr);
      }
    },
    search(value) {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-undef
        let geocoder = new T.Geocoder();
        geocoder.getPoint(value, (result) => {
          let xy = [
            result.getLocationPoint().lng,
            result.getLocationPoint().lat,
          ];
          this.map.getView().setZoom(10);
          this.map.getView().setCenter(xy);
          // this.setDanWeiXzCodeByXy(true, xy);
          resolve(true);
        });
      });
    },
    // 切换图层
    mapNavImgClick(data, key) {
      this.activeLayer = data.name;
      //影像地图 边界变亮
      if (
        this.activeLayer === "风险普查0.8米影像" ||
        this.activeLayer === "风险普查影像底图" ||
        this.activeLayer === "天地图卫星"
      ) {
        this.vector4326.setStyle(this.newCountry);
      } else {
        this.vector4326.setStyle(this.country);
      }
      // dUrl 图形url bUrl 标注Url
      const { dUrl, bUrl } = data;

      let img =
        data.type === "fxpc"
          ? new TileLayer({
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
            })
          : new TileLayer({
              source: new XYZ({
                url: dUrl,
              }),
            });
      this.map.getLayers().setAt(1, img);
      if (bUrl) {
        this.map.removeLayer(this.mapConfig.mapMark);
        this.map.removeLayer(this.mapConfig.mapText);
        this.mapConfig.mapText =
          data.type === "fxpc"
            ? new TileLayer({
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
                    matrixIds: [
                      0,
                      1,
                      2,
                      3,
                      4,
                      5,
                      6,
                      7,
                      8,
                      9,
                      10,
                      11,
                      12,
                      13,
                      14,
                    ],
                  }),
                }),
              })
            : new TileLayer({
                source: new XYZ({
                  url: bUrl,
                }),
              });
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
    },
    // 初始加載map調用
    initRadio() {
      const htmlCollection = document.getElementsByClassName(
        "tdt-iconLayers-layerCheckIcon"
      );
      for (let index = 0; index < htmlCollection.length; index++) {
        const element = htmlCollection[index];
        if (index === 2) {
          element.style.background =
            "url(http://api.tianditu.com/v4.0/image/map/maptype/check.png) 4px 4px no-repeat #fff";
        } else {
          element.style.background = "";
        }
      }
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
    flyTo({ center, zoom = 7 }) {
      this.map.getView().animate({
        center: center,
        duration: 1000,
        zoom: zoom,
        easing: easeOut,
      });
    },
    // 图层菜单
    treeNodeClick(row, checked) {
      console.log("1110", "index.vue", "treeNodeClick", row, checked);
      let arr = [];
      switch (row.type) {
        case treeDataType.colrow:
          // 网格
          arr = this.vector4326;
          break;
        case treeDataType.sgbj:
          // 森工边界
          arr = this.vectorSgbj;
          break;

        case treeDataType.jumindi:
          // 居民地
          arr = this.juMinDiWms;
          break;
        case treeDataType.shuixi:
          // 水系
          arr = this.shuiXiWms;
          break;
        case treeDataType.senlin:
          // 森林
          arr = this.senLinXiWms;
          break;
        case treeDataType.dayangdi:
          arr = this.daYangDiLayer;
          break;
        case treeDataType.biaozhundiguanmu:
          arr = this.biaoZhunDiGuanMuLayer;
          break;
        case treeDataType.biaozhundiqiaomu:
          arr = this.biaoZhunDiQiaoMuLayer;
          break;
        default:
          break;
      }

      if (tileLayers.includes(row.type)) {
        let treeRowIndex = this.treeCheckRowData.indexOf(row);
        if (checked) {
          this.map.addLayer(arr);
          this.treeCheckEdArr.push(row.id);
          if (treeRowIndex === -1) {
            this.treeCheckRowData.push(row);
          }
        } else {
          if (treeRowIndex !== -1) {
            this.treeCheckRowData.splice(treeRowIndex, 1);
          }
          this.map.removeLayer(arr);
          for (let index = 0; index < this.treeCheckEdArr.length; index++) {
            const element = this.treeCheckEdArr[index];
            if (element === row.id) {
              this.treeCheckEdArr.splice(index, 1);
            }
          }
        }
      }
    },
    treeChildClick(row) {
      console.log("1907", "index.vue", "treeChildClick", row);
    },
    treeRender(h, { node, data }) {
      return (
        <span class="custom-tree-node">
          <span>
            <i class={data.icon}></i>
            {node.label}
          </span>
        </span>
      );
    },
    // zoom
    listenZoomChange() {
      this.map.getView().on("change:resolution", this.zoomDidChange);
    },
    zoomDidChange() {
      if (this.treeCheckEdArr.includes(4)) {
        if (this.map.getView().getZoom() >= 7) {
          this.map.removeLayer(this.xianWms);
          this.map.addLayer(this.xianWms);
        } else {
          this.map.removeLayer(this.xianWms);
        }
      }
    },
    // 点线面
    measureLine() {
      this.addInteraction("LineString");
    },
    measureArea() {
      this.addInteraction("Polygon");
    },
    measureCancle() {
      if (this.drawVectors && this.drawVectors.length > 0) {
        for (let drawVector of this.drawVectors) {
          this.map.removeLayer(drawVector);
        }
      }
      if (this.draw) {
        this.map.removeInteraction(this.draw);
      }
      let doms = document.getElementsByClassName(
        "ol-tooltip ol-tooltip-static"
      );
      for (let dom of doms) {
        dom.innerHTML = null;
      }
      this.helpTooltipElement.innerHTML = null;
      this.measureTooltipElement.innerHTML = null;
      this.map.removeOverlay(this.helpTooltip);
      this.map.removeOverlay(this.measureTooltip);
    },
    addInteraction(type) {
      this.map.removeInteraction(this.draw);
      let source = new VectorSource();
      let drawVector = new VectorLayer({
        source: source,
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
      this.drawVectors.push(drawVector);
      this.map.addLayer(drawVector);
      this.draw = new Draw({
        source: source,
        type: type,
        style: new Style({
          fill: new Fill({
            color: "rgba(255, 255, 255, 0.2)",
          }),
          stroke: new Stroke({
            color: "rgba(0, 0, 0, 0.5)",
            lineDash: [10, 10],
            width: 2,
          }),
          image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
              color: "rgba(0, 0, 0, 0.7)",
            }),
            fill: new Fill({
              color: "rgba(255, 255, 255, 0.2)",
            }),
          }),
        }),
      });
      let sketch;
      let pointerMoveHandler = (evt) => {
        if (evt.dragging) {
          return;
        }
        if (!this.draw) {
          return;
        }
        /** @type {string} */
        var helpMsg = "单击选择起点";

        if (sketch) {
          helpMsg = "单击继续,双击结束";
        }

        this.helpTooltipElement.innerHTML = helpMsg;
        this.helpTooltip.setPosition(evt.coordinate);

        this.helpTooltipElement.classList.remove("hidden");
      };
      let that = this;
      this.map.addInteraction(this.draw);
      this.map.on("pointermove", pointerMoveHandler);

      this.map.getViewport().addEventListener("mouseout", function () {
        that.helpTooltipElement.classList.add("hidden");
      });

      this.createMeasureTooltip();
      this.createHelpTooltip();

      var listener;

      this.draw.on("drawstart", function (evt) {
        // set sketch
        sketch = evt.feature;

        /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
        var tooltipCoord = evt.coordinate;

        listener = sketch.getGeometry().on("change", function (evt) {
          var geom = evt.target;
          var output;
          if (geom instanceof Polygon) {
            output = that.formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof LineString) {
            output = that.formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
          }
          that.measureTooltipElement.innerHTML = output;
          that.measureTooltip.setPosition(tooltipCoord);
        });
      });

      this.draw.on("drawend", function () {
        that.measureTooltipElement.className = "ol-tooltip ol-tooltip-static";
        that.measureTooltip.setOffset([0, -7]);
        // unset sketch
        sketch = null;
        // unset tooltip so that a new one can be created
        that.measureTooltipElement = null;
        that.createMeasureTooltip();
        unByKey(listener);
      });
    },
    formatLength(line) {
      var length = getLength(line, { projection: "EPSG:4326" });
      var output;
      if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + " " + "km";
      } else {
        output = Math.round(length * 100) / 100 + " " + "m";
      }
      return output;
    },
    formatArea(polygon) {
      let area = getArea(polygon, { projection: "EPSG:4326" });
      let perimeter = getLength(polygon, { projection: "EPSG:4326" });
      let areaUnit = "m<sup>2</sup>";
      let perimeterUnit = "m";

      if (area > 10000) {
        area = Math.round((area / 1000000) * 100) / 100;
        areaUnit = "km<sup>2</sup>";
      }
      if (perimeter > 1000) {
        perimeter = (perimeter / 1000).toFixed(2);
        perimeterUnit = "km";
      }

      return (
        "面积：" + area + areaUnit + "<br/>周长：" + perimeter + perimeterUnit
      );
    },
    createMeasureTooltip() {
      if (this.measureTooltipElement) {
        this.measureTooltipElement.parentNode.removeChild(
          this.measureTooltipElement
        );
      }
      this.measureTooltipElement = document.createElement("div");
      this.measureTooltipElement.className = "ol-tooltip ol-tooltip-measure";
      this.measureTooltip = new Overlay({
        element: this.measureTooltipElement,
        offset: [0, -15],
        positioning: "bottom-center",
      });
      this.map.addOverlay(this.measureTooltip);
    },
    createHelpTooltip() {
      if (this.helpTooltipElement) {
        this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
      }
      this.helpTooltipElement = document.createElement("div");
      this.helpTooltipElement.className = "ol-tooltip hidden";
      this.helpTooltip = new Overlay({
        element: this.helpTooltipElement,
        offset: [15, 0],
        positioning: "center-left",
      });
      this.map.addOverlay(this.helpTooltip);
    },
    // 图例
    hideLegend() {
      this.isLegendVisible = false;
    },
    showLegend() {
      this.isLegendVisible = true;
    },
    // map control
    addScaleLine() {
      const scaleLineControl = new ScaleLine({
        units: "metric",
      });
      this.map.addControl(scaleLineControl);
    },
    addLineControl() {
      const control = new MeasureControl({
        text: "线",
        click: this.measureLine,
        className: "measure-line",
        tooltip: "测长度",
      });
      this.map.addControl(control);
    },
    addShapeControl() {
      const control = new MeasureControl({
        text: "面",
        click: this.measureArea,
        className: "measure-area",
        tooltip: "测面积",
      });
      this.map.addControl(control);
    },
    addClearControl() {
      const control = new MeasureControl({
        text: "清",
        click: this.measureCancle,
        className: "measure-cancle",
        tooltip: "清除",
      });
      this.map.addControl(control);
    },
    addFullScreenControl() {
      const control = new FullScreen({});
      this.map.addControl(control);
    },
    addMousePositionControl() {
      let mousePositionControl = new MousePosition({
        coordinateFormat: function (coordinate) {
          return format(
            coordinate,
            `经度:${coordinate[0].toFixed(6)}  纬度:${coordinate[1].toFixed(6)}`
          );
        },
        className: "custom-mouse-position",
        target: document.getElementById("mouse-position"),
        undefinedHTML: "",
      });
      this.map.addControl(mousePositionControl);
    },
  },
  beforeDestroy: () => {},
  watch: {},
};
</script>
<style lang="stylus">
#mouse-position .custom-mouse-position {
  display: inline-block;
  color: white;
}

.ol-scale-line {
  // bottom: 35px;
}

.ol-measure {
  left: 0.5em;
}

.measure-line {
  top: 4.2em;
}

.measure-area {
  top: 5.9em;
}

.measure-cancle {
  top: 7.6em;
}
</style>

<style lang="stylus" scoped>
.map-box {
  position: relative;
}

#mouse-position {
  // width: 100%;
  right: 0;
  position: absolute;
  line-height: 32px;
  height: 32px;
  bottom: 0;
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

.map-change {
  position: absolute;
  bottom: 200px;
  right: 30px;
}

.left300 {
  margin-left: 320px;
}

.map-query-box {
  position: absolute;
  top: 11px;
  left: 40px;
}

.map-nav-right-img {
  position: absolute;
  bottom: 50px;
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
  box-shadow: 0 0 5px 3px #2d885f;
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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  top: -42px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 12px;
}

.map-nav-left-box {
  width: 60px;
  padding-top: 14px;
  background-color: white;
  position: absolute;
  left: 15px;
  top: 380px;
  text-align: center;
  padding-bottom: 10px;
}

.map-nav-left-box-child-div {
  cursor: pointer;
}

.map-nav-left-box2 {
  width: 60px;
  padding-top: 14px;
  position: absolute;
  left: 30px;
  top: 100px;
  text-align: center;
  padding-bottom: 10px;
}

.map-nav-left-box2 .map-nav-left-box-child-div .text {
  background-color: #fff;
  line-height: 40px;
  margin: 10px 0;
  width: 40px;
  font-size: 28px;
}

.map-nav-left-tree {
  width: 250px;
  height: calc(100% - 45px);
  position: absolute;
  background-color: white;
  /* left: 75px; */
  left: 350px;
  top: 12px;
}

.map-nav-left-tree-title {
  line-height: 40px;
  color: white;
  text-align: center;
  background-color: #549E5A;
}

.map-nav-left-tree-jiantou {
  position: absolute;
  left: 250px;
  top: 50%;
  cursor: pointer;
}

.dan-wei-box {
  position: absolute;
  top: 11px;
  right: 30px;
}

.legend-button {
  position: absolute;
  left: 10px;
  bottom: 40px;
  background-color: rgba(255, 255, 255, 1);
  width: 40px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 12px;
  border-radius: 2px;
  border: #3980c9 solid 1px;
  cursor: pointer;
}

.legend-button:hover {
  background-color: #eeeeee;
}

.legend-container {
  position: absolute;
  left: 10px;
  bottom: 40px;
}
</style>
