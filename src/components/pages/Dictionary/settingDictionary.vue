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
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="项目分类">
                        <el-select v-model="form.product_type" placeholder="请选择" @click.native="getSelectInfo('product_type')" @change="handleChange">
                             <el-option v-for="item in product_type" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-button size="mini" type="primary" style="margin-left:15px;" plain>添加</el-button>
                        <el-button size="mini" type="primary" plain>修改</el-button>
                        <el-button size="mini" type="primary" plain>删除</el-button>
                    </el-form-item>
                     <!-- <el-form-item label="修改分类名称" v-if="selectVal!=''">
                        <el-input type="text" v-model="selectVal"></el-input>
                    </el-form-item> -->
                    <el-form-item label="状态">
                        <el-select v-model="form.product_status" placeholder="请选择" @click.native="getSelectInfo('product_status')">
                          <el-option v-for="item in product_status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                         <el-button size="mini" type="primary" style="margin-left:15px;" plain>添加</el-button>
                        <el-button size="mini" type="primary" plain>修改</el-button>
                        <el-button size="mini" type="primary" plain>删除</el-button>
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
                        <el-select v-model="form.product_risklevel" placeholder="请选择">
                            <el-option v-for="item in product_risklevel" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品标签">
                        <el-select v-model="form.product_label" placeholder="请选择" @click.native="getSelectInfo('product_label')">
                           <el-option v-for="item in product_label" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
import qs from "qs";
import {getDictionary,getSelectLabel,searchDictionaryList} from "../../../api/index";
    export default {
        name: 'baseform',
        data: function(){
            return {
            form:{
            product_type:'',
            product_status:'',
            product_scale:'',
            product_paymentmethod:'',
            product_billtype:'',
            product_risklevel:'',
            product_life:'',
            product_label:'',
            },
            product_type:'',
            product_status:'',
            product_scale:'',
            product_paymentmethod:'',
            product_billtype:'',
            product_risklevel:'',
            product_life:'',
            product_label:'',
            selectType:'',
            selectVal:''
            }
        },
        created(){
            this.handleChanges()

        },
        methods: {
            onSubmit() {
                this.$message.success('提交成功！');
            },
             //数据字典
            getSelectInfo(val) {
                this.selectType = val
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
            handleChange(val){
                getSelectLabel(
                    qs.stringify({
                    value:val, 
                    type: this.selectType,
                    })
                ).then(res => {
                    this.selectVal = res.data
                });
            },
             handleChanges(val){
                searchDictionaryList(
                    qs.stringify({
                    id:'',
                    value:'', 
                    type: '',
                    page:1,
                    size:10
                    })
                ).then(res => {
                    this.selectVal = res.data
                });
            },
         
        
      }
    }
</script>