<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>字典设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box" >
                字典分类：<el-select v-model="search.type" filterable placeholder="请选择">
                            <el-option
                              v-for="item in selectData"
                              :key="item.value"
                              :label="item.text"
                              :value="item.value">
                            </el-option>
                          </el-select>
                         字典名称：<el-input v-model="search.label" placeholder="请输入字典名称" class="handle-input mr10"></el-input>
                        <!-- 字典类型：<el-autocomplete
                            class="inline-input"
                            v-model="search.type"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入字典类型"
                            :trigger-on-focus="false"
                            @select="handleSelect"
                            ></el-autocomplete> -->
                <div style="margin-top:10px;display:inline-block;padding-left:15px;">
                        <el-button type="primary" icon="el-icon-search" @click="OnSearch">搜索</el-button>
                        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">添加字典信息</el-button>
                    </div>
            </div>
            <el-table :data="tableData" border class="table">
                <el-table-column type="index" label="序号" width="50" align="center">
                </el-table-column>
                <el-table-column prop="type" label="字典类型"   align="center">
                </el-table-column>
                <el-table-column prop="description" label="类型描述"  align="center">
                </el-table-column>
                <el-table-column prop="label" label="字典名称"  align="center">
                </el-table-column>
                <el-table-column prop="value" label="字典值"  align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间"   align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.createTime | formatDate}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间"   align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.createTime | formatDate}}</div>
                    </template>
                </el-table-column>
                 <el-table-column label="操作" fixed="right" width="200"  align="center">
                    <template slot-scope="scope">
                        <!-- <el-button type="text" icon="el-icon-edit" @click="handleAdd(scope.$index, scope.row)">添加</el-button> -->
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :total="total" :page-size="TotalNum" layout="total, sizes, prev, pager, next, jumper" ></el-pagination>
            </div>
        </div>
        <!-- 添加产品信息-->
        <el-dialog title="添加字典信息" :visible.sync="EditVisible"  center fullscreen @close="closeDialog('ruleForm')">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>添加字典信息</span>
                </div>
                <div class="text item">
                    <el-form  :model="form"  :rules="rules"  ref="ruleForm" label-width="90px">
                        <div>
                           <!-- <div class="from_item" prop="id"> 
                                <el-form-item label="id"  >
                                    <el-input v-model="form.id" disabled clearable placeholder="请输入id" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div > -->
                            <div class="from_item">
                                <el-form-item label="字典名称" prop="label">
                                    <el-input v-model="form.label" clearable placeholder="请输入字典名称" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="字典值" prop="value">
                                    <el-input v-model="form.value" clearable placeholder="请输入字典值" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                             <div class="from_item">
                                <el-form-item label="字典类型"  prop="type">
                                    <el-input v-model="form.type" clearable placeholder="请输入字典类型" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="类型描述"  prop="description">
                                    <el-input v-model="form.description" clearable placeholder="请输入字典描述" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="排序" prop="sort">
                                    <el-input v-model="form.sort" clearable placeholder="请输入" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                             <!-- <div class="from_item">
                                <el-form-item label="创建时间" prop="createTime">
                                  <el-date-picker v-model="form.createTime" width="160" type="datetime" placeholder="选择日期时间">
                                </el-date-picker>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="更新时间" prop="updateTime">
                                  <el-date-picker v-model="form.updateTime" width="160" type="datetime" placeholder="选择日期时间">
                                </el-date-picker>
                                </el-form-item>
                            </div > -->
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
        <el-dialog title="修改字典信息" :visible.sync="dialogFormVisible"  center fullscreen @close="closeDialog('ruleForms')">
           <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>修改字典信息</span>
                </div>
                <div class="text item">
                    <el-form  :model="editform"  :rules="rules"  ref="ruleForms" label-width="100px">
                             <div>
                            <!-- <div class="from_item" prop="id"> 
                                <el-form-item label="id"  >
                                    <el-input v-model="editform.id" disabled clearable placeholder="请输入id" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div > -->
                            <div class="from_item">
                                <el-form-item label="字典名称" prop="label">
                                    <el-input v-model="editform.label" clearable placeholder="请输入字典名称" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="字典值" prop="value">
                                    <el-input v-model="editform.value" clearable placeholder="请输入字典值" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                             <div class="from_item">
                                <el-form-item label="字典类型"  prop="type">
                                    <el-input v-model="editform.type" clearable placeholder="请输入字典类型" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="类型描述"  prop="description">
                                    <el-input v-model="editform.description" clearable placeholder="请输入字典描述" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="排序" prop="sort">
                                    <el-input v-model="editform.sort" clearable placeholder="请输入" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                             <!-- <div class="from_item">
                                <el-form-item label="创建时间" prop="createTime">
                                  <el-date-picker v-model="editform.createTime" width="160" type="datetime" placeholder="选择日期时间">
                                </el-date-picker>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="更新时间" prop="updateTime">
                                  <el-date-picker v-model="editform.updateTime" width="160" type="datetime" placeholder="选择日期时间">
                                </el-date-picker>
                                </el-form-item>
                            </div > -->
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
    </div>
</template>

<script>
import qs from "qs";
import {
  searchDictionaryList,
  deleteDictionaryList,
  editDictionaryList,
  addDictionaryList,
  DictionaryList
} from "../../../api/index";
import { log } from "util";
export default {
  name: "bankList",
  data() {
    return {
      upVisible: false,
      downVisible: false,
      statusId: "",
      editBQ: "",
      search: {
        label: "",
        type: "",
        description: ""
      },
      restaurants: [],
      // 下拉选项框
      form: {
        id: "",
        label: "",
        value: "",
        description: "",
        sort: "",
        type: "",
        createTime: "",
        updateTime: ""
      },
      editform: {
        id: "",
        label: "",
        value: "",
        description: "",
        sort: "",
        type: "",
        createTime: "",
        updateTime: ""
      },
      selectData: [],
      rules: {
        name: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
        telephone: [
          { required: true, message: "不能为空", trigger: "blur" },
          { pattern: /^[\d\.]+$/, message: "只能输入数字" }
        ],
        priceAmount: [
          { required: true, message: "不能为空", trigger: "blur" },
          { pattern: /^[\d\.]+$/, message: "只能输入数字" }
        ],
        annualInterestRate: [
          { required: true, message: "不能为空", trigger: "blur" },
          { pattern: /^[\d\.]+$/, message: "只能输入数字" }
        ],
        faceAmount: [
          { required: true, message: "不能为空", trigger: "blur" },
          { pattern: /^[\d\.]+$/, message: "只能输入数字" }
        ]
      },
      curIndex: "",
      delVisible: "",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      tableData: [],
      //------图片上传
      dialogImageUrl: "",
      dialogVisible: false,
      //文件上传
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
  //   mounted() {
  //       this.restaurants = this.selectData;
  //     },
  created() {
    this.getData();
    this.getDictionaryList();
  },
  methods: {
    handleSelect(item) {
      console.log(item);
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===0
        );
      };
    },
    editChangeData(val) {
      this.editBQ = this.getProductLabels(val);
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

    getDictionaryList() {
      DictionaryList(qs.stringify({})).then(res => {
        this.selectData = res.data;
        this.restaurants = res.data;
      });
    },
    // 获取表格getData数据
    getData() {
      searchDictionaryList(
        qs.stringify({
          type: this.search.type,
          label: this.search.label,
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
    handleAdd() {
      this.EditVisible = true;
    },
    //产品修改方法
    handleEdit(index, row) {
      (this.dialogFormVisible = true), (this.curIndex = row.id);
      console.log("row", row);
      this.editform.id = row.id;
      this.editform.label = row.label;
      this.editform.value = row.value;
      this.editform.description = row.description;
      this.editform.sort = row.sort;
      this.editform.type = row.type;
      //   this.editform.createTime = row.createTime;
      //   this.editform.updateTime = row.updateTime;
    },
    closeDialog(formName) {
      this.$refs[formName].resetFields();
    },
    //提交产品修改信息
    updatePdtInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          editDictionaryList(
            qs.stringify({
              id: this.editform.id,
              label: this.editform.label,
              value: this.editform.value,
              description: this.editform.description,
              sort: this.editform.sort,
              type: this.editform.type
              //   createTime: this.dateToMs(this.editform.createTime),
              //   updateTime: this.dateToMs(this.editform.updateTime),
            })
          ).then(res => {
            if (res.code === 200) {
              this.getData();
              this.dialogFormVisible = false;
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
        }
      });
    },
    handleDelete(index, row) {
      this.RowId = row.id;
      this.delVisible = true;
    },
    // 确定删除
    deleteRow() {
      deleteDictionaryList(
        qs.stringify({
          id: this.RowId
        })
      ).then(res => {
        this.delVisible = false;
        console.log("res", res);
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
    dateToMs(date) {
      let result = new Date(date).getTime();
      return result;
    },
    OnAddProduct(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addDictionaryList(
            qs.stringify({
              label: this.form.label,
              value: this.form.value,
              description: this.form.description,
              sort: this.form.sort,
              type: this.form.type
              //   createTime: this.dateToMs(this.form.createTime),
              //   updateTime: this.dateToMs(this.form.updateTime),
            })
          ).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.msg,
                type: "success"
              });
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
.handle-box {
  margin-bottom: 20px;
}
.mgb20 {
  margin-bottom: 20px;
}
.handle-select {
  width: 185px;
}
.handle-selects {
  width: 445px;
}

.handle-input {
  width: 185px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.up_status {
  color: #67c23a;
}
.mr10 {
  margin-right: 10px;
}
.pagination {
  text-align: center;
}
.dialog-footer {
  width: 100%;
  margin-bottom: 25px;
}
.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}
.image {
  height: 200px;
  width: 100%;
  display: block;
}
.from_item {
  width: 33%;
  float: left;
}
.from_items {
  width: 535px;
  float: left;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 185px;
}
</style>
