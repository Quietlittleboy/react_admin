import React,{Component} from 'react';
import {Menu, Icon} from 'antd';

const{SubMenu, Item} = Menu;



export default class LeftNav extends Component{
    render(){
        return(
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Item key="1">
              <Icon type="home" />
              <span>首页</span>
            </Item>

            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="appstore" />
                  <span>商品</span>
                </span>
              }
            >
              <Item key="3">
                <Icon type="bars" />
                <span>分类管理</span>
              </Item>
              <Item key="4">
                <Icon type="tool" />
                <span>商品管理</span>
              </Item>
            </SubMenu>

            <Item key="5">
              <Icon type="user" />
              <span>用户管理</span>
            </Item>
            <Item key="6">
              <Icon type="safety-certificate" />
              <span>权限管理</span>
            </Item>

            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="area-chart" />
                  <span>图形图标</span>
                </span>
              }
            >
              <Item key="7">
                <Icon type="bar-chart" />
                <span>柱状图</span>

              </Item>
              <Item key="8">
                <Icon type="line-chart" />
                <span>折线图</span>
              </Item>

              <Item key="9">
                <Icon type="pie-chart" />
                <span>饼状图</span>
              </Item>
            </SubMenu>
          </Menu>
        )
    }
}