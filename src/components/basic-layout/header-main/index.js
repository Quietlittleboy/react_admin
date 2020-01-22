import React, { Component } from 'react';
import { Button, Icon, Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import screenfull from 'screenfull';
import { removeItem } from '$utils/storage';
import { removeUser } from '$redux/actions';

import './index.less';
console.log(removeUser);
@connect(
    state => ({
        username: state.user.user && state.user.user.username
    }),
    {
        removeUser
    }
)
@withRouter
class HeaderMain extends Component {
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

    // 退出登录功能
    logout = () => {
        Modal.confirm({
            title: '您确定要退出登录吗？',
            onOk: () => {
                removeItem('user');

                this.props.removeUser();
                this.props.history.replace('./login');
            },
        });
    }

    
    render() {
        const { isScreenfull } = this.state
        const { username } = this.props;
        return (
            <div className="header-main">
                <div className="header-main-top">
                    <Button size="small" onClick={this.screenFull}>
                        <Icon type={isScreenfull ? "fullscreen-exit" : "fullscreen"} />
                    </Button>
                    <Button size="small" className="header-main-lang">English</Button>
                    <span>hello {username}</span>
                    <Button size="small" type="link" onClick={this.logout}>退出</Button>
                </div>
                <div className="header-main-bottom">
                    <span className="header-main-left">商品管理</span>
                    <span className="header-main-right">2020/01/21</span>
                </div>
            </div>
        )
    }
}

export default HeaderMain;