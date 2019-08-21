<template>
<div>
    <el-dialog :title="editOrAdd===1 ? '添加字典信息':'修改字典信息'" :visible.sync="addVisible"  center fullscreen @close="closeDialog('ruleFormChild')">
    <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>添加字典信息</span>
                </div>
                <div class="text item">
                    <el-form  :model="form"  :rules="rules"  ref="ruleFormChild" label-width="100px">
                        <div>
                            <div class="from_item">
                                <el-form-item label="id"  prop="id">
                                    <el-input v-model="form.id" clearable placeholder="请输入id" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="value" prop="value">
                                    <el-input v-model="form.value" clearable placeholder="请输入value" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="label" prop="label">
                                    <el-input v-model="form.label" clearable placeholder="请输入label" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="description" prop="description">
                                    <el-input v-model="form.description" clearable  placeholder="请输入description" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div>
                             <div class="from_item">
                                <el-form-item label="type"  prop="type">
                                    <el-input v-model="form.type" clearable   placeholder="请输入type" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="sort" prop="sort">
                                    <el-input v-model="form.sort" clearable placeholder="请输入sort" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                            <div class="from_item">
                                <el-form-item label="parentId" prop="parentId">
                                    <el-input v-model="form.parentId" clearable placeholder="请输入parentId" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </div >
                             <div class="from_item">
                                <el-form-item label="createTime" prop="createTime">
                                  <el-date-picker v-model="form.createTime"  width="160"  type="datetime" placeholder="选择日期时间">
                                </el-date-picker>
                                </el-form-item>
                            </div >
                             <div class="from_item">
                                <el-form-item label="updateTime" prop="updateTime">
                                  <el-date-picker v-model="form.updateTime"  width="160"  type="datetime" placeholder="选择日期时间">
                                </el-date-picker>
                                </el-form-item>
                            </div>
                        </div>                
                    </el-form>
                </div>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="OnAddProduct('ruleForm')">确 定</el-button>
            </span>
    </el-dialog>
</div>
    
</template>
<script>
export default {
  name: "addDictionary",
  props: {
      productTypeData:Object,
  },
  data() {
    return {
        form:{
            id:'',
            value:'',
            label:'',
            description:'',
            type:'',
            sort:'',
            parentId:'',
            createTime:'',
            updateTime:'',
        },
         rules: {
        
      },
    };
  },
  created() {
      let b = (JSON.stringify(this.productTypeData) == "{}");
      if(!b){
          this.form=this.productTypeData
      }
      
  },
  methods: {}
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
    width: 265px;
    float: left;
}
.from_items {
    width: 535px;
    float: left;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 185px;
}
</style>

