<!--草原可燃物样地基本特征调查表-->
<!--mark - html -->
<template>
  <div>
    <div class="c-table" v-for="(item, index) in arrData" :key="index">
      <div class="table-header" v-show="arrData.length > 1">
        草原可燃物样地基本特征调查表 {{ index + 1 }}
      </div>
      <table border="1" rules="all" border-collapse="collapse" width="100%">
        <colgroup>
          <col width="16.6%" />
          <col width="16.6%" />
          <col width="16.6%" />
          <col width="16.6%" />
          <col width="16.6%" />
          <col width="16.6%" />
        </colgroup>
        <!--            1-->
        <tr>
          <td class="info-title">样地编号</td>
          <td>{{ item.ydBh | formatValue }}</td>
          <td class="info-title">样地面积(公顷)</td>
          <td>{{ item.ydMj | formatValue }}</td>
          <td class="info-title">样地规格</td>
          <td>{{ item.ydGg | formatValue }}</td>
        </tr>
        <tr>
          <td class="info-title">样地类型</td>
          <td colspan="5">{{ type.label }}</td>
        </tr>
        <tr>
          <td class="info-title">监测类型</td>
          <td colspan="2">{{ item.jcLx | formatValue }}</td>
          <td class="info-title">是否有禁牧小区</td>
          <td colspan="2">{{ item.isJinmu | formatValue }}</td>
        </tr>
        <!--            2-->
        <tr>
          <td class="info-title" rowspan="2">样地定位</td>
          <td colspan="5">
            <div class="flex-row">
              <info-item label="经度" :value="item.lon" />
              <info-item label="纬度" :value="item.lat" />
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <div class="flex-row">
              <info-item label="横坐标" :value="item.x" />
              <info-item label="纵坐标" :value="item.y" />
            </div>
          </td>
        </tr>
        <!--            4-->
        <tr>
          <td class="info-title">地区</td>
          <td class="info-title" colspan="5">
            <div class="flex-row">
              <info-item label="省(市/自治区)" :value="item.sheng" />
              <info-item label="市" :value="item.shi" />
              <info-item label="县(旗、市)" :value="item.xian" />
              <info-item label="乡(镇、苏木)" :value="item.xiang" />
              <info-item label="村(嘎查）" :value="item.cun" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="info-title" rowspan="5">标志点与四至经纬度</td>
          <td class="info-title">标志点</td>
          <td colspan="2">
            <div class="flex-row">
              <info-item label="经度" :value="item.bzdLon" />
              <info-item label="纬度" :value="item.bzdLat" />
            </div>
          </td>
          <td class="info-title">海拔高度(m)</td>
          <td>{{ item.bzdHaiba | formatValue }}</td>
        </tr>
        <tr>
          <td class="info-title">四至-东</td>
          <td colspan="4">
            <div class="flex-row">
              <info-item label="经度" :value="item.sizhiDongLon" />
              <info-item label="纬度" :value="item.sizhiDongLat" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="info-title">四至-南</td>
          <td colspan="4">
            <div class="flex-row">
              <info-item label="经度" :value="item.sizhiNanLon" />
              <info-item label="纬度" :value="item.sizhiNanLat" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="info-title">四至-西</td>
          <td colspan="4">
            <div class="flex-row">
              <info-item label="经度" :value="item.sizhiXiLon" />
              <info-item label="纬度" :value="item.sizhiXiLat" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="info-title">四至-北</td>
          <td colspan="4">
            <div class="flex-row">
              <info-item label="经度" :value="item.sizhiBeiLon" />
              <info-item label="纬度" :value="item.sizhiBeiLat" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="info-title">草原类型</td>
          <td class="info-title">草原类</td>
          <td colspan="2">{{ item.cyL | formatValue }}</td>
          <td class="info-title">草原型</td>
          <td>{{ item.cyX | formatValue }}</td>
        </tr>
        <tr>
          <td class="info-title">地貌类型</td>
          <td colspan="5">{{ item.dxDm | formatValue }}</td>
        </tr>
        <tr>
          <td class="info-title">坡度</td>
          <td>{{ item.pd | formatValue }}</td>
          <td class="info-title">坡向</td>
          <td>{{ item.px | formatValue }}</td>
          <td class="info-title">坡位</td>
          <td>{{ item.pw | formatValue }}</td>
        </tr>
        <tr>
          <td class="info-title">土壤质地</td>
          <td colspan="5">{{ item.trzd | formatValue }}</td>
        </tr>
        <tr>
          <td class="info-title">灾害情况</td>
          <td colspan="5">{{ item.zhqk | formatValue }}</td>
        </tr>
        <tr></tr>
        <tr>
          <td class="info-title">地表有无季节性积水</td>
          <td colspan="5">{{ item.dbywJjxjs | formatValue }}</td>
        </tr>
        <tr>
          <td class="info-title">年平均降水量</td>
          <td colspan="5">{{ item.npjjsl | formatValue }}</td>
        </tr>
        <tr>
          <td class="info-title">利用方式</td>
          <td colspan="5">{{ item.lyFs | formatValue }}</td>
        </tr>
        <tr>
          <td class="info-title">利用状况</td>
          <td colspan="5">{{ item.lyZk | formatValue }}</td>
        </tr>
        <tr>
          <td class="info-title">其他描述</td>
          <td colspan="5">{{ item.qtms | formatValue }}</td>
        </tr>
      </table>
      <el-divider></el-divider>
      <photo-list :photoList="getPhotoList(item)"></photo-list>
    </div>
  </div>
</template>

<script>
// mark - script
import tableMixin from "@/components/table/tableMixin";
import { REGEXP_NUM_DIAN } from "@/common/unit";
import PhotoList from "@/components/table/components/photoList";
export default {
  name: "cyydjbtz",
  components: { PhotoList },
  mixins: [tableMixin],
  props: {
    type: {
      type: [Object, String],
      default: "1",
    },
  },
  // mark -- data
  data() {
    return {};
  },
  created() {},
  // mark -- methods
  methods: {
    getPhotoList(item) {
      return [
        {
          imgUrl: item.jgzDongImg,
          imgPre: `景观照片编号-东：`,
          imgBh: item.jgzDongImgBh,
        },
        {
          imgUrl: item.jgzXiImg,
          imgPre: `景观照片编号-西：`,
          imgBh: item.jgzXiImgBh,
        },
        {
          imgUrl: item.jgzNanImg,
          imgPre: `景观照片编号-南：`,
          imgBh: item.jgzNanImgBh,
        },
        {
          imgUrl: item.jgzBeiImg,
          imgPre: `景观照片编号-北：`,
          imgBh: item.jgzBeiImgBh,
        },
      ];
    },
  },
  // mark -- computed
  computed: {},
  // mark -- mounted
  mounted() {},
};
</script>
<!--mark - css -->
<style scoped lang="stylus">
@import "table.styl"
.table-header {
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 16px;
}
</style>
