import React,{Component} from 'react';
import {Button, Icon} from 'antd';

import './index.less';


export default class HeaderMain extends Component{
    render(){
        return (
            <div className="header-main">
                <div className="header-main-top">
                    <Button size="small"><Icon type="fullscreen" /></Button>
                    <Button size="small" className="header-main-lang">English</Button>
                    <span>hello</span>
                    <Button size="small" type="link">退出</Button>
                </div>
                <div className="header-main-bottom">
                    <span className="header-main-left">商品管理</span>
                    <span className="header-main-right">2020/01/21</span>
                </div>
            </div>
        )
    }
}