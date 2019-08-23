<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                商户名称：<el-input v-model="form.userName" placeholder="商户名称" class="handle-input mr10"></el-input>
                产品分类：<el-select v-model="valueModel" placeholder="请选择" class="handle-input mr10">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                    产品名称：<el-input v-model="form.userIdcard" placeholder="请输入产品名称" class="handle-input mr10"></el-input>
                    状态：<el-select v-model="valueModel" placeholder="请选择" class="handle-input mr10">
                                <el-option value="上架">上架</el-option>
                                <el-option value="下架">下架</el-option>
                            </el-select>
                <el-button type="warning" icon="el-icon-circle-plus-outline">添加产品</el-button>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table">
                <el-table-column type="index" label="#" width="50" align="center">
                </el-table-column>
                <el-table-column prop="userName" label="商户名称" min-width="180" align="center">
                </el-table-column>
                <el-table-column prop="userSex" label="产品分类" min-width="180" align="center">
                </el-table-column>
                <el-table-column prop="userPhone" label="产品名称" min-width="200" align="center">
                </el-table-column>
                <el-table-column prop="userIdcard" label="7日年化" min-width="90" align="center">
                </el-table-column>
                <el-table-column prop="userBirthday" label="期限" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="famousFamily" label="投资期限" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="address" label="运营" min-width="160" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" min-width="260" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="标签"  min-width="160" align="center">
                </el-table-column>
                <el-table-column prop="updateTime" label="状态"  min-width="160" align="center">
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :total="total" :page-size="TotalNum" layout="total, sizes, prev, pager, next, jumper" ></el-pagination>
            </div>
        </div>
        <!-- 查看-->
        <el-dialog title="产品详情" :visible.sync="EditVisible"  center fullscreen>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>产品信息</span>
                </div>
                <div class="text item">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-row :gutter="24">
                            <el-col :span="4">
                                <el-form-item label="产品分类">
                                    <el-select v-model="valueModel" placeholder="请选择" class="handle-input mr10">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-button icon="el-icon-circle-plus" type="primary">添加分类</el-button>
                                <el-button icon="el-icon-circle-close" type="danger">删除分类</el-button>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="产品名称">
                                    <el-input v-model="form.userIdcard" placeholder="请输入产品名称" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="产品名称">
                                    <el-input v-model="form.userIdcard" placeholder="请输入产品名称" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="商户名称">
                                    <el-input v-model="form.userIdcard" placeholder="请输入商户名称" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="年化利率">
                                    <el-input v-model="form.userIdcard" placeholder="请输入年化利率" class="handle-input mr10"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="产品期限">
                                    <el-select v-model="valueModel" placeholder="请选择产品期限" class="handle-input mr10">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="风险等级">
                                    <el-select v-model="valueModel" placeholder="请选择风险等级" class="handle-input mr10">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="起购金额">
                                    <el-input v-model="form.userIdcard" placeholder="请输入起购金额"  class="handle-input mr10"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="标签">
                                    <el-select v-model="form.userIdcard" multiple placeholder="请选择" style="width: 100%;">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-button icon="el-icon-circle-plus" type="primary">添加标签</el-button>
                                <el-button icon="el-icon-circle-close" type="danger">删除标签</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>交易规则</span>
                </div>
                <div class="text item">
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-row :gutter="24">
                            <el-col :span="12" class="mgb20">
                                <el-form-item label="购买">
                                    <el-input type="textarea" v-model="form.name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" class="mgb20">
                                <el-form-item label="预约买入">
                                    <el-input type="textarea" v-model="form.name"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12" class="mgb20">
                                <el-form-item label="开始计算收益">
                                    <el-input type="textarea" v-model="form.name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" class="mgb20">
                                <el-form-item label="到期">
                                    <el-input type="textarea" v-model="form.name"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-card>
            <!-- 产品档案n-->
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>产品档案</span>
                </div>
                <div class="text item">
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-row :gutter="24">
                            <el-col :span="12" class="mgb20">
                                <el-form-item label="购买">
                                    <el-input type="textarea" v-model="form.name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" class="mgb20">
                                <el-form-item label="机构介绍">
                                    <el-input type="textarea" v-model="form.name"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12" class="mgb20">
                                <el-form-item label="机构客服">
                                    <el-input type="textarea" v-model="form.name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" class="mgb20">
                                <el-form-item label="投向">
                                    <el-input type="textarea" v-model="form.name"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button @click="EditVisible = false">取 消</el-button>
                <el-button type="primary" @click="EditVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
        <!--图片查看-->
        <el-dialog :visible.sync="dialogVisibleImg" size="tiny">
            <img style="height: 400px;width:100%;display: block;overflow: hidden;" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import qs from	'qs'
    export default {
        name: 'finance',
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                valueModel: '',
                // 下拉选项框
                form: {                // 搜索条件
                    userName: '',
                    userPhone: '',
                    userIdcard: ''
                },
                tableData: [
                    {
                        userName: '商户名称',
                        userSex: "产品分类",
                        userPhone: "产品名称",
                        userIdcard: "3.36%",
                        userBirthday: '180天',
                        famousFamily: '180天',
                        address: '王宏伟',
                        createTime: '2019-10-25 14:25:26',
                        updateTime: '上架'
                    }
                ],
                //分页
                total: 1,
                currentPage: 1,
                TotalNum: 10,
                EditVisible: false, //查看按钮弹框
                delVisible: false, //删除按钮弹框
                dialogVisibleImg: false, //图片查看弹框
                dialogImageUrl: '',//图片查看弹框路径
                //    弹出框Data数据
                BankCardData: [
                    {
                        bankCardNo: '612426199807291036111',
                        reservePhone: "18829225381",
                        cardName: "中国工商银行",
                        cardType: "中国工商银行(借记卡)",
                        bankName: '中国工商银行西关正街直行',
                        address: '发卡行地址陕西省西安市莲湖区西关正街82号大成鑫源小区1号楼2单元2014室',
                        bankAccounType: 'I类卡',
                        createTime: '2019-08-29 12:25:15'
                    },
                    {
                        bankCardNo: '612426199807291036111',
                        reservePhone: "18829225381",
                        cardName: "中国工商银行",
                        cardType: "中国工商银行(借记卡)",
                        bankName: '中国工商银行西关正街直行',
                        address: '发卡行地址陕西省西安市莲湖区西关正街82号大成鑫源小区1号楼2单元2014室',
                        bankAccounType: 'I类卡',
                        createTime: '2019-08-29 12:25:15'
                    },
                    {
                        bankCardNo: '612426199807291036111',
                        reservePhone: "18829225381",
                        cardName: "中国工商银行",
                        cardType: "中国工商银行(借记卡)",
                        bankName: '中国工商银行西关正街直行',
                        address: '发卡行地址陕西省西安市莲湖区西关正街82号大成鑫源小区1号楼2单元2014室',
                        bankAccounType: 'I类卡',
                        createTime: '2019-08-29 12:25:15'
                    }
                ],
                // 联系人
                ContactsData: [
                    {
                        contactsName: '王宏伟1',
                        contactsPhone: "18829225381",
                        contactsSort: "第1联系人",
                        contactsRelation: "亲人",
                        createTime: '2019-08-29 12:25:15'
                    },
                    {
                        contactsName: '王宏伟2',
                        contactsPhone: "18829225381",
                        contactsSort: "第2联系人",
                        contactsRelation: "亲人",
                        createTime: '2019-08-29 12:25:15'
                    },
                    {
                        contactsName: '王宏伟3',
                        contactsPhone: "18829225381",
                        contactsSort: "第3联系人",
                        contactsRelation: "亲人",
                        createTime: '2019-08-29 12:25:15'
                    }
                ]
            }
        },
        created() {
            this.getData();
        },
        computed: {
        },
        methods: {
            //    分页
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData()
            },
            handleSizeChange (val) {
                this.TotalNum = val
                //一次显示多条val
                this.getData()
            },
            // 获取表格getData数据
            getData() {
                this.$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                this.$axios.defaults.headers.post['Authorization'] = 'Bearer ' + localStorage.getItem('Token')
                this.$axios.post(this.GLOBAL.axIosUrl + '/api/customer2/findCustomers', qs.stringify({
                    page: this.currentPage,
                    size: this.TotalNum
                }))
                    .then((res) => {
                        res = res.data
                        if (res.code === 200) {
                            this.total = res.data.total
                            // this.tableData = res.data.records
                        } else if (res.code === 401) {
                            this.$router.push({path: '/login'});
                        } else {
                            this.$message.error(res.msg);
                        }
                    })
                    .catch((res) => {
                    })
            },
            search() { // 搜索
            },
            handleEdit(index, row) {
                this.EditVisible = true
            },
            handleDelete(index, row) {
                this.delVisible = true;
            },
            // 确定删除
            deleteRow(){
            },
            //    图片放大查看
            ImgClickPop (src) {
                this.dialogVisibleImg = true
                this.dialogImageUrl = src
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }
    .mgb20{
        margin-bottom: 20px;
    }
    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 150px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center;
    }
    .table{
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
    .pagination{
        text-align: center;
    }
    .dialog-footer{
        float: left;
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
</style>
