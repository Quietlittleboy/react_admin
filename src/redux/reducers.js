// 用来根据prevState和action生成newState函数模块
import {combineReducers} from 'redux';

function aa(prevState = 11, action){
    switch(action.type){
        default:
            return prevState
    }
}

function bb(prevState = 22, action){
    switch(action.type){
        default:
            return prevState
    }
}

export default combineReducers({
    aa,
    bb
});