import React, { Component } from 'react';
import { Card, Icon, Button, Form, Input, Select, InputNumber, message } from 'antd';
import BraftEditor from 'braft-editor';
import { connect } from 'react-redux';
import { getCategoryListAsync } from '$redux/actions';
import { reqAddProduct } from '$api';

import 'braft-editor/dist/index.css'
import './index.less';

const { Item } = Form;
const { Option } = Select;

@connect((state) => ({ categoryis: state.categoryis }), { getCategoryListAsync })
@Form.create()
class AddProduct extends Component {

    componentDidMount() {
        // 调用请求数据的函数
        this.props.getCategoryListAsync();

    }

    submit = (e) => {
        e.preventDefault();
        //校验表单收集数据
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { name, desc, categoryId, price, detail } = values;

                reqAddProduct({
                    name,
                    desc,
                    categoryId,
                    price,
                    detail: detail.toHTML()
                  })
                    .then(() => {
                      message.success('添加商品成功');
                      // 跳转到商品页面，查看
                      this.props.history.push('/product');
                    })
                    .catch(err => {
                      message.error(err);
                    });
            }
        })
    }
    
    // 返回到商品列表
    handleBack = () => {
        this.props.history.push('/product');
    }
    render() {

        const { form: { getFieldDecorator }, categoryis } = this.props;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };

        return <Card
            title={
                <div onClick={this.handleBack}>
                    <Icon type='arrow-left' className='go-back' />
                    添加商品
            </div>
            }>
            <Form {...formItemLayout} onSubmit={this.submit}>
                <Item label='商品名称'>
                    {
                        getFieldDecorator(
                            'name', {
                                rules: [
                                    {
                                        required: true, message: '请输入商品名称'
                                    }
                                ]
                            }
                        )(
                            <Input placeholder='请输入商品名称' />
                        )
                    }

                </Item>
                <Item label='商品描述'>
                    {
                        getFieldDecorator(
                            'desc', {
                                rules: [
                                    {
                                        required: true, message: '请输入商品描述'
                                    }
                                ]
                            }
                        )(
                            <Input placeholder='请输入商品描述' />
                        )
                    }

                </Item>
                <Item label='商品分类'>
                    {
                        getFieldDecorator(
                            'categoryId', {
                                rules: [
                                    {
                                        required: true, message: '请输入商品分类'
                                    }
                                ]
                            }
                        )(
                            <Select placeholder='请选择商品分类'>
                                {
                                    categoryis.map(category => {
                                        return <Option key={category._id} value={category._id}>{category.name}</Option>
                                    })
                                }
                            </Select>
                        )
                    }

                </Item>
                <Item label='商品价格'>
                    {
                        getFieldDecorator(
                            'price', {
                                rules: [
                                    {
                                        required: true, message: '请输入商品价格'
                                    }
                                ]
                            }
                        )(
                            <InputNumber
                                formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/￥\s?|(,*)/g, '')}
                                className='product-price'
                            />
                        )
                    }

                </Item>
                <Item label='商品详情' wrapperCol={{ span: 22 }}>
                    {
                        getFieldDecorator(
                            'detail', {
                                rules: [
                                    {
                                        required: true, message: '请输入商品详情'
                                    }
                                ]
                            }
                        )(
                            <BraftEditor className='product-detail' />
                        )
                    }

                </Item>
                <Item>
                    <   Button type='primary' htmlType='submit'>提交</Button>
                </Item>
            </Form>
        </Card>
    }
}
export default AddProduct;