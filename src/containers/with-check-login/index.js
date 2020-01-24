import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function withCheckLogin(WrappedComponent) {

    @connect((state) => ({ user: state.user }), null)
    class CheckLogin extends Component {

        static displayName = `checkLogin(${WrappedComponent.displayName ||
            WrappedComponent.name ||
            'Component'})`;

        render() {

            const { user: { token }, location: { pathname } } = this.props;

            // 登录过就跳转到主页面
            if (token) {
                if (pathname === '/login')
                    return <Redirect to='/' />
            } else {//没有登录过就跳转到登录页面
                if (pathname !== '/login') {
                    return <Redirect to='login' />
                }
            }

            return <WrappedComponent {...this.props}/>
        }
    }

    return CheckLogin;
}