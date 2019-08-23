<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-finance"></i> 银行定存</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box" >
                企业名称：<el-input v-model="search.Merchant" placeholder="企业名称" class="handle-input mr10"></el-input>
                项目分类：<el-select v-model="search.Type" clearable  @click.native="getSelectInfo('product_type')" placeholder="请选择" class="handle-input mr10">
                            <el-option v-for="item in product_type" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                项目名称：<el-input v-model="search.name" placeholder="请输入项目名称" class="handle-input mr10"></el-input>
                状态：<el-select v-model="search.status" clearable  placeholder="请选择" @click.native="getSelectInfo('product_status')" class="handle-input mr10">
                        <el-option v-for="item in product_status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <div style="margin-top:10px;display:inline-block">
                        <el-button type="warning" icon="el-icon-circle-plus-outline" @click="OnAddpro">添加银行定存</el-button>
                        <el-button type="primary" icon="el-icon-search" @click="OnSearch">搜索</el-button>
                    </div>
            </div>
            <el-table :data="tableData" border class="table">
                <el-table-column type="index" label="序号" width="50" align="center">
                </el-table-column>
                <el-table-column prop="status" label="状态" width="80" :formatter="status" align="center">
                </el-table-column>
                <el-table-column prop="name" label="产品名称" width="80"  align="center">
                </el-table-column>
                <el-table-column prop="merchantName" label="商户名称"  align="center">
                </el-table-column>
                <el-table-column prop="legalPerson" label="法人代表"   align="center">
                </el-table-column>
                <el-table-column prop="telephone" width="110" label="联系电话"  align="center">
                </el-table-column>
                <el-table-column prop="priceAmount" label="单价金额"  align="center">
                </el-table-column>
                <el-table-column prop="productType" label="产品分类"  align="center">
                </el-table-column>
                <el-table-column prop="paymentMethod" label="还款方式"  align="center">
                </el-table-column>
                <el-table-column prop="paymentSource" label="还款来源"  align="center">
                </el-table-column>
                <el-table-column prop="annualInterestRate" label="年化利率"   align="center">
                </el-table-column>
                <el-table-column prop="productEnd" width="160" label="截止日期"    :formatter="billType" align="center">
                  <template slot-scope="scope">
                        <div>{{scope.row.productEnd | formatDate}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="productLife" label="产品期限"   align="center">
                </el-table-column>
                <el-table-column prop="productLabel" :show-overflow-tooltip="true" label="产品标签"   align="center">
                </el-table-column>
                <el-table-column prop="faceAmount" label="票面金额"   align="center">
                </el-table-column>    
                 <el-table-column label="操作" fixed="right" width="200"  align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="OnAddpro(scope.$index, scope.row)">修改</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button v-if="scope.row.status==='1'" type="text" icon="el-icon-caret-bottom" class="up_status"  @click="handleDown(scope.$index, scope.row)">下架</el-button>
                        <el-button v-else  type="text" icon="el-icon-caret-top" @click="handleUp(scope.$index, scope.row)">上架</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :total="total" :page-size="TotalNum" layout="total, sizes, prev, pager, next, jumper" ></el-pagination>
            </div>
        </div>
        <!-- 添加产品信息-->
        <el-dialog title="添加银行定存信息" :visible.sync="EditVisible"  center fullscreen @close="closeDialog('ruleForm')">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>银行定存信息</span>
                </div>
                <div class="text item">
                    <el-form  :model="form"  :rules="rules"  ref="ruleForm" label-width="90px">
                        <div>
                            <div class="from_item">
                                <el-form-item label="产品名称"  prop="name">
                                    <el-input v-model="form.name" clearable placeholder="请输入产品名称" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="商户名称" prop="merchantName">
                                    <el-input v-model="form.merchantName" clearable placeholder="请输入商户名称" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="法人代表" prop="legalPerson">
                                    <el-input v-model="form.legalPerson" clearable placeholder="请输入法人代表" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="联系电话" prop="telephone">
                                    <el-input v-model="form.telephone" clearable  placeholder="请输入联系电话" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div>
                             <div class="from_item">
                                <el-form-item label="单价金额"  prop="priceAmount">
                                    <el-input v-model="form.priceAmount" clearable   placeholder="请输入单价金额" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="产品分类" prop="productType">
                                    <el-input v-model="form.productType" clearable placeholder="请输入产品分类" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="还款方式" prop="paymentMethod">
                                    <el-input v-model="form.paymentMethod" clearable placeholder="请输入还款方式" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="还款来源" prop="paymentSource">
                                    <el-input v-model="form.paymentSource" clearable placeholder="请输入还款来源" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="年化利率"  prop="annualInterestRate">
                                    <el-input v-model="form.annualInterestRate" clearable  placeholder="请输入年化利率" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                           
                            <div class="from_item">
                                 <el-form-item label="产品期限" prop="productLife">
                                    <el-select v-model="form.productLife" clearable @click.native="getSelectInfo('product_life')"   placeholder="请选择"   class="handle-select mr10">
                                        <el-option v-for="item in product_life" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="票面金额" prop="faceAmount" >
                                    <el-input v-model="form.faceAmount" clearable placeholder="请输入票面金额" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                             <div class="from_item">
                                <el-form-item label="截止日期" prop="productEnd">
                                  <el-date-picker v-model="form.productEnd"  width="160"  type="datetime" placeholder="选择日期时间">
                                </el-date-picker>
                                </el-form-item>
                            </div >
                            <div class="from_items">
                                 <el-form-item label="产品标签" prop="productLabel">
                                    <el-select v-model="form.productLabel" @click.native="getSelectInfo('product_label')"   placeholder="请选择"  multiple  class="handle-selects mr10">
                                        <el-option v-for="item in product_label" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div >
                        </div>                 
                    </el-form>
                </div>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button @click="EditVisible = false">取 消</el-button>
                <el-button type="primary" @click="OnAddProduct('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>


        <!-- 修改产品信息 -->
        <el-dialog title="修改银行定存信息" :visible.sync="dialogFormVisible"  center fullscreen @close="closeDialog('ruleForms')">
           <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>银行定存信息</span>
                </div>
                <div class="text item">
                    <el-form  :model="editform"  :rules="rules"  ref="ruleForms" label-width="90px">
                             <div>
                            <div class="from_item" prop="name"> 
                                <el-form-item label="产品名称"  >
                                    <el-input v-model="editform.name" clearable placeholder="请输入产品名称" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="商户名称" prop="merchantName">
                                    <el-input v-model="editform.merchantName" clearable placeholder="请输入商户名称" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="法人代表" prop="legalPerson">
                                    <el-input v-model="editform.legalPerson" clearable placeholder="请输入法人代表" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="联系电话"  prop="telephone">
                                    <el-input v-model="editform.telephone" clearable placeholder="请输入联系电话" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="单价金额"  prop="priceAmount">
                                    <el-input v-model="editform.priceAmount" clearable  placeholder="请输入单价金额" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="产品分类" prop="productType">
                                    <el-input v-model="editform.productType" clearable placeholder="请输入产品分类" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="还款方式" prop="paymentMethod">
                                    <el-input v-model="editform.paymentMethod" clearable placeholder="请输入还款方式" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="还款来源" prop="paymentSource">
                                    <el-input v-model="editform.paymentSource" clearable placeholder="请输入还款来源" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="年化利率" prop="annualInterestRate" >
                                    <el-input v-model="editform.annualInterestRate" clearable placeholder="请输入年化利率" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                 <el-form-item label="产品期限" prop="productLife">
                                    <el-select v-model="editform.productLife" clearable @click.native="getSelectInfo('product_life')"   placeholder="请选择" class="handle-select mr10">
                                        <el-option v-for="item in product_life" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div >
                            
                             
                            <div class="from_item">
                                <el-form-item label="票面金额"  prop="faceAmount">
                                    <el-input v-model="editform.faceAmount" clearable placeholder="请输入票面金额" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                             <div class="from_item">
                                <el-form-item label="截止日期" prop="productEnd">
                                  <el-date-picker v-model="editform.productEnd" width="160" type="datetime" placeholder="选择日期时间">
                                </el-date-picker>
                                </el-form-item>
                            </div >
                
                         <div class="from_item">
                                 <el-form-item label="产品标签" prop="productLabel">
                                    <el-select v-model="editform.productLabel" @click.native="getSelectInfo('product_label')" @change="editChangeData"   placeholder="请选择"  multiple  class="handle-selects mr10">
                                        <el-option v-for="item in product_label" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div >  
                            </div>                   
                    </el-form>
                </div>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updatePdtInfo('ruleForms')">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" center width="500px">
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 上架提示框 -->
        <el-dialog title="提示" :visible.sync="upVisible" center width="500px">
            <div class="del-dialog-cnt">是否确定上架？</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="upVisible = false">取 消</el-button>
                <el-button type="primary" @click="up">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 上架提示框 -->
        <el-dialog title="提示" :visible.sync="downVisible" center width="500px">
            <div class="del-dialog-cnt">是否确定下架？</div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="downVisible = false">取 消</el-button>
                <el-button type="primary" @click="down">确 定</el-button>
            </div>
        </el-dialog>

        <!--图片查看-->
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import qs from "qs";
import {
  fetchData,
  getFormSelect,
  GetAddProduct,
  GetDelProduct,
  GetProductInfo,
  GetDelProductImg,
  productUpDown
} from "../../../api/index";
import { log } from "util";
export default {
  name: "bankList",
  data() {
    return {
      upVisible: false,
      downVisible: false,
      statusId: "",
      editBQ:'',
      search: {
        Type: "",
        Merchant: "",
        money: "",
        name: "",
        status: ""
      },
      // ---- 下拉字典-
      product_status: [],
      product_type: [],
      product_scale: [],
      product_paymentmethod: [],
      product_billtype: [],
      product_risklevel: [],
      product_life: [],
      product_label: [],

      // 下拉选项框
      form: {
        // 搜索条件
        productType: "",
        name: "",
        merchantName: "",
        legalPerson: "",
        telephone: "",
        registeredCapital: "",
        businessAddress: "",
        enterpriseSize: "",
        faceAmount: "",
        priceAmount: "",
        limitNumber: "",
        annualInterestRate: "",
        comprehensiveRate: "",
        paymentSource: "",
        paymentMethod: "",
        productEnd: "",
        productLife: "",
        productLabel: "",
        billType: "",
        riskLevel: "",
        detail: "",
        financersName: "",
        financersCreditCode: "",
        financersAddress: "",
        financersPhone: "",
        factoringName: "",
        factoringCreditCode: "",
        factoringAddress: "",
        factoringPhone: "",
      },
      editform: {
        // 搜索条件
        productType: "",
        name: "",
        merchantName: "",
        legalPerson: "",
        telephone: "",
        registeredCapital: "",
        businessAddress: "",
        enterpriseSize: "",
        faceAmount: "",
        priceAmount: "",
        limitNumber: "",
        annualInterestRate: "",
        comprehensiveRate: "",
        paymentSource: "",
        paymentMethod: "",
        productEnd: "",
        productLife: "",
        productLabel: "",
        billType: "",
        riskLevel: "",
        detail: "",
        financersName: "",
        financersCreditCode: "",
        financersAddress: "",
        financersPhone: "",
        factoringName: "",
        factoringCreditCode: "",
        factoringAddress: "",
        factoringPhone: "",
        status: ""
      },
      rules: {
        name: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
        telephone: [
          { required: true, message: "不能为空", trigger: "blur"},
          {pattern: /^[\d\.]+$/,message: "只能输入数字"}
        ],
        priceAmount: [
          { required: true, message: "不能为空", trigger: "blur"},
          {pattern: /^[\d\.]+$/,message: "只能输入数字"}
        ],
        annualInterestRate: [
          { required: true, message: "不能为空", trigger: "blur"},
          {pattern: /^[\d\.]+$/,message: "只能输入数字"}
        ],
        faceAmount: [
          { required: true, message: "不能为空", trigger: "blur"},
          {pattern: /^[\d\.]+$/,message: "只能输入数字"}
        ],
      },
      fileList1: [],
      fileList2: [],
      curIndex: "",
      delVisible: "",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      tableData: [],
      //------图片上传
      dialogImageUrl: "",
      dialogVisible: false,
      //文件上传
      AxiosUrlImg: this.GLOBAL.AxiosUrlImg,
      importHeaders: { Authorization: localStorage.getItem("Token") },
      //分页
      total: 1,
      currentPage: 1,
      TotalNum: 10,
      EditVisible: false, //查看按钮弹框
      delVisible: false, //删除按钮弹框
      //    删除ID
      RowId: ""
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
    editChangeData(val){
      this.editBQ=this.getProductLabels(val) 
    },
      //修改标签
      getProductLabels(data) {
      let array1 = data;
      let array2 = this.product_label;
      let tempArray1 = [];
      let tempArray2 = [];
      for (let i = 0; i < array1.length; i++) {
        for (let k = 0; k < array2.length; k++) {
          if (array1[i] === array2[k].value) {
            tempArray1.push(array2[k].label);
          }
        }
      }
      for (let j = 0; j < tempArray1.length; j++) {
        tempArray2.push(tempArray1[j]);
      }
      return tempArray2;
    },
    //编辑时标签回显
      editProductLabel(data) {
        let array1 = data.split(",");
        let array2 = this.product_label;
        let tempArray1 = [];
        let tempArray2 = [];
        for (let i = 0; i < array1.length; i++) {
          for (let k = 0; k < array2.length; k++) {
            if (array1[i] === array2[k].label) {
              tempArray1.push(array2[k].value);
            }
          }
        }
        return tempArray1;
    },
    //上架
    up() {
      productUpDown(
        qs.stringify({
          id: this.statusId,
          status: 1
        })
      ).then(res => {
        if (res.code == 200) {
          this.upVisible = false;
          this.getData();
          this.$message({
            type: "success",
            message: "上架成功!"
          });
        }
      });
    },
    //下架
    down() {
      productUpDown(
        qs.stringify({
          id: this.statusId,
          status: 2
        })
      ).then(res => {
        if (res.code == 200) {
          this.downVisible = false;
          this.getData();
          this.$message({
            type: "success",
            message: "下架成功!"
          });
        }
      });
    },
    handleDown(index, row) {
      this.downVisible = true;
      this.statusId = row.id;
    },
    //上架
    handleUp(index, row) {
      this.upVisible = true;
      this.statusId = row.id;
    },
    //数据字典
    getSelectInfo(val) {
      getFormSelect(
        qs.stringify({
          type: val
        })
      ).then(res => {
        this.product_type = res.data.product_type;
        this.product_status = res.data.product_status;
        this.product_scale = res.data.product_scale;
        this.product_paymentmethod = res.data.product_paymentmethod;
        this.product_billtype = res.data.product_billtype;
        this.product_risklevel = res.data.product_risklevel;
        this.product_life = res.data.product_life;
        this.product_label = res.data.product_label;
      });
    },
    //    分页
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
      fetchData(
        qs.stringify({
          merchantName: this.search.Merchant,
          name: this.search.name,
          status: this.search.status,
          productType: this.search.Type,
          page: this.currentPage,
          size: this.TotalNum,
          productClass: 2
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
    //项目类型转义

    // 1234567
    formatRole: function(row, column) {
      return row.productType == "1"
        ? "房屋贷"
        : row.productType == "2"
          ? "车抵贷"
          : row.productType == "3"
            ? "保单贷"
            : row.productType == "4" ? "公积分贷" : "";
    },
    //还款方式转义
    paymentMethod: function(row, column) {
      return row.paymentMethod == "1"
        ? "还本付息"
        : row.paymentMethod == "2"
          ? "到期还本"
          : row.productType == "3" ? "还本计息" : "";
    },
    //票据类型
    billType: function(row, column) {
      return row.billType == "1" ? "电票" : row.billType == "2" ? "商票" : "";
    },
    //状态
    status: function(row, column) {
      return row.status == 0
        ? "草稿"
        : row.status == 1 ? "上架" : row.status == 2 ? "下架" : "";
    },
    //产品修改方法
    handleEdit(index, row) {
      (this.dialogFormVisible = true), (this.curIndex = row.id);
      this.getSelectInfo('product_label')
      this.getPdtInfo(row.id);
    },
    //调用产品详情信息接口
    getPdtInfo(id) {
      var imglist = [];
      var imglist2 = [];
      GetProductInfo(
        qs.stringify({
          id: id
        })
      ).then(res => {
        if (res.code == 200) {
          this.editform.name = res.data.name;
          this.editform.merchantName = res.data.merchantName;
          this.editform.legalPerson = res.data.legalPerson;
          this.editform.telephone = res.data.telephone;
          this.editform.priceAmount = res.data.priceAmount;
          this.editform.productType = res.data.productType;
          this.editform.paymentMethod = res.data.paymentMethod;
          this.editform.paymentSource = res.data.paymentSource;
          this.editform.annualInterestRate = res.data.annualInterestRate;
          this.editform.productEnd = res.data.productEnd;
          this.editform.faceAmount = res.data.faceAmount;
          this.editform.status = res.data.status;
          this.editform.productLife = res.data.productLife
          this.editform.productLabel = this.editProductLabel(res.data.productLabel)
        }
      });
    },
    closeDialog(formName) {
        this.$refs[formName].resetFields();
      },
    //提交产品修改信息
    updatePdtInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
      GetAddProduct(
        qs.stringify({
          id: this.curIndex,
          name: this.editform.name,
          merchantName: this.editform.merchantName,
          legalPerson: this.editform.legalPerson,
          telephone: this.editform.telephone,
          priceAmount: this.editform.priceAmount,
          productType: this.editform.productType,
          paymentMethod: this.editform.paymentMethod,
          paymentSource: this.editform.paymentSource,
          annualInterestRate: this.editform.annualInterestRate,
          productEnd: this.dateToMs(this.editform.productEnd),
          productLife: this.editform.productLife,
          productLabel: this.editBQ.toString(),
          faceAmount: this.editform.faceAmount
        })
      ).then(res => {
        if (res.code === 200) {
          this.getData()
          this.dialogFormVisible = false;
        }
      });
       }
      });
    },
    //修改产品状态删除已经上传的图片
    removeImg(file, fileList) {
      GetDelProductImg(
        qs.stringify({
          id: file.id
        })
      ).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        }
      });
    },
    removeImg1(file, fileList) {
      GetDelProductImg(
        qs.stringify({
          id: file.id
        })
      ).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        }
      });
    },
    handleDelete(index, row) {
      this.RowId = row.id;
      this.delVisible = true;
    },
    // 确定删除
    deleteRow() {
      GetDelProduct(
        qs.stringify({
          id: this.RowId
        })
      ).then(res => {
        this.delVisible = false;
        if (res.code === 200) {
          this.getData();
          this.$message({
            message: res.msg,
            type: "success"
          });
        } else if (res.code === 401) {
          this.$message({
            message: "请退出重新登陆",
            type: "success"
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    //显示添加产品弹框
    OnAddpro() {
      this.EditVisible = true;
    },
  
    //    添加产品
    getProductLabel() {
      let array1 = this.form.productLabel;
      let array2 = this.product_label;
      let tempArray1 = [];
      for (let i = 0; i < array1.length; i++) {
        for (let k = 0; k < array2.length; k++) {
          if (array1[i] === array2[k].value) {
            tempArray1.push(array2[k].label);
          }
        }
      }
      return tempArray1;
    },
    formatDate(date) {
      if (typeof date == "string") {
        return this.formatDate2(date);
      }
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "/" + m + "/" + d;
    },

    formatDate2(date) {
      var y = date.substring(0, 4);
      var m = date.substring(5, 7);
      var d = date.substring(8, 10);

      return y + "/" + m + "/" + d;
    },
    dateToMs (date) {
    let result = new Date(date).getTime();
    return result;
},
    OnAddProduct(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
      GetAddProduct(
        qs.stringify({
          productClass: 2,
          name: this.form.name,
          merchantName: this.form.merchantName,
          legalPerson: this.form.legalPerson,
          telephone: this.form.telephone,
          priceAmount: this.form.priceAmount,
          productType: this.form.productType,
          paymentMethod: this.form.paymentMethod,
          paymentSource: this.form.paymentSource,
          annualInterestRate: this.form.annualInterestRate,
          productEnd: this.dateToMs(this.form.productEnd),
          productLife: this.form.productLife,
          productLabel: this.getProductLabel().toString(),
          faceAmount: this.form.faceAmount
        })
      ).then(res => {
        if (res.code === 200) {
          this.getData();
          this.EditVisible = false;
        }
      });
        }
      });
    }
  }
};
</script>

<style scoped>
@import "../../../assets/css/public.css";
</style>
