import React, { Component } from 'react';
import { Card, Icon, Button, Form, Input, Select, InputNumber, message } from 'antd';
import BraftEditor from 'braft-editor';
import { connect } from 'react-redux';
import { getCategoryListAsync } from '$redux/actions';
import { reqAddProduct, reqUpdateProduct } from '$api';

import 'braft-editor/dist/index.css'
import './index.less';

const { Item } = Form;
const { Option } = Select;

@connect((state) => ({ categoryis: state.categoryis }), { getCategoryListAsync })
@Form.create()
class ProductForm extends Component {

    componentDidMount() {
        // 调用请求数据的函数
        this.props.getCategoryListAsync();

    }

    // 标识是添加商品 / 修改商品的函数
    isAddProduct = () => {
        return this.props.location.pathname.indexOf('/update/') === -1;
    }

    // 提交按钮函数
    submit = (e) => {
        e.preventDefault();
        //校验表单收集数据
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { name, desc, categoryId, price, detail } = values;

                let promise = null;
                const isAddProduct = this.isAddProduct();

                if (isAddProduct) {
                    // 发送添加商品请求
                    promise = reqAddProduct({ name, desc, categoryId, price, detail: detail.toHTML() })
                } else {
                    //发送修改商品请求
                    promise = reqUpdateProduct({ name, desc, categoryId, price, detail: detail.toHTML(), productId: this.props.match.params.id })
                }
                
                promise.then(() => {
                    message.success(`${isAddProduct ? '添加' : '修改'}商品成功`);
                    // 跳转到商品页面，查看
                    this.props.history.push('/product');
                })
                    .catch(err => {
                        message.error(err);
                    });



            }
        })
    }

    // 点击回退到商品列表
    goBack = () => {
        this.props.history.push('/product');
    }

    handleCategoryId = (isAddProduct) => {
        if (isAddProduct) {
            return '0';
        }

        // 获取所有reduxd的分类数据
        const { categoryis, location: { state: { categoryId } } } = this.props;

        // 查找是否有商品分类数据
        const category = categoryis.find((category) => {
            return category._id === categoryId
        })

        if (category) { //有返回categoryId
            return categoryId;
        }

        return '0'; //没有返回默认值
    }
    render() {

        const { form: { getFieldDecorator },
            categoryis,
            location,
        } = this.props;

        const { state } = location

        // 标识是添加商品 / 修改商品
        let isAddProduct = this.isAddProduct();

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
                <div>
                    <Icon type='arrow-left' className='go-back' onClick={this.goBack} />
                    {isAddProduct ? '添加商品' : '修改商品'}
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
                                ],
                                initialValue: isAddProduct ? '' : state.name, //如果是修改商品需要初始值
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
                                ],
                                initialValue: isAddProduct ? '' : state.desc,
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
                                ],
                                initialValue: this.handleCategoryId(isAddProduct)
                            }
                        )(
                            <Select placeholder='请选择商品分类'>
                                <Option key='0' value='0'>
                                    暂无分类
                                </Option>
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
                                ],
                                initialValue: isAddProduct ? '' : state.price,
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
                                ],
                                initialValue: isAddProduct ? '' : BraftEditor.createEditorState(state.detail),
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
export default ProductForm;