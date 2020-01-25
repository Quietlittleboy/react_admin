import React, { Component } from 'react';
import { Card, Button, Icon, Table, Modal, message } from 'antd';
import { connect } from 'react-redux';

import AddCategoryForm from './add-category-form';
import { getCategoryListAsync, addCategoryAsync } from '$redux/actions';



@connect(state => ({ categoryis: state.categoryis }),
    {
        getCategoryListAsync,
        addCategoryAsync
    })
class Category extends Component {

    // 定义状态
    state = ({
        isShowAddCategory: false
    })

    componentDidMount() {
        // 调用请求数据的函数
        this.props.getCategoryListAsync();

    }

    // 定义数据静态组件
    columns = [
        {
            title: '品类名称',
            dataIndex: 'name',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render() {
                return (
                    <div>
                        <Button type="link" >修改分类</Button>
                        <Button type="link">删除分类</Button>
                    </div>
                )
            }
        },
    ];

    // 添加分类
    addCategory = () => {
        const {validateFields, resetFields} = this.addCategoryForm.props.form;

        // 验证表单，收集数据
        validateFields((err, values) => {
            if(!err){
                const {categoryName} = values;

                // 发送请求
               this.props.addCategoryAsync(categoryName)
                .then(() => {
                    message.success('添加成功')
                    
                    // 清空表单数据
                    resetFields();

                    // 隐藏表单
                    this.hiddenAddCategory();
                })
                .catch((err) => {
                    message.error(err);
                })

            }

        })
    }

    // 隐藏分类对话框
    hiddenAddCategory = () => {
        this.setState({
            isShowAddCategory: false
        })
    }

    // 显示分类对话框
    showAddCategory = () => {
        this.setState({
            isShowAddCategory: true
        })
    }

    render() {

        // 展示请求回来的数据
        const { categoryis } = this.props;
        const { isShowAddCategory } = this.state;

        return (
            <Card title="分类列表" extra={
                <Button type="primary" onClick = {this.showAddCategory}>
                    <Icon type="plus" />
                    分类列表
                </Button>} >
                <Table

                    columns={this.columns}
                    dataSource={categoryis}
                    bordered
                    pagination={{ showSizeChanger: true, showQuickJumper: true, pageSizeOptions: ['3', '6', '9', '12'], defaultPageSize: 3 }}
                    rowKey='_id'
                />

                <Modal
                    title="添加分类"
                    visible={isShowAddCategory}
                    onOk={this.addCategory}
                    onCancel={this.hiddenAddCategory}
                    width={300}
                >
                <AddCategoryForm wrappedComponentRef={(form) => this.addCategoryForm = form} />
                </Modal>
            </Card>)
    }
}
export default Category