<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>票据管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- 搜索 -->
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
                        <el-button type="warning" icon="el-icon-circle-plus-outline" @click="OnAddpro">添加产品</el-button>
                        <el-button type="primary" icon="el-icon-search" @click="OnSearch">搜索</el-button>
                    </div>
            </div>
            <!-- 表格 -->
            <el-table :data="tableData" border class="table">
                <el-table-column type="index" label="序号" width="50"  align="center">
                </el-table-column>
                <el-table-column prop="status" label="状态" width="80" :formatter="status" align="center">
                </el-table-column>
                <el-table-column prop="merchantName" label="企业名称"  align="center">
                </el-table-column>
                <!-- <el-table-column prop="productType" label="项目分类"  :formatter="formatRole"  align="center">
                </el-table-column> -->
                <el-table-column prop="name" label="项目名称"  align="center">
                </el-table-column>
                <el-table-column prop="annualInterestRate" label="项目年化收益"  align="center">
                </el-table-column>
                <el-table-column prop="paymentMethod" label="还款方式"  :formatter="paymentMethod"  align="center">
                </el-table-column>
                <el-table-column prop="faceAmount" label="项目金额"  align="center">
                </el-table-column>
                <el-table-column prop="billType" label="票据类型"    :formatter="billType" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="160"  align="center">formatDate
                    <template slot-scope="scope">
                        <div>{{scope.row.createTime | formatDate}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="230"  align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row,'edit')">修改</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button v-if="scope.row.status==='1'" type="text" icon="el-icon-caret-bottom" class="up_status"  @click="handleDown(scope.$index, scope.row)">下架</el-button>
                        <el-button v-else  type="text" icon="el-icon-caret-top" @click="handleUp(scope.$index, scope.row)">上架</el-button>
                        <el-button type="text" icon="el-icon-view" @click="handleIsShow(scope.$index, scope.row)">预览</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :total="total" :page-size="TotalNum" layout="total, sizes, prev, pager, next, jumper" ></el-pagination>
            </div>
        </div>
        <!-- 添加产品信息-->
        <el-dialog title="添加产品信息" :visible.sync="EditVisible"  center fullscreen @close="closeDialog('ruleForm')">
            <el-form  :model="form"  :rules="rules"  ref="ruleForm" key="form" label-width="90px">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>产品信息</span>
                        </div>
                        <div class="text item">
                                <div>
                                    <!-- <div class="from_item">
                                        <el-form-item label="项目分类" prop="productType">
                                            <el-select v-model="form.productType" placeholder="请选择"  clearable @click.native="getSelectInfo('product_type')" class="handle-input mr10">
                                                <el-option v-for="item in product_type" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div> -->
                                    <div class="from_item">
                                        <el-form-item label="项目名称" prop="name">
                                            <el-input v-model="form.name" placeholder="请输入产品名称" class="handle-input mr10"></el-input>
                                        </el-form-item>
                                    </div>
                                     <div class="from_item">
                                        <el-form-item label="企业名称" prop="merchantName">
                                            <el-input v-model="form.merchantName" placeholder="请输入企业名称" class="handle-input mr10"></el-input>
                                        </el-form-item>
                                    </div>
                                     <div class="from_item">
                                        <el-form-item label="法人代表" prop="legalPerson">
                                            <el-input v-model="form.legalPerson" placeholder="请输入法人代表" class="handle-input mr10"></el-input>
                                        </el-form-item>
                                    </div>
                                     <div class="from_item">
                                        <el-form-item label="联系电话" prop="telephone">
                                            <el-input v-model="form.telephone" placeholder="请输入联系电话" class="handle-input mr10"></el-input>
                                        </el-form-item>
                                    </div>
                                     <div class="from_item">
                                        <el-form-item label="注册资本" prop="registeredCapital">
                                            <el-input v-model="form.registeredCapital" placeholder="请输入注册资本" class="handle-input mr10" ></el-input>
                                        </el-form-item>
                                    </div>
                                     <div class="from_item">
                                        <el-form-item label="企业地址" prop="businessAddress">
                                            <el-input v-model="form.businessAddress" placeholder="请输入企业地址" class="handle-input mr10"></el-input>
                                        </el-form-item>
                                    </div>
                                     <div class="from_item">
                                        <el-form-item label="企业规模" prop="enterpriseSize">
                                            <el-select v-model="form.enterpriseSize"   @click.native="getSelectInfo('product_scale')"  class="handle-input mr10" placeholder="请选择企业规模"  >
                                                <el-option v-for="item in product_scale" :key="item.index" :label="item.label" :value="item.value" >
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                   </div>
                                   <div class="from_item" style="width: 300px;">
                                   </div>
                                    <div class="from_item">
                                        <el-form-item label="企业资料" >
                                            <el-upload :action="AxiosUrlImg" :headers="importHeaders"  :on-success="handleAvatarSuccess" list-type="picture-card" :on-preview="handlePictureCardPreview">
                                                <i class="el-icon-plus"></i>
                                            </el-upload>
                                        </el-form-item>
                                    </div>
                                    <div class="from_item">
                                        <el-form-item label="交易资料">
                                            <el-upload :action="AxiosUrlImg" :headers="importHeaders" :on-success="handleAvatarSuccessImg2" list-type="picture-card" :on-preview="handlePictureCardPreviewImg2">
                                                <i class="el-icon-plus"></i>
                                            </el-upload>
                                        </el-form-item>
                                    </div>
                            </div>
                        </div>
                    </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>项目信息</span>
                </div>
                <div class="text item">
                        <div>
                            <div class="from_item">
                                <el-form-item label="票面金额" prop="faceAmount">
                                       <el-input v-model="form.faceAmount" class="handle-input mr10"  placeholder="请输入票面金额"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="单价金额" prop="priceAmount">
                                     <el-input v-model="form.priceAmount" class="handle-input mr10"  placeholder="请输入单价金额"></el-input>
                                </el-form-item>
                           </div>
                            <div class="from_item">
                                <el-form-item label="限制份数" prop="limitNumber">
                                    <el-input v-model="form.limitNumber" class="handle-input mr10"  placeholder="请输入份数"></el-input>
                                </el-form-item>
                            </div>
                             <div class="from_item">
                                <el-form-item label="年化利率" prop="annualInterestRate">
                                     <el-input v-model="form.annualInterestRate" class="handle-input mr10"  placeholder="请输入年利率"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="综合费率">
                                     <el-input v-model="form.comprehensiveRate" class="handle-input mr10"  placeholder="请输入综合费率"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="还款来源">
                                    <el-input v-model="form.paymentSource" class="handle-input mr10"  placeholder="请输入还款来源"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="还款方式">
                                    <el-select v-model="form.paymentMethod" @click.native="getSelectInfo('product_paymentmethod')"   placeholder="请选择还款方式" class="handle-select mr10">
                                        <el-option v-for="item in product_paymentmethod" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                           </div>
                            <div class="from_item">
                                <el-form-item label="产品期限">
                                    <el-select v-model="form.productLife" @click.native="getSelectInfo('product_life')"   placeholder="请选择产品期限" class="handle-select mr10">
                                        <el-option v-for="item in product_life" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                           </div>
                            
                            <div class="from_item">
                                <el-form-item label="票据类型">
                                    <el-select v-model="form.billType"  @click.native="getSelectInfo('product_billtype')"  placeholder="请选择票据类型" class="handle-select mr10">
                                        <el-option v-for="item in product_billtype" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                           <div class="from_item">
                                <el-form-item label="风险等级">
                                    <el-select v-model="form.riskLevel"  @click.native="getSelectInfo('product_risklevel')"  placeholder="请选择风险等级" class="handle-select mr10">
                                        <el-option v-for="item in product_risklevel" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                           </div>
                            <div class="from_item">
                                <el-form-item label="截止日期" prop="productEnd">
                                  <el-date-picker v-model="form.productEnd"  width="120"  type="datetime" placeholder="选择日期时间">
                                </el-date-picker>
                                </el-form-item>
                           </div>
                            <!-- 产品标签 -->
                            <div class="from_items">
                                <el-form-item label="产品标签">
                                    <el-select v-model="form.productLabel" @click.native="getSelectInfo('product_label')"   placeholder="请选择标签"  multiple  style="width: 100%;">
                                        <el-option v-for="item in product_label" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                           </div>
                            <div class="from_items">
                                <el-form-item label="项目详情概述">
                                    <el-input type="textarea" v-model="form.detail"  placeholder="请输入项目详情"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                </div>
            </el-card>
            <!-- 融资方信息-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>融资方信息</span>
                </div>
                <div class="text item">
                        <div>
                            <div class="from_item">
                                <el-form-item label="融资方名称">
                                    <el-input  v-model="form.financersName" class="handle-inputs mr10"  placeholder="请输入融资方名称
                                    "></el-input>
                                </el-form-item>
                            </div>
                             <div class="from_item">
                                <el-form-item label="统一信用代码" label-width="100px"> 
                                    <el-input v-model="form.financersCreditCode" class="handle-inputs mr10"  placeholder="请输入信用代码"></el-input>
                                </el-form-item>
                             </div>
                            <div class="from_item">
                                <el-form-item label="通讯地址">
                                    <el-input  v-model="form.financersAddress" class="handle-inputs mr10"  placeholder="请输入地址"></el-input>
                                </el-form-item>
                            </div>
                             <div class="from_item">
                                <el-form-item label="联系电话">
                                    <el-input  v-model="form.financersPhone" class="handle-inputs mr10"  placeholder="请输入电话"></el-input>
                                </el-form-item>
                             </div>
                        </div>                      
                </div>
            </el-card>
            <!-- 保理方信息-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>保理方信息</span>
                </div>
                <div class="text item">
                        <div>
                            <div class="from_item">
                                <el-form-item label="保理方名称">
                                    <el-input  v-model="form.factoringName" class="handle-inputs mr10"  placeholder="请输入保理方名称"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="统一信用代码" label-width="100px">
                                    <el-input v-model="form.factoringCreditCode" class="handle-inputs mr10" placeholder="请输入信用代码"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="通讯地址">
                                    <el-input  v-model="form.factoringAddress" class="handle-inputs mr10" placeholder="请输入地址"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="联系电话">
                                    <el-input  v-model="form.factoringPhone" class="handle-inputs mr10" placeholder="请输入电话"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                </div>
            </el-card>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="EditVisible = false">取 消</el-button>
                <el-button type="primary" @click="OnAddProduct('ruleForm')">确 定</el-button>        
            </span>
        </el-dialog>

        <!-- 修改产品信息 -->
        <el-dialog :title="'修改产品信息'" :visible.sync="dialogFormVisible"  center fullscreen @close="closeDialog('ruleForms')">
               <el-form  :model="editform"  :rules="rules"  ref="ruleForms" key="form" label-width="90px">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>产品信息</span>
                        </div>
                        <div class="text item">
                                <div>
                                    <!-- <div class="from_item">
                                        <el-form-item label="项目分类" prop="productType">
                                            <el-select v-model="form.productType" placeholder="请选择"  clearable @click.native="getSelectInfo('product_type')" class="handle-input mr10">
                                                <el-option v-for="item in product_type" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div> -->
                                    <div class="from_item">
                                        <el-form-item label="项目名称" prop="name">
                                            <el-input v-model="editform.name" placeholder="请输入产品名称" class="handle-input mr10"></el-input>
                                        </el-form-item>
                                    </div>
                                     <div class="from_item">
                                        <el-form-item label="企业名称" prop="merchantName">
                                            <el-input v-model="editform.merchantName" placeholder="请输入企业名称" class="handle-input mr10"></el-input>
                                        </el-form-item>
                                    </div>
                                     <div class="from_item">
                                        <el-form-item label="法人代表" prop="legalPerson">
                                            <el-input v-model="editform.legalPerson" placeholder="请输入法人代表" class="handle-input mr10"></el-input>
                                        </el-form-item>
                                    </div>
                                     <div class="from_item">
                                        <el-form-item label="联系电话" prop="telephone">
                                            <el-input v-model="editform.telephone" placeholder="请输入联系电话" class="handle-input mr10"></el-input>
                                        </el-form-item>
                                    </div>
                                     <div class="from_item">
                                        <el-form-item label="注册资本" prop="registeredCapital">
                                            <el-input v-model="editform.registeredCapital" placeholder="请输入注册资本" class="handle-input mr10" ></el-input>
                                        </el-form-item>
                                    </div>
                                     <div class="from_item">
                                        <el-form-item label="企业地址" prop="businessAddress">
                                            <el-input v-model="editform.businessAddress" placeholder="请输入企业地址" class="handle-input mr10"></el-input>
                                        </el-form-item>
                                    </div>
                                     <div class="from_item">
                                        <el-form-item label="企业规模" prop="enterpriseSize">
                                            <el-select v-model="editform.enterpriseSize" @click.native="getSelectInfo('product_scale')"  class="handle-input mr10" placeholder="请选择"  >
                                                <el-option v-for="item in product_scale" :key="item.index" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                   </div>
                                   <div class="from_item" style="width: 300px;">
                                   </div>
                                    <div class="from_item">
                                        <el-form-item label="企业资料" >
                                            <el-upload :action="AxiosUrlImg" :headers="importHeaders" :file-list="fileList1"  :on-success="handleAvatarEditSuccess" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                                                <i class="el-icon-plus"></i>
                                            </el-upload>
                                        </el-form-item>
                                    </div>
                                    <div class="from_item">
                                        <el-form-item label="交易资料">
                                            <el-upload :action="AxiosUrlImg" :file-list="fileList2" :headers="importHeaders" :on-success="handleAvatarEditSuccessImg2" list-type="picture-card" :on-preview="handlePictureCardPreviewImg2" :on-remove="handleRemove">
                                                <i class="el-icon-plus"></i>
                                            </el-upload>
                                        </el-form-item>
                                    </div>
                            </div>
                        </div>
                    </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>项目信息</span>
                </div>
                <div class="text item">
                        <div>
                            <div class="from_item">
                                <el-form-item label="票面金额" prop="faceAmount">
                                       <el-input v-model="editform.faceAmount" class="handle-input mr10" placeholder="请输入票面金额"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="单价金额" prop="priceAmount">
                                     <el-input v-model="editform.priceAmount" class="handle-input mr10" placeholder="请输入单价金额"></el-input>
                                </el-form-item>
                           </div>
                            <div class="from_item">
                                <el-form-item label="限制份数" prop="limitNumber">
                                    <el-input v-model="editform.limitNumber" class="handle-input mr10" placeholder="请输入份数"></el-input>
                                </el-form-item>
                            </div>
                             <div class="from_item">
                                <el-form-item label="年化利率" prop="annualInterestRate">
                                     <el-input v-model="editform.annualInterestRate" class="handle-input mr10" placeholder="请输入年利率"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="综合费率">
                                     <el-input v-model="editform.comprehensiveRate" class="handle-input mr10" placeholder="请输入综合费率"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="还款来源">
                                    <el-input v-model="editform.paymentSource" class="handle-input mr10" placeholder="请输入还款来源"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="还款方式">
                                    <el-select v-model="editform.paymentMethod" @click.native="getSelectInfo('product_paymentmethod')"   placeholder="请选择还款方式" class="handle-select mr10">
                                        <el-option v-for="item in product_paymentmethod" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                           </div>
                            <div class="from_item">
                                <el-form-item label="产品期限">
                                    <el-select v-model="editform.productLife" @click.native="getSelectInfo('product_life')"   placeholder="请选择产品期限"  class="handle-select mr10">
                                        <el-option v-for="item in product_life" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                           </div>
                            
                            <div class="from_item">
                                <el-form-item label="票据类型">
                                    <el-select v-model="editform.billType"  @click.native="getSelectInfo('product_billtype')"  placeholder="请选择票据类型" class="handle-select mr10">
                                        <el-option v-for="item in product_billtype" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                           <div class="from_item">
                                <el-form-item label="风险等级">
                                    <el-select v-model="editform.riskLevel"  @click.native="getSelectInfo('product_risklevel')"  placeholder="请选择风险等级" class="handle-select mr10">
                                        <el-option v-for="item in product_risklevel" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                           </div>
                            <div class="from_item">
                                <el-form-item label="截止日期" prop="productEnd">
                                  <el-date-picker v-model="editform.productEnd"  width="120"  type="datetime" placeholder="选择日期时间">
                                </el-date-picker>
                                </el-form-item>
                           </div>
                            <!-- 产品标签 -->
                            <div class="from_items">
                                <el-form-item label="产品标签">
                                    <el-select v-model="editform.productLabel" @click.native="getSelectInfo('product_label')"  @change="editChangeData"   placeholder="请选择标签"  multiple  style="width: 100%;">
                                        <el-option v-for="item in product_label" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                           </div>
                            <div class="from_items">
                                <el-form-item label="项目详情概述">
                                    <el-input type="textarea" v-model="form.detail" placeholder="请输入项目详情"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                </div>
            </el-card>
            <!-- 融资方信息-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>融资方信息</span>
                </div>
                <div class="text item">
                        <div>
                            <div class="from_item">
                                <el-form-item label="融资方名称">
                                    <el-input  v-model="editform.financersName" class="handle-inputs mr10" placeholder="请输入融资方名称"></el-input>
                                </el-form-item>
                            </div>
                             <div class="from_item">
                                <el-form-item label="统一信用代码" label-width="100px"> 
                                    <el-input v-model="editform.financersCreditCode" class="handle-inputs mr10" placeholder="请输入信用代码"></el-input>
                                </el-form-item>
                             </div>
                            <div class="from_item">
                                <el-form-item label="通讯地址">
                                    <el-input  v-model="editform.financersAddress" class="handle-inputs mr10" placeholder="请输入地址"></el-input>
                                </el-form-item>
                            </div>
                             <div class="from_item">
                                <el-form-item label="联系电话">
                                    <el-input  v-model="editform.financersPhone" class="handle-inputs mr10" placeholder="请输入电话"></el-input>
                                </el-form-item>
                             </div>
                        </div>                      
                </div>
            </el-card>
            <!-- 保理方信息-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>保理方信息</span>
                </div>
                <div class="text item">
                        <div>
                            <div class="from_item">
                                <el-form-item label="保理方名称">
                                    <el-input  v-model="editform.factoringName" class="handle-inputs mr10" placeholder="请输入保理方名称"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="统一信用代码" label-width="100px">
                                    <el-input v-model="editform.factoringCreditCode" class="handle-inputs mr10" placeholder="请输入信用代码"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="通讯地址">
                                    <el-input  v-model="editform.factoringAddress" class="handle-inputs mr10" placeholder="请输入地址"></el-input>
                                </el-form-item>
                            </div>
                            <div class="from_item">
                                <el-form-item label="联系电话">
                                    <el-input  v-model="editform.factoringPhone" class="handle-inputs mr10" placeholder="请输入电话"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                </div>
            </el-card>
            </el-form>
            <span slot="footer" class="dialog-footer"  v-if="!disableEdit">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updatePdtInfo">确 定</el-button>
            </span>
        </el-dialog>
         <el-dialog :title="'预览产品信息'" :visible.sync="isShowVisible"  center fullscreen @close="closeDialog('')">
             <pre-view :previewData="previewData"></pre-view>
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
import PreView from "./components/preview";

export default {
  name: "BillManagement",
 components: {
   PreView
  },
  data() {
    return {
      upVisible: false,
      downVisible: false,
      statusId: "",
      editBQ: "",
      disableEdit: false,
      previewData:{},
      //搜索
      search: {
        Type: "",
        Merchant: "",
        money: "",
        name: "",
        status: ""
      },
      //----------
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
        img1: [],
        img2: []
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
        img1: [],
        img2: [],
        status: ""
      },
      rules: {
        productType: [
          { required: true, message: "请选择项目分类", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        merchantName: [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        legalPerson: [
          { required: true, message: "请输入法人代表", trigger: "blur" }
        ],
        registeredCapital: [
          { required: true, message: "请输入注册资本", trigger: "blur" }
        ],
        businessAddress: [
          { required: true, message: "请输入企业地址", trigger: "blur" }
        ],
        enterpriseSize: [
          { required: true, message: "请选择企业规模", trigger: "change" }
        ],
        faceAmount: [
          { required: true, message: "请输入票面金额", trigger: "blur" }
        ],
        priceAmount: [
          { required: true, message: "请输入单价金额", trigger: "blur" }
        ],
        limitNumber: [
          { required: true, message: "请输入限制份数", trigger: "blur" }
        ],
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
      isShowVisible:false,
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
  computed: {},
  methods: {
    closeDialog(formName) {
      this.$refs[formName].resetFields();
    },
    editChangeData(val) {
      this.editBQ = this.getProductLabels(val);
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
    handleViwe(index, row) {
      this.$message({
        message: "正在开发中!"
      });
    },
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
          productClass: 1
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
    handleEdit(index, row, val) {
      if (val === "view") {
        this.disableEdit = true;
      }
    //   this.getSelectInfo("product_type");
    //   this.getSelectInfo("product_risklevel");
    //   this.getSelectInfo("product_billtype");
    //   this.getSelectInfo("product_paymentmethod");
    //   this.getSelectInfo("product_status");
    //   this.getSelectInfo("product_life");
      this.getSelectInfos("product_label");
      (this.dialogFormVisible = true), (this.curIndex = row.id);
      this.$nextTick(this.getPdtInfo(row.id));
    },
    handleIsShow(index, row, val) {  
      this.isShowVisible = true
      this.previewData = row
    },
    getSelectInfos(val) {
      getFormSelect(
        qs.stringify({
          type: val
        })
      ).then(res => {
        this.product_label = res.data.product_label;
      });
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
          this.editform.productType = res.data.productType;
          this.editform.name = res.data.name;
          this.editform.merchantName = res.data.merchantName;
          this.editform.legalPerson = res.data.legalPerson;
          this.editform.telephone = res.data.telephone;
          this.editform.registeredCapital = res.data.registeredCapital;
          this.editform.businessAddress = res.data.businessAddress;
          this.editform.enterpriseSize = res.data.enterpriseSize;
          this.editform.faceAmount = res.data.faceAmount;
          this.editform.priceAmount = res.data.priceAmount;
          this.editform.limitNumber = res.data.limitNumber
            ? res.data.limitNumber
            : "";
          this.editform.annualInterestRate = res.data.annualInterestRate;
          this.editform.comprehensiveRate = res.data.comprehensiveRate;
          this.editform.paymentSource = res.data.paymentSource;
          this.editform.paymentMethod = res.data.paymentMethod;
          this.editform.productEnd = res.data.productEnd;
          this.editform.productLife = res.data.productLife;
          this.editform.productLabel = this.editProductLabel(
            res.data.productLabel
          );
          this.editform.billType = res.data.billType;
          this.editform.riskLevel = res.data.riskLevel;
          this.editform.detail = res.data.detail;
          this.editform.financersName = res.data.financersName;
          this.editform.financersCreditCode = res.data.financersCreditCode;
          this.editform.financersAddress = res.data.financersAddress;
          this.editform.financersPhone = res.data.financersPhone;
          this.editform.factoringName = res.data.factoringName;
          this.editform.factoringCreditCode = res.data.factoringCreditCode;
          this.editform.factoringAddress = res.data.factoringAddress;
          this.editform.factoringPhone = res.data.factoringPhone;
          for (var item in res.data.listimg1) {
            let img = {};
            img.name = "url";
            img.id = res.data.listimg1[item].id;
            img.url = res.data.listimg1[item].filePath;
            imglist.push(img);
          }
          this.fileList1 = imglist;
          for (var item2 in res.data.listimg2) {
            let img2 = {};
            img2.name = "url";
            img2.id = res.data.listimg2[item2].id;
            img2.url = res.data.listimg2[item2].filePath;
            imglist2.push(img2);
          }
          this.fileList2 = imglist2;
          this.editform.status = res.data.status;
        }
      });
    },
    dateToMs(date) {
      let result = new Date(date).getTime();
      return result;
    },
    //提交产品修改信息
    updatePdtInfo() {
      GetAddProduct(
        qs.stringify({
          id: this.curIndex,
          productType: this.editform.productType,
          name: this.editform.name,
          merchantName: this.editform.merchantName,
          legalPerson: this.editform.legalPerson,
          telephone: this.editform.telephone,
          registeredCapital: this.editform.registeredCapital,
          businessAddress: this.editform.businessAddress,
          enterpriseSize: this.editform.enterpriseSize,
          faceAmount: this.editform.faceAmount,
          priceAmount: this.editform.priceAmount,
          limitNumber: this.editform.limitNumber,
          annualInterestRate: this.editform.annualInterestRate,
          comprehensiveRate: this.editform.comprehensiveRate,
          paymentSource: this.editform.paymentSource,
          paymentMethod: this.editform.paymentMethod,
          productEnd: this.dateToMs(this.editform.productEnd),
          productLife: this.editform.productLife,
          productLabel: this.editBQ.toString(),
          billType: this.editform.billType,
          riskLevel: this.editform.riskLevel,
          detail: this.editform.detail,
          financersName: this.editform.financersName,
          financersCreditCode: this.editform.financersCreditCode,
          financersAddress: this.editform.financersAddress,
          financersPhone: this.editform.financersPhone,
          factoringName: this.editform.factoringName,
          factoringCreditCode: this.editform.factoringCreditCode,
          factoringAddress: this.editform.factoringAddress,
          factoringPhone: this.editform.factoringPhone,
          img1: this.editform.img1.toString(),
          img2: this.editform.img2.toString(),
          status: this.editform.status
        })
      ).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.editform.img1 = [];
          this.editform.img2 = [];
          this.getData();
          this.dialogFormVisible = false;
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
            message: "success",
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
    //图片放大查看
    //上传图片
    handleRemove(file, fileList) {
    GetDelProductImg(
        qs.stringify({
          id:file.id
        })
      ).then(res => {
    if (res.code === 200) {
      this.$message({
            message: "删除成功",
            type: "success"
          });
     }
    });
    },
    //点击图片列表中已经上传的图片回调函数
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
      this.form.img1.unshift(res.data);
      this.dialogImageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarEditSuccess(res, file) {
      this.editform.img1.unshift(res.data);
      this.dialogImageUrl = URL.createObjectURL(file.raw);
    },
    //-----------img2
    handlePictureCardPreviewImg2(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccessImg2(res, file) {
      this.form.img2.unshift(res.data);
      this.dialogImageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarEditSuccessImg2(res, file) {
      this.editform.img2.unshift(res.data);
      this.dialogImageUrl = URL.createObjectURL(file.raw);
    },
    //显示添加产品弹框
    OnAddpro() {
      this.EditVisible = true;
    },
    //添加产品
    OnAddProduct(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          GetAddProduct(
            qs.stringify({
              productClass: 1,
              productType: this.form.productType,
              name: this.form.name,
              merchantName: this.form.merchantName,
              legalPerson: this.form.legalPerson,
              telephone: this.form.telephone,
              registeredCapital: this.form.registeredCapital,
              businessAddress: this.form.businessAddress,
              enterpriseSize: this.form.enterpriseSize,
              faceAmount: this.form.faceAmount,
              priceAmount: this.form.priceAmount,
              limitNumber: this.form.limitNumber,
              annualInterestRate: this.form.annualInterestRate,
              comprehensiveRate: this.form.comprehensiveRate,
              paymentSource: this.form.paymentSource,
              paymentMethod: this.form.paymentMethod,
              productEnd: this.dateToMs(this.form.productEnd),
              productLife: this.form.productLife,
              productLabel: this.getProductLabel().toString(),
              billType: this.form.billType,
              riskLevel: this.form.riskLevel,
              detail: this.form.detail,
              financersName: this.form.financersName,
              financersCreditCode: this.form.financersCreditCode,
              financersAddress: this.form.financersAddress,
              financersPhone: this.form.financersPhone,
              factoringName: this.form.factoringName,
              factoringCreditCode: this.form.factoringCreditCode,
              factoringAddress: this.form.factoringAddress,
              factoringPhone: this.form.factoringPhone,
              img1: this.form.img1.toString(),
              img2: this.form.img2.toString()
            })
          ).then(res => {
            if (res.code === 200) {
              this.getData();
              this.EditVisible = false;
            }
          });
        } else {
          return false;
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
  margin-bottom: 0px;
}
.handle-select {
   width: 185px;
}

.handle-input {
   width: 185px;
  display: inline-block;
}
.handle-inputs {
   width: 170px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
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
</style>
