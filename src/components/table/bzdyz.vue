<!--标准地因子调查记录表-->
<!--mark - html -->
<template>
  <div class="c-table">
    <div class="flex-row pd15">
      <info-item label="调查员" :value="creationName" />
      <info-item label="调查日期" :value="creationTime" />
    </div>
    <table border="1" rules="all" border-collapse="collapse" width="100%">
      <colgroup>
        <col span="1" />
        <col span="1" />
        <col span="8" />
      </colgroup>
      <!--            1-->
      <tr>
        <td colspan="2" class="info-title">项目</td>
        <td class="info-value">记录内容</td>
      </tr>
      <!--            2-->
      <tr>
        <td colspan="2" class="info-title">样地编号</td>
        <td>{{ ydbh }}</td>
      </tr>
      <!--            3-->
      <tr>
        <td colspan="2" class="info-title">地理范围</td>
        <td>
          <geography-info :data="objData" />
        </td>
      </tr>
      <!--            4-->
      <tr>
        <td colspan="2" class="info-title">模型所属分区</td>
        <td>
          <div class="flex-row">
            <info-item label="植被区域" :value="objData.qiHouQu" />
            <info-item label="地类" :value="objData.diLei" />
            <info-item
              label="是否为一类样地"
              :value="
                objData.isYilei === '1'
                  ? '是'
                  : objData.isYilei === '2'
                  ? '否'
                  : '未知'
              "
            />
          </div>
        </td>
      </tr>
      <!--            5-->
      <tr>
        <td colspan="2" class="info-title">样地面积及形状</td>
        <td>
          <div class="flex-row">
            <info-item label="面积" unit="m2" :value="objData.ydMj" />
            <info-item label="规格（方形、矩形或圆形）" :value="objData.ydGg" />
          </div>
        </td>
      </tr>
      <!--            6-->
      <tr>
        <td rowspan="10" class="info-title">环境因子</td>
        <td rowspan="2" class="info-title">地貌类型</td>
        <td>
          <div class="flex-row">
            <info-item label="地貌" :value="objData.diMao" />
            <info-item label="海拔" :value="objData.haiBa" />
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="flex-row">
            <info-item label="坡度" :value="objData.poDu" />
            <info-item label="坡向" :value="objData.poXiang" />
            <info-item label="坡位" :value="objData.poWei" />
          </div>
        </td>
      </tr>
      <tr>
        <td rowspan="6" class="info-title">植被特征</td>
        <td>
          <div class="flex-row">
            <template v-if="type === '1'">
              <info-item label="植被类型：" :value="objData.senLinLx" />
            </template>
            <template v-else>
              <info-item label="森林类型：" :value="objData.senLinLx" />
            </template>
            <info-item label="群落类型：" :value="objData.qunluoLx" />
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <info-item
            label="优势树种(组)"
            :value="objData.youShiSz"
            :isMarkFill="
              isIncludeString(objData.yonghutianxie, 'bzdyz_youShiSzbm')
            "
          />
        </td>
      </tr>
      <tr>
        <td>
          <div class="flex-row">
            <info-item label="郁闭度" :value="objData.yuBiDu" />
            <info-item
              v-if="type === '1'"
              label="林分密度（株/公顷）"
              :value="objData.linFenMd"
              :isMarkFill="
                isIncludeString(objData.yonghutianxie, 'bzdyz_linFenMd')
              "
            />
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="flex-row">
            <info-item label="平均树高" unit="m" :value="objData.pingjunSg" />
            <!--乔木林填平均胸径，灌木林填平均地径-->
            <template v-if="type === '1'">
              <info-item
                label="平均胸径"
                unit="cm"
                :value="objData.pingjunXj"
                :isMarkFill="
                  isIncludeString(objData.yonghutianxie, 'bzdyz_pingjunXj')
                "
              />
              <info-item
                label="平均胸径修改原因"
                :value="objData.pjxjModifyReason"
              />
            </template>
            <info-item
              v-if="type === '2'"
              label="平均地径"
              unit="cm"
              :value="objData.pingjunDj"
            />
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="flex-row">
            <info-item label="龄组" :value="objData.lingZu" />
            <info-item label="林龄（可选）" :value="objData.linLing" />
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="flex-row">
            <info-item label="起源" :value="objData.qiYuan" />
            <info-item
              label="树种组成"
              :value="objData.szZc"
              :isMarkFill="isIncludeString(objData.yonghutianxie, 'bzdyz_szZc')"
            />
          </div>
        </td>
      </tr>
      <tr>
        <td rowspan="1" class="info-title">土壤</td>
        <td>
          <div class="flex-row">
            <info-item label="土壤类型" :value="objData.tuRangLx" />
            <info-item label="土壤亚类" :value="objData.tuRangYl" />
          </div>
        </td>
      </tr>
      <tr>
        <td rowspan="1" class="info-title">干扰情况</td>
        <td>
          <div class="flex-row">
            <info-item label="干扰类型" :value="objData.ganRaoLx" />
            <info-item label="干扰程度" :value="objData.ganRaoCd" />
            <info-item
              label="枯落物和腐殖质损失程度"
              :value="objData.klwFzzSscd"
            />
          </div>
        </td>
      </tr>
      <!--            mark -- 经管措施-->
      <tr>
        <td colspan="2" class="info-title">经营管理措施</td>
        <td class="info-value">{{ objData.jingYingGl }}</td>
      </tr>
      <!--            mark -- 备注-->
      <tr>
        <td colspan="2" class="info-title">备注</td>
        <td class="info-value">{{ objData.bz }}</td>
      </tr>
    </table>
    <dc-img-list :photo-list="dcPhotoList"></dc-img-list>
  </div>
</template>

<script>
// mark - script
import geographyInfo from "@/components/table/components/geographyInfo";
import tableMixin from "@/components/table/tableMixin";
import DcImgList from "@/components/table/components/dcImgList";
import { isIncludeString } from "@/common/baseFunction";
export default {
  name: "bzdyz",
  mixins: [tableMixin],
  props: {
    type: {
      type: String,
      default: "1",
    },
  },
  // mark -- data
  data() {
    return {};
  },
  // mark -- methods
  methods: {
    isIncludeString,
  },
  // mark -- computed
  computed: {},
  // mark -- mounted
  mounted() {},
  components: {
    DcImgList,
    geographyInfo,
  },
};
</script>
<!--mark - css -->
<style scoped lang="stylus">
@import "table.styl"
</style>
