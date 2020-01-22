import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import screenfull from 'screenfull';

import './index.less';


export default class HeaderMain extends Component {
    state = {
        isScreenfull: false
    }

    // 切换全屏图标
    handleScreenFullChange = () => {
        this.setState({
            isScreenfull: !this.state.isScreenfull
        })
    }

    // 监听切换事件
    componentDidMount() {
        screenfull.on('change', this.handleScreenFullChange);
    }

    // 解绑监听事件
    componentWillUnmount() {
        screenfull.off('change', this.handleScreenFullChange);
    }
    
    // 切换全屏/缩小全屏
    screenFull = () => {
        screenfull.toggle();
    }

    render() {
        const { isScreenfull } = this.state
        return (
            <div className="header-main">
                <div className="header-main-top">
                    <Button size="small" onClick={this.screenFull}>
                        <Icon type={isScreenfull ? "fullscreen-exit" : "fullscreen"} />
                    </Button>
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