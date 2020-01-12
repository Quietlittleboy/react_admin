// 用来创建store对象
import {createStore, applyMiddleware} from 'redux';
import thunk from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducers from './reducers';

export default createStore(reducers, process.env.NODE_ENV==='development'? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk))