import { Menu, Breadcrumb, Icon,message,Upload,Table} from 'antd';
import React, { Component, PropTypes } from 'react';
import './mainlayout.less'
const SubMenu = Menu.SubMenu;
const MainLayout = React.createClass({
  getInitialState() {
    return {
      collapse: true,
    };
  },
  onCollapseChange() {
    this.setState({
      collapse: !this.state.collapse,
    })
  },
  render() {
    const collapse = this.state.collapse;
    return (
      <article className="window-frame focus">
        <header className="top-bar">
          <div className="controls">
            <div className="control close" />
            <div className="control minify" />
            <div className="control expand" />
          </div>
          <input className="address-bar" defaultValue="http://www.example.com" />
        </header>
        <section className="window-content">
            <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>
              <aside className="ant-layout-sider">
                <div className="ant-layout-logo"></div>
                <Menu mode="inline" theme="dark" defaultSelectedKeys={['user']}>
                  <Menu.Item key="user">
                    <Icon type="user" /><span className="nav-text">IP 库管理</span>
                  </Menu.Item>
                  <Menu.Item key="setting">
                    <Icon type="setting" /><span className="nav-text">调度信息管理</span>
                  </Menu.Item>
                  <Menu.Item key="laptop">
                    <Icon type="laptop" /><span className="nav-text">导航三</span>
                  </Menu.Item>
                  <Menu.Item key="notification">
                    <Icon type="notification" /><span className="nav-text">导航四</span>
                  </Menu.Item>
                  <Menu.Item key="folder">
                    <Icon type="folder" /><span className="nav-text">导航五</span>
                  </Menu.Item>
                </Menu>
                <div className="ant-aside-action" onClick={this.onCollapseChange}>
                  {collapse ? <Icon type="right" /> : <Icon type="left" />}
                </div>
              </aside>
              <div className="ant-layout-main">
                <div className="ant-layout-header"></div>
                <div className="ant-layout-breadcrumb">
                  <Breadcrumb>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>应用列表</Breadcrumb.Item>
                    <Breadcrumb.Item>某应用</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
                <div className="ant-layout-container">
                  <div className="ant-layout-content">
                    <div style={{ height: 220 }}>
                       <div>
                          <div >
                            {this.props.children}
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="ant-layout-footer">
                loadBalance 版权所有 © 2016 蜗牛上海技术部支持
                </div>
              </div>
            </div>
        </section>
      </article>
    );
  },
});

export default MainLayout
