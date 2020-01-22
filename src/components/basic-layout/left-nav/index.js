import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter} from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import menus from '$conf/menus';

const { SubMenu, Item } = Menu;
@withRouter
class LeftNav extends Component {

// 遍历菜单项
 createMenus = menus => {

    return menus.map(menu => {
        // 二级菜单
        if (menu.children) {
          return (
            <SubMenu
              key={menu.path}
              title={
                <span>
                  <Icon type={menu.icon} />
                  <FormattedMessage id = {menu.title}/>
                  {/* <span>{menu.title}</span> */}
                </span>
              }
            >
              {menu.children.map(cMenu => {
                return this.createMenuItem(cMenu);
              })}
            </SubMenu>
          )

        } else { // 一级菜单
          return this.createMenuItem(menu);

        }
      }

    )
  }

  // 复用代码
  createMenuItem = menu => {
    return (
      <Item key={menu.path}>
        <Link to={menu.path}>
        <Icon type={menu.icon} />
        <FormattedMessage id = {menu.title}/>
        {/* <span>{menu.title}</span> */}
        </Link>
        
      </Item>
    )
  } 
  

  findOpenkeys = (pathname, menus) => {

    const menu = menus.find(menu => menu.children && menu.children.find(cMenu => cMenu.path === pathname))
      
    if(menu){
      return menu.path;
    }
  }


  render() {
   const {pathname} = this.props.location;
   const openkeys = this.findOpenkeys(pathname, menus);
    return (
      <Menu theme="dark" 
      defaultSelectedKeys={[pathname]} 
      defaultOpenKeys={[openkeys]}
      mode="inline">
        {/* {console.log(openkeys)} */}
        
        {this.createMenus(menus)}
        
      </Menu>
    )
  }
}
export default LeftNav;