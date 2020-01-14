import axios from 'axios';
import errorCode from '../config/error-code';

let axiosIstance = axios.create({
    baseURL: 'api',
    timeout: 20000,
    headers: {

    }
})

// 设置拦截器
// 设置请求拦截器
axiosIstance.interceptors.request.use(
    (config) =>{

        let token = '' 

        if(token){
            config.headers.authorization =  `Bearer ${token}`
        }

        // 判断请求头,修改请求头参数
        if(config.method === 'post'){

            const keys = Object.keys(config.data)
            const data = keys.reduce((p, c) => {
                p += `&${c}=${config.data[c]}` 
                return p
            }, '').slice(1)
            config.data = data
            config.headers['content-Type'] = 'application/x-www-form-urlencoded';
        }

        return config;
    }
)

// 设置响应拦截器
axiosIstance.interceptors.response.use(
    (response) => {

        if(response.data.status === 0){
        return response.data.data;

        }else{
            // 请求成功，但是功能失败
            return Promise.reject(response.data.msg)
        }
    },

    (err) => {
        let errMessage = ''

        // 接收到响应，但是响应失败
        if(err.response){
            errMessage = errorCode[err.response.status]

            // 没有接收到响应
        }else{
            if(err.message.indexOf('Network Error') !== -1){
                errMessage = '网络连接失败'
            }else if(err.message.indexOf('timeout') !== -1){
                errMessage = '网络连接超时，请重试'
            }
        }
        return Promise.reject(errMessage || '发生未知错误，请联系管理员');
        
    }
)