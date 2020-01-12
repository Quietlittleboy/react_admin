import React, { Component } from 'react';
import { Form, Input, Button, Icon } from 'antd';

import logo from './logo.png';
import './index.less';

@Form.create()
class Longi extends Component {

    validator = (rule, value, callback) => {

        const name = rule.field === 'username' ? '用户名' : '密码';

        const reg = /^\w+$/;

        if (!value) {
            // 输入值为空
            callback(`${name}不能为空`);
        } else if (value.length < 4) {
            callback(`${name}必须大于4位`);
        } else if (value.length > 15) {
            callback(`${name}必须小于15位`);
        } else if (!reg.test(value)) {
            callback(`${name}只能包含英文、数字、下划线`);
        }

        callback();
    };



    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="logo" />
                    <h1>React项目: 后台管理系统</h1>
                </header>

                <section className='login-section'>
                    <h3>用户登录</h3>
                    <Form className='login-form'>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    {
                                        validator: this.validator
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                                    }
                                    placeholder='用户名'
                                />
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        validator: this.validator
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                                    }
                                    placeholder='密码'
                                />
                            )}
                        </Form.Item>

                        <Form.Item>
                            <Button className='login-form-btn' type='primary'>
                                登录
              </Button>

                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

export default Longi;