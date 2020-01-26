import React, { Component } from 'react';
import { Card, Button, Icon, Table, Modal, message } from 'antd';
import { connect } from 'react-redux';

import AddCategoryForm from './add-category-form';
import { getCategoryListAsync, addCategoryAsync, updateCategoryAsync, deleteCategoryAsync } from '$redux/actions';



@connect(state => ({ categoryis: state.categoryis }),
    {
        getCategoryListAsync,
        addCategoryAsync,
        updateCategoryAsync,
        deleteCategoryAsync
    })
class Category extends Component {

    // 定义状态
    state = ({
        isShowCategoryModal: false,
        category: {}
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
            // dataIndex: 'operation',
            render: (category) => {

                return (
                    <div>
                        <Button type="link" onClick={this.showCategoryModal(category)}>修改分类</Button>
                        <Button type="link" onClick={this.deleteCategory(category)}>删除分类</Button>
                    </div>
                )
            }
        },
    ];

    //删除分类
    deleteCategory = (category) => {
        return () => {
            Modal.confirm({
                title: `你确定要删除${category.name}分类吗？`,
                onOk: () => {
                    this.props.deleteCategoryAsync(category._id)
                    .then(() => {
                        message.success('删除分类成功')
                    })
                    .catch((err) => {
                        message.error(err);
                    })
                }
            })
        }
    }

    // 添加/修改 分类
    setCategory = () => {
        const { validateFields, resetFields } = this.addCategoryForm.props.form;
        const { category: { name, _id } } = this.state;

        // 验证表单，收集数据
        validateFields((err, values) => {
            if (!err) {
                const { categoryName } = values;

                let promise = null;

                if (name) {
                    //发送请求 修改
                    promise = this.props.updateCategoryAsync(_id, categoryName)
                } else {
                    // 发送请求 添加
                    promise = this.props.addCategoryAsync(categoryName)
                }
                promise.then(() => {
                    message.success(`${name ? '修改' : '添加'}分类成功`)

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
            isShowCategoryModal: false
        })
    }

    // 显示分类对话框
    showCategoryModal = (category = {}) => {
        return () => {
            this.setState({
                isShowCategoryModal: true,
                category,
            })
        }

    }

    //显示修改分类
    // showUpdateCategoryModal = (category) => {
    //     return () => {
    //         this.setState({
    //             isUpdateCategory: true,
    //             category
    //         })
    //         this.showCategoryModal()
    //     }
    // }

    render() {

        // 展示请求回来的数据
        const { categoryis } = this.props;
        const { isShowCategoryModal, category } = this.state;

        return (
            <Card title="分类列表" extra={
                <Button type="primary" onClick={this.showCategoryModal()}>
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
                    title={category.name ? "修改分类" : "添加分类"}
                    visible={isShowCategoryModal}
                    onOk={this.setCategory}
                    onCancel={this.hiddenAddCategory}
                    width={300}
                >
                    <AddCategoryForm categoryName={category.name} wrappedComponentRef={(form) => this.addCategoryForm = form} />
                </Modal>
            </Card>)
    }
}
export default Category