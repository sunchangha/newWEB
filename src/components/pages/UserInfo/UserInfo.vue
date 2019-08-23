<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                姓名：<el-input v-model="search.name" placeholder="请输入姓名" class="handle-input mr10"></el-input>
                手机号：<el-input v-model="search.userPhone" placeholder="请输入手机号" class="handle-input mr10"></el-input>
                身份证号：<el-input v-model="search.userIdcard" placeholder="请输入身份证号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="OnSearch">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table">
                <el-table-column type="index" label="#" width="50" align="center">
                </el-table-column>
                <el-table-column prop="name" label="姓名" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="userSex" label="性别" min-width="60" align="center">
                    <template slot-scope="scope">
                        <el-tag type="danger" v-if="scope.row.userSex === 1">男</el-tag>
                        <el-tag v-if="scope.row.userSex === 0">女</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="userPhone" label="手机号" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="userIdcard" label="身份证号" min-width="180" align="center">
                </el-table-column>
                <el-table-column prop="userBirthday" label="生日" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="famousFamily" label="民族" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="familyDetailsAddress" label="家庭地址" min-width="260" align="center">
                </el-table-column>
                <el-table-column prop="liveDetailsAddress" label="现居住地址" min-width="260" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间"  min-width="160" align="center">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.createTime | formatDate}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="updateTime" label="修改时间"  min-width="160" align="center">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.updateTime | formatDate}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-view" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
<!--                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :total="total" :page-size="TotalNum" layout="total, sizes, prev, pager, next, jumper" ></el-pagination>
            </div>
        </div>
        <!-- 查看-->
        <el-dialog title="查看用户信息" :visible.sync="EditVisible"  center fullscreen>
              <el-row :gutter="20">
                  <el-col :span="8">
                      <el-card shadow="hover" class="mgb20" style="height:252px;">
                          <div class="user-info">
                              <img :src="RowInFo.bigheadImg" class="user-avator" alt=""  @click="ImgClickPop(RowInFo.bigheadImg)">
                              <div class="user-info-cont">
                                  <div class="user-info-name">{{RowInFo.name}}-<el-tag v-if="RowInFo.userSex === 1">男</el-tag><el-tag type="danger" v-if="RowInFo.userSex === 0">女</el-tag></div>
                                  <div>手机号：{{RowInFo.userPhone}}</div>
                                  <div>生日：{{RowInFo.userBirthday}}</div>
                                  <div>身份证号：{{RowInFo.userIdcard}}</div>
                              </div>
                          </div>
                          <div class="user-info-list">现居住地址：{{RowInFo.liveDetailsAddress}}</div>
                          <div class="user-info-list">户口所在地址：{{RowInFo.familyDetailsAddress}}</div>
                      </el-card>
                  </el-col>
                  <el-col :span="16">
                      <el-row  :gutter="20" class="mgb20">
                          <el-col :span="12">
                              <el-card :body-style="{ padding: '0px' }"  style="height:252px; width: 100%;">
                                  <img :src="RowInFo.idcardBackImg" class="image"  @click="ImgClickPop(RowInFo.idcardBackImg)">
                                  <div style="padding: 10px;">
                                      <span>身份证正面照</span>
                                  </div>
                              </el-card>
                          </el-col>
                          <el-col :span="12">
                              <el-card :body-style="{ padding: '0px' }"  style="height:252px; width: 100%;">
                                  <img :src="RowInFo.idcardPositiveImg" class="image"  @click="ImgClickPop(RowInFo.idcardPositiveImg)">
                                  <div style="padding: 10px;">
                                      <span>身份证正面照</span>
                                  </div>
                              </el-card>
                          </el-col>
                      </el-row>
                  </el-col>
              </el-row>
            <el-row class="mgb20">
                <el-col>
                    <el-table :data="BankCardData" border style="width: 100%">
                        <el-table-column prop="bankCardNo" label="银行卡号" width="180" min-width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="reservePhone" label="预留手机号" min-width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="cardName" label="银行卡名称" min-width="150" align="center">
                        </el-table-column>
                        <el-table-column prop="cardType" label="银行卡种类" min-width="120" align="center">
                        </el-table-column>
                        <el-table-column prop="bankName" label="发卡行名称" min-width="260" align="center">
                        </el-table-column>
                        <el-table-column prop="address" label="发卡行地址" min-width="460" align="center">
                        </el-table-column>
                        <el-table-column prop="bankAccounType" label="银行账户类型" min-width="100" align="center">
                        </el-table-column>
                        <el-table-column prop="createTime" label="创建时间" min-width="160" align="center">
                            <template slot-scope="scope">
                                <el-tag>{{scope.row.createTime | formatDate}}</el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
<!--            <el-row class="mgb20">-->
<!--                <el-col>-->
<!--                    <el-table :data="ContactsData" border style="width: 100%">-->
<!--                        <el-table-column prop="contactsName" label="联系人姓名" width="180" min-width="120" align="center">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column prop="contactsPhone" label="联系人手机号" min-width="120" align="center">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column prop="contactsSort" label="第几联系人" min-width="150" align="center">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column prop="contactsRelation" label="联系人关系" min-width="120" align="center">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column prop="createTime" label="创建时间" min-width="160" align="center">-->
<!--                        </el-table-column>-->
<!--                    </el-table>-->
<!--                </el-col>-->
<!--            </el-row>-->
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
    import { GetDataInfo } from '../../../api/index';
    import { GetDataBankCardList } from '../../../api/index';
    export default {
        name: 'UserInfo',
        data() {
            return {
                search: {                // 搜索条件
                    name: '',
                    userPhone: '',
                    userIdcard: ''
                },
                tableData: [],
                //分页
                total: 1,
                currentPage: 1,
                TotalNum: 10,
                EditVisible: false, //查看按钮弹框
                delVisible: false, //删除按钮弹框
                dialogVisibleImg: false, //图片查看弹框
                dialogImageUrl: '',//图片查看弹框路径
                RowInFo: {},
            //    弹出框Data数据
                BankCardData: [],
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
        filters: {
            formatDate: function (value) {
                if (value === null || value === '') {
                    return '暂未查询到时间'
                } else {
                    let date = new Date(value);
                    let y = date.getFullYear();
                    let MM = date.getMonth() + 1;
                    MM = MM < 10 ? ('0' + MM) : MM;
                    let d = date.getDate();
                    d = d < 10 ? ('0' + d) : d;
                    let h = date.getHours();
                    h = h < 10 ? ('0' + h) : h;
                    let m = date.getMinutes();
                    m = m < 10 ? ('0' + m) : m;
                    let s = date.getSeconds();
                    s = s < 10 ? ('0' + s) : s;
                    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
                }
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
                GetDataInfo(qs.stringify({
                    name: this.search.name,
                    userPhone: this.search.userPhone,
                    userIdcard: this.search.userIdcard,
                    page: this.currentPage,
                    size: this.TotalNum
                })).then((res) => {
                    if (res.code === 200) {
                        this.total = res.data.total
                        this.tableData = res.data.records
                    } else if (res.code === 401) {
                        this.$router.push({path: '/login'});
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            },
            OnSearch() { // 搜索
                this.getData()
            },
            handleEdit(index, row) {
                this.RowInFo = row
                this.EditVisible = true
                GetDataBankCardList(qs.stringify({
                    userId:row.id
                })).then((res) => {
                    if (res.code === 200) {
                        this.BankCardData = res.data
                    } else if (res.code === 401) {
                        this.$router.push({path: '/login'});
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            },
            // handleDelete(index, row) {
            //     this.delVisible = true;
            // },
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
