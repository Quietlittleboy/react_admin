// 用来创建action对象工厂函数模块

import { reqLogin, reqGetCategoryList,reqAddCategory } from '../api';
import {setItem} from '../utils/storage'
import {SAVE_USER, REMOVE_USER, CHANGE_LANGUAGE, GET_CATEGORY_LIST, ADD_CATEGORY} from './action-types';

export const changeLanguage = (lang) => ({type: CHANGE_LANGUAGE, data: lang})
const saveUser = (user) => ({type: SAVE_USER, data: user})
export const removeUser = () => ({type: REMOVE_USER})

export const saveUserAsync = (username, password) => {

    return dispatch => {

       return reqLogin(username, password)
        .then((response) => {
            console.log(response);
    
            // 储存数据
            setItem('user', response);
    
            dispatch(saveUser(response))

            
        })
    }
   

}

// 获取商品分类
const getCategoryList = (categoryis) => ({type: GET_CATEGORY_LIST, data: categoryis})
export const getCategoryListAsync = () =>{
    return (dispatch) => {
        return reqGetCategoryList().then((response) => {

            dispatch(getCategoryList(response))
        })

    }
}

//请求添加分类
const addCategory = (category) => ({type: ADD_CATEGORY, data: category})
export const addCategoryAsync = (categoryName) =>{
    return (dispatch) => {
        return reqAddCategory(categoryName).then((response) => {
            dispatch(addCategory(response))
        })

    }
}
