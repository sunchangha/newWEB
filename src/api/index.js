import request from '../utils/request';
export const fetchData = (query) => {
    return request({
        url: '/api/product/ProductList',
        method: 'post',
        headers: {
            Authorization: localStorage.getItem('Token')
        },
        data: query
    })
}
export const getFormSelect = (query) => { // 字典
    return request({
        url: '/api/dict/getDict',
        method: 'post',
        headers: {
            Authorization: localStorage.getItem('Token')
        },
        data: query
    })
}
export const GetProductInfo = (query) => { // 获取产品详情
    return request({
        url: '/api/product/ProductDetail',
        method: 'post',
        headers: {
            Authorization: localStorage.getItem('Token')
        },
        data: query
    })
}
export const GetAddProduct = (query) => { // 添加产品
    return request({
        url: '/api/product/addProduct',
        method: 'post',
        headers: {
            Authorization: localStorage.getItem('Token')
        },
        data: query
    })
}
export const GetDelProduct = (query) => { // 删除产品
    return request({
        url: '/api/product/delete',
        method: 'post',
        headers: {
            Authorization: localStorage.getItem('Token')
        },
        data: query
    })
} 
export const GetDelProductImg = (query) => { // 删除产品图片
    return request({
        url: '/api/product/deletefile',
        method: 'post',
        headers: {
            Authorization: localStorage.getItem('Token')
        },
        data: query
    })
}
export const GetDataInfo = (query) => { // 获取用户tab表格
    return request({
        url: '/api/users/list',
        method: 'post',
        headers: {
            Authorization: localStorage.getItem('Token')
        },
        data: query
    })
}
export const GetDataBankCardList = (query) => { // 获取用户tab表格
    return request({
        url: '/api/user/findBankCardList',
        method: 'post',
        headers: {
            Authorization: localStorage.getItem('Token')
        },
        data: query
    })
}
//sch2019/08/15新增
export const productUpDown = (query) => { // 获取用户tab表格
    return request({
        url: '/api/product/updateState',
        method: 'post',
        headers: {
            Authorization: localStorage.getItem('Token')
        },
        data: query
    })
}