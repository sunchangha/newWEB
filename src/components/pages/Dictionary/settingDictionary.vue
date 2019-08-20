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
                             <el-option v-for="item in product_type" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <div v-if="selectVal===0" class="btn_block">
                        <el-button  v-if="!isEdit" size="mini" icon="el-icon-setting" type="info" style="margin-left:15px;" plain @click="clickProductType">操作</el-button>
                        </div>
                        <div v-if="isEdit" class="btn_block">
                        <el-button size="mini" type="primary" icon="el-icon-circle-plus" style="margin-left:15px;" plain @click="addProductType">添加</el-button>
                        <el-button size="mini" type="primary" icon="el-icon-edit" plain @click="editProductType">修改</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="delectProductType">删除</el-button>
                        <el-button size="mini" icon="el-icon-back"  @click="restCancel">取消</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="form.product_status" placeholder="请选择" @click.native="getSelectInfo('product_status')">
                          <el-option v-for="item in product_status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="企业规模">
                        <el-select v-model="form.product_scale" placeholder="请选择" @click.native="getSelectInfo('product_scale')">
                             <el-option v-for="item in product_scale" :key="item.index" :label="item.label" :value="item.value" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="还款方式">
                        <el-select v-model="form.product_paymentmethod" placeholder="请选择" @click.native="getSelectInfo('product_paymentmethod')">
                            <el-option v-for="item in product_paymentmethod" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品期限">
                        <el-select v-model="form.product_life" placeholder="请选择" @click.native="getSelectInfo('product_life')">
                            <el-option v-for="item in product_life" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="票据类型">
                        <el-select v-model="form.product_billtype" placeholder="请选择" @click.native="getSelectInfo('product_billtype')">
                           <el-option v-for="item in product_billtype" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="风险等级">
                        <el-select v-model="form.product_risklevel" placeholder="请选择" @click.native="getSelectInfo('product_risklevel')">
                            <el-option v-for="item in product_risklevel" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品标签">
                        <el-select v-model="form.product_label" placeholder="请选择" @click.native="getSelectInfo('product_label')">
                           <el-option v-for="item in product_label" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <!-- <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button> -->
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-dialog :title="editOrAdd===1 ? '添加字典信息':'修改字典信息'" :visible.sync="addVisible"  center fullscreen >
          <addDictionary></addDictionary>
          <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="OnAddProduct('ruleForm')">确 定</el-button>
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
  addDictionaryList
} from "../../../api/index";
import addDictionary from "./components/addDictionary"
export default {
  name: "baseform",
  components:{
   addDictionary
  },
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
      product_type: "",
      product_status: "",
      product_scale: "",
      product_paymentmethod: "",
      product_billtype: "",
      product_risklevel: "",
      product_life: "",
      product_label: "",
      selectType: "",
      selectVal:1,
      isEdit: false,
      editOrAdd:1,
      productTypeId:'',
      addVisible:false,
      delVisible:false
    };
  },
  created() {
    this.handleChanges();
  },
  methods: {
    clickProductType() {
      this.isEdit = true;
    },
    restCancel() {
      this.isEdit = false;
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
    //添加条目
    addProductType(){
        this.editOrAdd = 1; 
        this.addVisible = true
    },
    //修改条目
    editProductType(){
        this.editOrAdd = 0 
        this.addVisible = true
    },
    // addDictionaryList(
    //     qs.stringify({
    //       id:'',
    //       value: val,
    //       type: this.selectType
    //     })
    //   ).then(res => {
    //     this.selectVal = res.data;
    //     this.productTypeId = this.getID(this.selectVal);
    //   });
    //获取选中条目
    handleChange(val) {
      getSelectLabel(
        qs.stringify({
          value: val,
          type: this.selectType
        })
      ).then(res => {
          if(res.code==200){
         this.selectVal = 0;
         this.productTypeId = this.getID(this.selectVal);
          }
       
      });
    },
    //获取选中Id
    getID(val) {
      let array1 =  this.product_type;
      let tempArray1 = {}
      for (let i = 0; i < array1.length; i++) {
          if (val === array1[i].label) {
            tempArray1=array1[i];
          }
      }
      return tempArray1;
    },
     //删除选中条目字段
    delectProductType() {
        this.delVisible = true
    },
    deleteRow(){
      deleteDictionaryList(
        qs.stringify({
          id: this.productTypeId.id
        })
      ).then(res => {
        if (res.code == 200) {
          this.$message.success("删除成功！");
          this.getSelectInfo('product_type')
        }
      });
    },
    handleChanges(val) {
      searchDictionaryList(
        qs.stringify({
          id: "",
          value: "",
          type: "",
          page: 1,
          size: 10
        })
      ).then(res => {
        this.selectVal = res.data;
      });
    }
  }
};
</script>
<style>
.container{
    width: 95.5%;
    height: 700px;
}
.form-box{
    width: 100%;
}
.el-form-item{
    width: 45%;
    float: left;
}
.btn_block{
  display:inline-block;
}
</style>

