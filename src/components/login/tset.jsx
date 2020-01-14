import React from 'react';
import axios from 'axios';
import { message } from 'antd';

export default function Test() {

    // 自己创建axios实例,修改默认配置

    let axiosIstance = axios.create({
        baseURL: 'api',
        timeout: 20000,
        headers: {

        }
    })

    // 设置拦截器
    // 请求拦截器
    axiosIstance.interceptors.request.use(
        (config) => {
            // console.log(config);
            // 添加touken
            if(token){
                config.headers.authorization =  `Bearer ${token}`
            }

            // 判断请求方式,修改请求参数
            if(config.method === 'post'){

                const keys = Object.keys(config.data)
                const data = keys.reduce((p, c) => {
                    p += `&${c}=${config.data[c]}` 
                    return p
                }, '').slice(1)
                config.data = data
                config.headers['content-Type'] = 'application/x-www-form-urlencoded';
            }

            return config
        }

    )

    // 响应拦截器
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
            console.dir(err);
            let errorCode = {
                401: '没有权限访问当前接口',
                403: '禁止访问当前接口',
                404: '当前资源未找到',
                500: '服务器发生未知错误，请联系管理员'
            } 
            
            let errMessage = ''
            if(err.response){

                errMessage = errorCode[err.response.status]
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


    let token = ''
    let id =''

    const handleClick1 = () => {
        axiosIstance({
            method: 'POST',
            url: '/login',
            data: {
                username: 'admin',
                password: 'admin'
            },
            // data: 'username=admin&password=admin',
            // headers:{
            //     'content-Type':'application/x-www-form-urlencoded'
            // }
        })
        .then((response) => {

            console.log(response);
            
            // if(response.data.status === 0){

                token = response.token;

                
                message.success('登录成功')
            // }else{
                // message.error(response.data.msg);
            // }

        })
        .catch((err) => {

            console.log(err);
            message.error(err)
        })
    }

    const handleClick2 = () => {
        axiosIstance({
            method: 'POST',
            url: '/category/add',
            data: {
                categoryName: '添加商品',
            },
            // headers: {
            //     authorization: `Bearer ${token}`
            // }
        })
        .then((response) => {
            // if(response.data.status === 0){
               id = response._id
                message.success('添加成功')
            // }else{
                // message.error(response.data.msg);
            // }

        })
        .catch((err) => {

            console.log(err);
            message.error(err)
        })
    }

    const handleClick3 = () => {
        axiosIstance({
            method: 'POST',
            url: '/category/delete',
            data: {
                categoryId: id,
            },
            // headers: {
            //     authorization: `Bearer ${token}`
            // }
        })
        .then((response) => {
            // if(response.data.status === 0){
                message.success('删除成功')
            // }else{
                // message.error(response.data.msg);
            // }

        })
        .catch((err) => {

            console.log(err);
            message.error(err)
        })
    }

    return (
        <div>
            <button onClick={handleClick1}>按钮1</button>
            <button onClick={handleClick2}>按钮2</button>
            <button onClick={handleClick3}>按钮3</button>
        </div>
    )



    // let token = ''
    // let id =''
    // const handleClick1 = () => {
    //     axios({
    //         method: 'POST',
    //         url: '/api/login',
    //         data: {
    //             username: 'admin',
    //             password: 'admin'
    //         }
    //     })
    //     .then((response) => {
    //         if(response.data.status === 0){

    //             token = response.data.data.token;
                
    //             message.success('登录成功')
    //         }else{
    //             message.error(response.data.msg);
    //         }

    //     })
    //     .catch((err) => {

    //         console.log(err);
    //         message.error('登录失败,网络错误')
    //     })
    // }

    // const handleClick2 = () => {
    //     axios({
    //         method: 'POST',
    //         url: '/api/category/add',
    //         data: {
    //             categoryName: '添加商品',
    //         },
    //         headers: {
    //             authorization: `Bearer ${token}`
    //         }
    //     })
    //     .then((response) => {
    //         if(response.data.status === 0){
    //            id = response.data.data._id
    //             message.success('添加成功')
    //         }else{
    //             message.error(response.data.msg);
    //         }

    //     })
    //     .catch((err) => {

    //         console.log(err);
    //         message.error('添加失败,网络错误')
    //     })
    // }

    // const handleClick3 = () => {
    //     axios({
    //         method: 'POST',
    //         url: '/api/category/delete',
    //         data: {
    //             categoryId: id,
    //         },
    //         headers: {
    //             authorization: `Bearer ${token}`
    //         }
    //     })
    //     .then((response) => {
    //         if(response.data.status === 0){
    //             message.success('删除成功')
    //         }else{
    //             message.error(response.data.msg);
    //         }

    //     })
    //     .catch((err) => {

    //         console.log(err);
    //         message.error('删除失败,网络错误')
    //     })
    // }

    // return (
    //     <div>
    //         <button onClick={handleClick1}>按钮1</button>
    //         <button onClick={handleClick2}>按钮2</button>
    //         <button onClick={handleClick3}>按钮3</button>
    //     </div>
    // )
}

