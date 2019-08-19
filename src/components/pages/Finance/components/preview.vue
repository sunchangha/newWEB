<template>
<div>
<div class="header_view ">
    <!-- 测试用暂时隐藏 -->
    <!-- <div class="img"><img src="../../image/prouct-logo.png"></div> -->
    <!-- 这个之后删掉 -->
    <div class="img"><img src="logo1.png"></div>
    <div class="title-header">
        <span class="span01">[平安按途]全球理由保险</span>
        <span class="span02" id="name">
            <!--  <i>详情</i> -->
        </span>
    </div>
</div>

<div class="title-main">
    <div class="left-main">
        <span class="span01">七日年化</span>
        <span class="span02" id="interest">{{previewData.annualInterestRate}}%</span>
    </div>
    <div class="left-main">
        <span class="span01">产品期限</span>
        <span class="span02 left-main-active" id="day">{{previewData.productLife}}天</span>
    </div>
    <div class="title-main-tip">
        <span class="span01" id="risk">{{previewData.riskLevel===1?'低风险':'中等风险'}}</span>
        <span class="span02" id="profit">21万份收益</span>
    </div>
    <div class="step">
        <div class="step-loading"></div>
        <div class="radius"></div>
    </div>
    <div class="step-tip">
        <span class="span01" id="cast">已投金额:20000元</span>
        <span class="span02" id="surplus">剩余可投：999万元</span>
    </div>
</div>
<div class="main-bg"></div>
<!--产品信息-->
<div class="box01">
    <div class="box01-tit">
        <span class="span01">产品信息</span>
        <span class="span02">产看详情></span>
    </div>
    <div class="table">
        <table width="100%" border="1px" cellspacing="0" cellpadding="0">
            <tr align="center">
                <th class="table-bg">票据类型</th>
                <th>{{previewData.billType}}</th>
                <th class="table-bg">票面金额</th>
                <th class="table-active">{{previewData.faceAmount}}元</th>
            </tr>
            <tr align="center">
                <th class="table-bg">已投金额</th>
                <th class="table-active" id="invested">1000元</th>
                <th class="table-bg">产品金额</th>
                <th class="table-active" id="prducts">10000元</th>
            </tr>
            <tr align="center">
                <th class="table-bg">还款方式</th>
                <th id="method">{{previewData.paymentMethod}}</th>
                <th class="table-bg">发布时间</th>
                <th id="delivery">{{previewData.createTime | formatDate}}</th>
            </tr>
            <tr align="center">
                <th class="table-bg">剩余时间</th>
                 <th id="delivery">{{previewData.productEnd | formatDate}}</th>
            </tr>
        </table>
    </div>
    <!-- <div class="box01-footer">
        <span class="span01">交易规则</span>
        <span class="span02">></span>
    </div> -->
</div>
<div class="main-bg"></div>
<!--企业信息-->
<div class="box01">
    <div class="box01-tit">
        <span class="span01">企业信息</span>
    </div>
    <div class="table">
        <table width="100%" border="1px" cellspacing="0" cellpadding="0">
            <tr align="center">
                <th class="table-bg">企业名称</th>
                <th id="enterprise">{{previewData.merchantName}}</th>
                <th class="table-bg">企业规模</th>
                <th id="scale" style="width:50px;">{{previewData.enterpriseSize}}</th>
            </tr>
            <tr align="center">
                <th class="table-bg">法人代表人</th>
                <th id="person">{{previewData.legalPerson}}</th>
                <th class="table-bg">注册资本</th>
                <th id="capital">{{previewData.registeredCapital}}万元</th>
            </tr>
            <tr align="center">
                <th class="table-bg">企业地址</th>
                <th colspan="3" id="address">{{previewData.businessAddress}}</th>
            </tr>
        </table>
    </div>
</div>
<div class="main-bg"></div>
<!--常见问题-->
<div class="box02">
    <div class="box02-tit">
        <span class="span01">常见问题</span>
        <span class="span02">联系客服></span>
    </div>
    <div class="box02-content">
        <div class="box02-header">
            <i class="w">W</i>
            为什么买入一直没有收益？</div>
        <div class="box02-info">
            <i class="a">A</i>
            买入后的第1个交易日产生收益，第2个交易日可查看收益。
            周末及节假日不更新收益，期间的收益会在周末及节假日前
            一个交易日的收益量合并展示，在周末及节假日后的第一个
            交易日更新。

        </div>
    </div>
</div>
</div>
</template>
<script>
export default {
  name: "PreView",
  props: {
    previewData: Object
  },
  data() {
    return {};
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  },
  created() {
    console.log("previewData", this.previewData);
  },
  computed: {},
  methods: {}
};
</script>

<style scope>
.header_view {
  padding: 15px;
  height: 100%;
  background: #ffffff;
  overflow: hidden;
  border-bottom: 0.5px solid #eeeeee;
}

.img {
  width: 33px;
  height: 33px;
  background: red;
  float: left;
  margin-right: 10px;
}

.img img {
  width: 33px;
  height: 33px;
  display: block;
}

.title-header {
  height: 33px;
  float: left;
}

.title-header .span01 {
  color: #333333;
  font-size: 13px;
  font-weight: 500;
  display: block;
  height: 17px;
}

.title-header .span02 {
  color: #999999;
  font-size: 12px;
  font-weight: 500;
  display: block;
  height: 16px;
  line-height: 20px;
  overflow: hidden;
}

.span02 i {
  margin-left: 5px;
  color: #cc3333;
  padding-right: 20px;
  /* background: url("../../image/xia.png") no-repeat right center; */
  background-size: 13.5px 7.5px;
  font-style: normal;
}

.title-main {
  padding: 15px;
  height: 100%;
  background: #ffffff;
  overflow: hidden;
}

.left-main {
  float: left;
  height: 100%;
  display: inline-block;
  margin-right: 50px;
  overflow: hidden;
}

.left-main .span01 {
  color: #999999;
  font-size: 13px;
  height: 20px;
  line-height: 20px;
  font-weight: 500;
  display: block;
}

.left-main .span02 {
  color: #cc3333;
  font-size: 20px;
  font-weight: bold;
  display: block;
  height: 40px;
  line-height: 40px;
}

.left-main-active {
  color: #333333 !important;
}

.title-main-tip {
  width: 100%;
  height: 20px;
  line-height: 20px;
  margin: 20px 0;
  overflow: hidden;
  font-size: 12px;
}

.title-main-tip .span01 {
  display: inline-block;
  float: left;
  padding-left: 20px;
  /* background: url("../../image/prouct-dun.png") no-repeat left center; */
  background-size: 13px 15px;
  color: #666666;
  font-weight: 500;
}

.title-main-tip .span02 {
  display: inline-block;
  float: right;
  padding-left: 26px;
  /* background: url("../../image/prouct-shouyi.png") no-repeat left center; */
  background-size: 19px 12px;
  color: #666666;
  font-weight: 500;
}

.step {
  height: 4px;
  background: #eeeeee;
  position: relative;
}

.step-loading {
  height: 100%;
  width: 1%;
  background: #cc3333;
}

.radius {
  width: 12px;
  height: 12px;
  background: #cc3333;
  border-radius: 50%;
  position: absolute;
  top: -4px;
  left: 1%;
}

.step-tip {
  margin-top: 15px;
  width: 100%;
  height: 20px;
  line-height: 20px;
  font-size: 13px;
  color: #666666;
  font-weight: 500;
  overflow: hidden;
}

.step-tip .span01 {
  float: left;
}

.step-tip .span02 {
  float: right;
}

.main-bg {
  height: 7.5px;
  background: #eeeeee;
  overflow: hidden;
}

.box01 {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #ffffff;
}

.box01-tit {
  height: 41px;
  line-height: 41px;
  padding: 0 15px;
  border-bottom: 0.5px solid #eeeeee;
}

.box01-tit .span01 {
  color: #333333;
  font-size: 16px;
  font-weight: 500;
  display: inline-block;
  float: left;
}

.box01-tit .span02 {
  color: #999999;
  font-size: 13px;
  font-weight: 500;
  display: inline-block;
  float: right;
}

.table {
  /* height: 126px; */
  margin: 15px;
  height: 100%;
}

.table table {
  border: 0.5px solid #eeeeee;
}

.table table tr {
  height: 31.5px;
}

.table table tr th {
  font-weight: normal !important;
  color: #666666;
  font-size: 12px;
  width: 25%;
}

.table-bg {
  color: #333333;
  background: #cccccc;
}

.table-active {
  color: #cc3333 !important;
}

.box01-footer {
  height: 45px;
  line-height: 45px;
  padding: 0 15px;
  border-top: 1px solid #eeeeee;
}

.box01-footer .span01 {
  color: #333333;
  font-size: 16px;
  font-weight: 500;
  display: inline-block;
  float: left;
}

.box01-footer .span02 {
  color: #999999;
  font-size: 22px;
  font-weight: 500;
  display: inline-block;
  float: right;
}

.box02 {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.box02-tit {
  padding: 0 15px;
  height: 40px;
  line-height: 40px;
  border-bottom: 0.5px solid #eeeeee;
}

.box02-tit .span01 {
  color: #333333;
  font-size: 16px;
  font-weight: 500;
  display: inline-block;
  float: left;
}

.box02-tit .span02 {
  color: #cc3333;
  font-size: 12px;
  font-weight: 500;
  display: inline-block;
  float: right;
}

.box02-content {
  padding: 15px;
  height: 100%;
  overflow: hidden;
}

.box02-header {
  height: 30px;
  line-height: 30px;
  padding-left: 25px;
  /* background: url("../../image/prouct-W.png") no-repeat left center; */
  background-size: 16.5px;
  color: #333333;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 15px;
}

.box02-info {
  height: 100%;
  line-height: 20px;
  padding-left: 25px;
  /* background: url("../../image/prouct-A.png") no-repeat top left; */
  background-size: 16.5px;
  color: #999999;
  font-size: 12px;
  font-weight: 500;
  overflow: hidden;
}

.button {
  background: #cc3333;
  width: 70%;
  height: 45px;
  margin: 60px 15%;
  overflow: hidden;
  text-align: center;
  line-height: 45px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  border-radius: 45px;
}

.w {
  color: #ffffff;
  background-color: #cc3333;
}

.a {
  color: #cc3333;
  background-color: #ffffff;
}
</style>