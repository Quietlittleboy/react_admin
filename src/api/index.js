import axiosIstance from './request';

// 登录请求
export const reqLogin = (username, password) => {
    return axiosIstance({
        method: 'POST',
        url: '/login',
        data: {
            username,
            password
        }
    })
}

// 获取商品分类
export const reqGetCategoryList = () => {
    return axiosIstance({
        url: 'category/get',
        method: 'GET'
    })
}

//请求添加分类
export const reqAddCategory = (categoryName) => {
    return axiosIstance({
        method: 'POST',
        url: 'category/add',
        data: {
            categoryName
        }
    })
}