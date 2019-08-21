<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>数据字典</el-breadcrumb-item>
                <el-breadcrumb-item>字典设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <div style="padding:15px;color:red;">请选择后进行操作</div>
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="项目分类">
                        <el-select v-model="form.product_type" placeholder="请选择" @click.native="getSelectInfo('product_type')" @change="handleChange">
                             <el-option v-for="item in pt_type" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <div v-if="selectVal===0" class="btn_block">
                        <el-button  v-if="!isEdit" size="mini" icon="el-icon-setting" type="info" style="margin-left:15px;" plain @click="clickProductType(1)">操作</el-button>
                        </div>
                        <div v-if="isEdit" class="btn_blocks">
                        <el-button size="mini" type="primary" icon="el-icon-circle-plus" plain @click="addProductType">添加</el-button>
                        <el-button size="mini" type="primary" icon="el-icon-edit" plain @click="editProductType">修改</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="delectProductType">删除</el-button>
                        <el-button size="mini" icon="el-icon-back"  @click="restCancel(1)">取消</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="form.product_status" placeholder="请选择" @click.native="getSelectInfo('product_status')" @change="handleChangeStatus">
                          <el-option v-for="item in pt_status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <div v-if="selectStatus===0" class="btn_block">
                        <el-button  v-if="!isEdit2" size="mini" icon="el-icon-setting" type="info" style="margin-left:15px;" plain @click="clickProductType(2)">操作</el-button>
                        </div>
                        <div v-if="isEdit2" class="btn_blocks">
                        <el-button size="mini" type="primary" icon="el-icon-circle-plus" plain @click="addProductType">添加</el-button>
                        <el-button size="mini" type="primary" icon="el-icon-edit" plain @click="editProductType">修改</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="delectProductType">删除</el-button>
                        <el-button size="mini" icon="el-icon-back"  @click="restCancel(2)">取消</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="企业规模">
                        <el-select v-model="form.product_scale" placeholder="请选择" @click.native="getSelectInfo('product_scale')" @change="handleChangeScale">
                             <el-option v-for="item in pt_scale" :key="item.index" :label="item.label" :value="item.value" ></el-option>
                        </el-select>
                        <div v-if="selectScale===0" class="btn_block">
                        <el-button  v-if="!isEdit3" size="mini" icon="el-icon-setting" type="info" style="margin-left:15px;" plain @click="clickProductType(3)">操作</el-button>
                        </div>
                        <div v-if="isEdit3" class="btn_blocks">
                        <el-button size="mini" type="primary" icon="el-icon-circle-plus" plain @click="addProductType">添加</el-button>
                        <el-button size="mini" type="primary" icon="el-icon-edit" plain @click="editProductType">修改</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="delectProductType">删除</el-button>
                        <el-button size="mini" icon="el-icon-back"  @click="restCancel(3)">取消</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="还款方式">
                        <el-select v-model="form.product_paymentmethod" placeholder="请选择" @click.native="getSelectInfo('product_paymentmethod')" @change="handleChangePaymentmethod">
                            <el-option v-for="item in pt_paymentmethod" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <div v-if="selectPaymentmethod===0" class="btn_block">
                        <el-button  v-if="!isEdit4" size="mini" icon="el-icon-setting" type="info" style="margin-left:15px;" plain @click="clickProductType(4)">操作</el-button>
                        </div>
                        <div v-if="isEdit4" class="btn_blocks">
                        <el-button size="mini" type="primary" icon="el-icon-circle-plus" plain @click="addProductType">添加</el-button>
                        <el-button size="mini" type="primary" icon="el-icon-edit" plain @click="editProductType">修改</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="delectProductType">删除</el-button>
                        <el-button size="mini" icon="el-icon-back"  @click="restCancel(4)">取消</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="产品期限">
                        <el-select v-model="form.product_life" placeholder="请选择" @click.native="getSelectInfo('product_life')" @change="handleChangeLife">
                            <el-option v-for="item in pt_life" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <div v-if="selectLife===0" class="btn_block">
                        <el-button  v-if="!isEdit5" size="mini" icon="el-icon-setting" type="info" style="margin-left:15px;" plain @click="clickProductType(5)">操作</el-button>
                        </div>
                        <div v-if="isEdit5" class="btn_blocks">
                        <el-button size="mini" type="primary" icon="el-icon-circle-plus" plain @click="addProductType">添加</el-button>
                        <el-button size="mini" type="primary" icon="el-icon-edit" plain @click="editProductType">修改</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="delectProductType">删除</el-button>
                        <el-button size="mini" icon="el-icon-back"  @click="restCancel(5)">取消</el-button>
                        </div>
                        
                    </el-form-item>
                    <el-form-item label="票据类型">
                        <el-select v-model="form.product_billtype" placeholder="请选择" @click.native="getSelectInfo('product_billtype')" @change="handleChangeBilltype">
                           <el-option v-for="item in pt_billtype" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <div v-if="selectBilltype===0" class="btn_block">
                        <el-button  v-if="!isEdit6" size="mini" icon="el-icon-setting" type="info" style="margin-left:15px;" plain @click="clickProductType(6)">操作</el-button>
                        </div>
                        <div v-if="isEdit6" class="btn_blocks">
                        <el-button size="mini" type="primary" icon="el-icon-circle-plus" plain @click="addProductType">添加</el-button>
                        <el-button size="mini" type="primary" icon="el-icon-edit" plain @click="editProductType">修改</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="delectProductType">删除</el-button>
                        <el-button size="mini" icon="el-icon-back"  @click="restCancel(6)">取消</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="风险等级">
                        <el-select v-model="form.product_risklevel" placeholder="请选择" @click.native="getSelectInfo('product_risklevel')" @change="handleChangeRisklevel">
                            <el-option v-for="item in pt_risklevel" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <div v-if="selectRisklevel===0" class="btn_block">
                        <el-button  v-if="!isEdit7" size="mini" icon="el-icon-setting" type="info" style="margin-left:15px;" plain @click="clickProductType(7)">操作</el-button>
                        </div>
                        <div v-if="isEdit7" class="btn_blocks">
                        <el-button size="mini" type="primary" icon="el-icon-circle-plus" plain @click="addProductType">添加</el-button>
                        <el-button size="mini" type="primary" icon="el-icon-edit" plain @click="editProductType">修改</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="delectProductType">删除</el-button>
                        <el-button size="mini" icon="el-icon-back"  @click="restCancel(7)">取消</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="产品标签">
                        <el-select v-model="form.product_label" placeholder="请选择" @click.native="getSelectInfo('product_label')" @change="handleChangeLabels">
                           <el-option v-for="item in pt_label" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <div v-if="selectLabels===0" class="btn_block">
                        <el-button  v-if="!isEdit8" size="mini" icon="el-icon-setting" type="info" style="margin-left:15px;" plain @click="clickProductType(8)">操作</el-button>
                        </div>
                        <div v-if="isEdit8" class="btn_blocks">
                        <el-button size="mini" type="primary" icon="el-icon-circle-plus" plain @click="addProductType">添加</el-button>
                        <el-button size="mini" type="primary" icon="el-icon-edit" plain @click="editProductType">修改</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="delectProductType">删除</el-button>
                        <el-button size="mini" icon="el-icon-back"  @click="restCancel(8)">取消</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-dialog :title="editOrAdd===1 ? '添加字典信息':'修改字典信息'" :visible.sync="addVisible"  center fullscreen @close="closeDialog('ruleFormChild')">
           <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>{{editOrAdd===1 ? '添加字典信息':'修改字典信息'}}</span>
                </div>
                <div class="text item">
                    <el-form  :model="editform"  :rules="rules"  ref="ruleFormChild" label-width="100px">
                        <div>
                            <div class="from_item">
                                <el-form-item label="id"  prop="id">
                                    <el-input v-model="editform.id" clearable placeholder="请输入id" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="value" prop="value">
                                    <el-input v-model="editform.value" clearable placeholder="请输入value" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="label" prop="label">
                                    <el-input v-model="editform.label" clearable placeholder="请输入label" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="description" prop="description">
                                    <el-input v-model="editform.description" clearable  placeholder="请输入description" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div>
                             <div class="from_item">
                                <el-form-item label="type"  prop="type">
                                    <el-input v-model="editform.type" clearable   placeholder="请输入type" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="sort" prop="sort">
                                    <el-input v-model="editform.sort" clearable placeholder="请输入sort" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="parentId" prop="parentId">
                                    <el-input v-model="editform.parentId" clearable placeholder="请输入parentId" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                             <div class="from_item">
                                <el-form-item label="createTime" prop="createTime">
                                  <el-date-picker v-model="editform.createTime"  width="160"  type="datetime" placeholder="选择日期时间">
                                </el-date-picker>
                                </el-form-item>
                            </div >
                             <div class="from_item">
                                <el-form-item label="updateTime" prop="updateTime">
                                  <el-date-picker v-model="editform.updateTime"  width="160"  type="datetime" placeholder="选择日期时间">
                                </el-date-picker>
                                </el-form-item>
                            </div>
                        </div>                
                    </el-form>
                </div>
            </el-card>
          <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="editOrAddProduct('ruleFormChild')">确 定</el-button>
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
  getDictionary,
  getSelectLabel,
  searchDictionaryList,
  deleteDictionaryList,
  addDictionaryList,
  editDictionaryList
} from "../../../api/index";
import addDictionary from "./components/addDictionary";
export default {
  name: "baseform",
  data: function() {
    return {
      form: {
        product_type: "",
        product_status: "",
        product_scale: "",
        product_paymentmethod: "",
        product_billtype: "",
        product_risklevel: "",
        product_life: "",
        product_label: ""
      },
      editform: {
        id: "",
        value: "",
        label: "",
        description: "",
        type: "",
        sort: "",
        parentId: "",
        createTime: "",
        updateTime: ""
      },
      editformData:{},
      rules: {},
      pt_type: "",
      pt_status: "",
      pt_scale: "",
      pt_paymentmethod: "",
      pt_billtype: "",
      pt_risklevel: "",
      pt_life: "",
      pt_label: "",
      selectType: "",
      selectVal: 1,
      selectStatus:1,
      selectScale:1,
      selectPaymentmethod:1,
      selectLife:1,
      selectBilltype:1,
      selectRisklevel:1,
      selectLabels:1,
      isEdit: false,
      isEdit2: false,
      isEdit3: false,
      isEdit4: false,
      isEdit5: false,
      isEdit6: false,
      isEdit7: false,
      isEdit8: false,
      editOrAdd: 1,
      productTypeData: "",
      productStatus:"",
      productScale:"",
      productPaymentmethod:"",
      productLife:"",
      productBilltype:"",
      productRisklevel:"",
      productLabels:"",
      addVisible: false,
      delVisible: false
    };
  },
  created() {
  },
  methods: {
    closeDialog(formName) {
      this.$refs[formName].resetFields();
    },
    clickProductType(num) {
      if(num===1){
       this.isEdit = true;
      }
      if(num===2){
       this.isEdit2 = true;
      }
      if(num===3){
       this.isEdit3 = true;
      }
      if(num===4){
       this.isEdit4 = true;
      }
      if(num===5){
       this.isEdit5 = true;
      }
      if(num===6){
       this.isEdit6 = true;
      }
      if(num===7){
       this.isEdit7 = true;
      }
      if(num===8){
       this.isEdit8 = true;
      }
    },
    restCancel(num) {
       if(num===1){
       this.isEdit = false;
      }
      if(num===2){
       this.isEdit2 = false;
      }
      if(num===3){
       this.isEdit3 = false;
      }
      if(num===4){
       this.isEdit4 = false;
      }
      if(num===5){
       this.isEdit5 = false;
      }
      if(num===6){
       this.isEdit6 = false;
      }
      if(num===7){
       this.isEdit7 = false;
      }
      if(num===8){
       this.isEdit8 = false;
      }
    },
    onSubmit() {
      this.$message.success("提交成功！");
    },
    //获取数据字典
    getSelectInfo(val) {
      this.selectType = val;
      getDictionary(
        qs.stringify({
          type: val
        })
      ).then(res => {
        this.pt_type = res.data.product_type;
        this.pt_status = res.data.product_status;
        this.pt_scale = res.data.product_scale;
        this.pt_paymentmethod = res.data.product_paymentmethod;
        this.pt_billtype = res.data.product_billtype;
        this.pt_risklevel = res.data.product_risklevel;
        this.pt_life = res.data.product_life;
        this.pt_label = res.data.product_label;
      });
    },
    //添加条目
    addProductType() {
      this.editOrAdd = 1;
      this.addVisible = true;
      this.editform = {};
    },
    //修改条目
    editProductType() {
      this.editOrAdd = 0;
      this.addVisible = true;
      this.editform = this.productTypeData;
    },
    edit() {
      editDictionaryList(
        qs.stringify(this.editformData)
      ).then(res => {
        if (res.code == 200) {
          this.$message.success("修改成功");
          this.addVisible = false;
          this.closeDialog("ruleFormChild");
        }
      });
    },
    add() {
      addDictionaryList(
        qs.stringify(this.editformData)
      ).then(res => {
        if (res.code == 200) {
          this.$message.success("添加成功");
          this.addVisible = false;
          this.closeDialog("ruleFormChild");
        }
      });
    },
    //添加或修改
    editOrAddProduct(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editformData={
            id: this.editform.id,
            value: this.editform.value,
            label: this.editform.label,
            description: this.editform.description,
            type: this.editform.type,
            sort: this.editform.sort,
            parentId: this.editform.parentId,
            createTime: this.editform.createTime,
            updateTime: this.editform.updateTime
          }
          if (this.editOrAdd === 1) {
            this.add();
          } else {
            this.edit();
          }
        }
      });
    },
     getLabel(val,isval){
        getSelectLabel(
        qs.stringify({
          value: val,
          type: this.selectType
        })
      ).then(res => {
        if (res.code == 200) {
          if(isval===1){
            this.selectVal = 0
            this.productTypeData = this.getID(res.data);
          }
          if(isval===2){
            this.selectStatus = 0
            this.productTypeData = this.getID(res.data);
          }
          if(isval===3){
            this.selectScale = 0
            this.productTypeData = this.getID(res.data);
          }
          if(isval===4){
            this.selectPaymentmethod = 0
            this.productTypeData = this.getID(res.data);
          }
          if(isval===5){
            this.selectLife = 0
            this.productTypeData = this.getID(res.data);
          }
          if(isval===6){
            this.selectBilltype = 0
            this.productTypeData = this.getID(res.data);
          }
           if(isval===7){
            this.selectRisklevel = 0
            this.productTypeData = this.getID(res.data);
          }
           if(isval===8){
            this.selectLabels = 0
            this.productTypeData = this.getID(res.data);
          }
        }
      });

     },
    //获取选中条目
    handleChange(val) {
      this.getLabel(val,1)
    },
    handleChangeStatus(val){
      this.getLabel(val,2)
    },
    handleChangeScale(val){
      this.getLabel(val,3)
    },
    handleChangePaymentmethod(val){
      this.getLabel(val,4)
    },
    handleChangeLife(val){
      this.getLabel(val,5)
    },
    handleChangeBilltype(val){
      this.getLabel(val,6)
    },
    handleChangeRisklevel(val){
      this.getLabel(val,7)
    },
    handleChangeLabels(val){
      this.getLabel(val,8)
    },
    //获取选中Id
    getID(val) {
      let array1 = this.pt_type;
      let tempArray1 = {};
      for (let i = 0; i < array1.length; i++) {
        if (val === array1[i].label) {
          tempArray1 = array1[i];
        }
      }
      return tempArray1;
    },
    //删除选中条目字段
    delectProductType() {
      this.delVisible = true;
    },
    deleteRow() {
      deleteDictionaryList(
        qs.stringify({
          id: this.productTypeData.id
        })
      ).then(res => {
        if (res.code == 200) {
          this.$message.success("删除成功！");
          this.getSelectInfo("product_type");
        }
      });
    },
  }
};
</script>
<style scope>
.container {
  width: 95.5%;
}
.form-box {
  width: 100%;
}
form.el-form {
  height: 500px;
}
.el-form-item {
  width: 45%;
  float: left;
}
.btn_block {
  display: inline-block;
}
.btn_blocks {
  display: block;
  width: 350px;
  margin-left: -70px;
  margin-top: 10px;
}
.mgb20 {
  margin-bottom: 20px;
}
.handle-select {
  width: 220px;
}
.handle-selects {
  width: 445px;
}

.handle-input {
  width: 220px;
  display: inline-block;
}
</style>

