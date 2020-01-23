import React, { Component } from 'react';
import { Button, Icon, Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl, FormattedHTMLMessage } from 'react-intl';
import dayjs from 'dayjs';

import screenfull from 'screenfull';
import { removeItem } from '$utils/storage';
import { removeUser, changeLanguage } from '$redux/actions';
import menus from '$conf/menus';

import './index.less';
// console.log(removeUser);
@injectIntl
@connect(
    state => ({
        username: state.user.user && state.user.user.username,
        language: state.language
    }),
    {
        removeUser,
        changeLanguage
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
            isScreenfull: !this.state.isScreenfull,
            date: Date.now()
        })
    }

    
    componentDidMount() {
        // 监听切换事件
        screenfull.on('change', this.handleScreenFullChange);

        // 头部时间功能
        const timeId = setInterval(() => {
            this.setState({
                date: Date.now()
            })
        }, 1000)
    }

    // 解绑监听事件
    componentWillUnmount() {
        screenfull.off('change', this.handleScreenFullChange);

        clearInterval(this.timeId);

    }

    // 切换全屏/缩小全屏
    screenFull = () => {
        screenfull.toggle();
    }

    // 退出登录功能
    logout = () => {
        const { intl } = this.props
        Modal.confirm({
            title: intl.formatMessage({ id: 'logout' }),
            onOk: () => {
                removeItem('user');

                this.props.removeUser();
                this.props.history.replace('./login');
            },
        });
    }

    // 国际化功能
    changeLanguage = () => {
        const language = this.props.language === 'en' ? 'zh-CN' : 'en';
        this.props.changeLanguage(language)
    }

    // 头部标题
    findTtile = (menus, pathname) => {
        for (let i = 0; i < menus.length; i++) {
            const menu = menus[i];

            if (menu.children) {
                for (let r = 0; r < menu.children.length; r++) {
                    const cMenu = menu.children[r];
                    if (cMenu.path === pathname) {
                        return cMenu.title;
                    }
                }

            } else {
                if (menu.path === pathname) {
                    return menu.title;
                }
            }
        }
    }


    render() {
        const { isScreenfull,date } = this.state
        const { username, language, location: { pathname } } = this.props;
        const title = this.findTtile(menus, pathname);

        return (
            <div className="header-main">
                <div className="header-main-top">
                    <Button size="small" onClick={this.screenFull}>
                        <Icon type={isScreenfull ? "fullscreen-exit" : "fullscreen"} />
                    </Button>
                    <Button size="small" className="header-main-lang" onClick={this.changeLanguage}>
                        {
                            language === 'en' ? '中文' : 'English'
                        }

                    </Button>
                    <span>hello {username}</span>
                    <Button size="small" type="link" onClick={this.logout}>退出</Button>
                </div>
                <div className="header-main-bottom">
                    <span className="header-main-left">
                        <FormattedHTMLMessage id={title} />
                    </span>
                    <span className="header-main-right">
                        {dayjs(date).format('YYYY/MM/DD HH:mm:ss')}
                    </span>
                </div>
            </div>
        )
    }
}

export default HeaderMain;