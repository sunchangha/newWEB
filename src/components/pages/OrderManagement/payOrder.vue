<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 支付订单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box" >
                姓名：<el-input v-model="search.userName" clearable placeholder="请输入姓名" class="handle-input mr10"></el-input>
                身份证号：<el-input v-model="search.idNo" clearable placeholder="请输入身份证号" class="handle-input mr10"></el-input>
                银行预留电话：<el-input v-model="search.mobileNo" clearable placeholder="请输入预留电话" class="handle-input mr10"></el-input>
                <div style="margin-top:10px;display:inline-block">
                    <el-button type="primary" icon="el-icon-search" @click="OnSearch">搜索</el-button>
                </div>
            </div>
            <el-table :data="tableData" border class="table">
                <el-table-column type="index" label="序号" width="50" align="center">
                </el-table-column>
                <el-table-column prop="userName" label="姓名"   align="center">
                </el-table-column>
                <el-table-column prop="idNo" label="身份证号"   align="center">
                </el-table-column>
                <el-table-column prop="payOrderNo" label="支付订单号"  align="center">
                </el-table-column>
                <el-table-column prop="orderAmount" label="支付金额"    align="center">
                </el-table-column>
                <el-table-column prop="cardNo"  label="银行卡号"   align="center">
                </el-table-column>
                <el-table-column prop="mobileNo" label="银行预留电话"   align="center">
                </el-table-column>
                <el-table-column prop="status" label="支付状态"  :formatter="status"  align="center">
                </el-table-column>
                <el-table-column prop="createTime" width="160" label="创建日期" align="center">
                  <template slot-scope="scope">
                        <div>{{scope.row.createTime | formatDate}}</div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :total="total" :page-size="TotalNum" layout="total, sizes, prev, pager, next, jumper" ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import qs from "qs";
import { getPayOrderRecord } from "../../../api/index";
export default {
  name: "payOrder",
  data() {
    return {
      tableData: [],
      search: {
        userName: "",
        idNo: "",
        mobileNo: ""
      },
      //分页
      total: 1,
      currentPage: 1,
      TotalNum: 10,
    };
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
    this.getData();
  },
  methods: {
    //分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    handleSizeChange(val) {
      this.TotalNum = val;
      //一次显示多条val
      this.getData();
    },
    // 获取表格getData数据
    getData() {
      getPayOrderRecord(
        qs.stringify({
          userName: this.search.userName,
          idNo: this.search.idNo,
          mobileNo: this.search.mobileNo,
          page: this.currentPage,
          size: this.TotalNum
        })
      ).then(res => {
        // debugger
        this.tableData = res.data.records;
        this.total = res.data.total;
      });
    },
     OnSearch() {
      // 搜索
      this.getData();
    },
    //状态
    status: function(row, column) {
      return row.status == 0
        ? "失败"
        : row.status == 1 ? "成功" : row.status == 2 ? "处理中" : "";
    },
  }
};
</script>

<style scoped>
@import "../../../assets/css/public.css";
</style>
