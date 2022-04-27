import axios from "axios";
// cookies
// ElementUI 单独引入
import { Message } from 'element-ui';

// 创建实例
const service = axios.create({
    baseURL: process.env.VUE_APP_API,    // 请求地址
    timeout: 5000,  // 超时
});

// 拦截器
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
        return response; // return Promise.resolve(data);
    
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
// 暴露service
export default service;