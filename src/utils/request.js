import axios from 'axios';

/****** 创建axios实例 ******/
const service = axios.create({
    //这个process.env.BASE_URL在config/dev.evn.js、prod.evn.js里面进行配置：
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    baseURL: 'http://192.168.1.112:8666',
    // baseURL: '',
    timeout: 5000  // 请求超时时间
})
/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use( config => {
    console.log(config)
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(response => {
    if(response.status === 200){
        return response.data;
    }else{
        Promise.reject();
    }
}, error => {
    console.log(error);
    return Promise.reject();
})

export default service;