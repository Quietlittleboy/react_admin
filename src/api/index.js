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

// 获取分类
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

//请求修改分类
export const reqUpdateCategory = (categoryId, categoryName) => {
    return axiosIstance({
        method: 'POST',
        url: 'category/update',
        data: {
            categoryId,
            categoryName
        } 
    })
}

//请求删除分类
export const reqDeleteCategory = (categoryId) => {
    return axiosIstance({
        method: 'POST',
        url: 'category/delete',
        data: {
            categoryId
        } 
    })
}

//请求商品数据
export const reqGetProductList = (pageNum, pageSize) => {
    return axiosIstance({
        method: 'GET',
        url: 'product/list',
        params: {
            pageNum,
            pageSize
        }
    })
}
