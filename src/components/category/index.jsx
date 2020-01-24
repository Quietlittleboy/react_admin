import React, { Component } from 'react';
import { Card, Button, Icon, Table } from 'antd';
// import withCheckLogin from '$cont/with-check-login';


// @withCheckLogin
class Category extends Component {


    render() {

        const columns = [
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

        const data = [
            {
                key: 1,
                name: '手机',
            },
            {
                key: 2,
                name: '电脑',
            },
            {
                key: 3,
                name: '手机',
            },
            {
                key: 4,
                name: '电脑',
            }
        ];

        return (
            <Card title="分类列表" extra={
                <Button type="primary">
                    <Icon type="plus" />
                    分类列表
                </Button>} >
                <Table

                    columns={columns}
                    dataSource={data}
                    bordered
                    pagination={{ showSizeChanger: true, showQuickJumper: true, pageSizeOptions: ['3', '6', '9', '12'], defaultPageSize: 3 }}
                />
            </Card>)
    }
}
export default Category