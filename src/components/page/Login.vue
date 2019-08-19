<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">金融后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import qs from	'qs'
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post(this.GLOBAL.axIosUrl + '/api/auth/login',qs.stringify( {
                            username: this.ruleForm.username,
                            password : this.ruleForm.password
                        }))
                            .then((res) => {
                                res = res.data
                                if (res.code === 200){
                                    localStorage.setItem('ms_username',res.data.userDetail.username);
                                    localStorage.setItem("Token", 'Bearer ' + res.data.token)
                                    // this.$store.commit('Token', res.data.token);
                                    this.$router.push('/');
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: res.msg,
                                        type: 'warning'
                                    });
                                }
                            })
                            .catch((res) => {
                                this.$message({
                                    showClose: true,
                                    message: '后台服务异常，请联系管理员',
                                    type: 'error'
                                });
                                console.log(res)
                            })
                    } else {
                        this.$message({
                            message: '请输入账号密码登录!',
                            type: 'warning'
                        });
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: cover;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
</style>
