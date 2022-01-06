import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  TeamOutlined,
  UserOutlined,
  MacCommandOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Avatar } from "antd";
import "./SideNav.css";
import profileDefault from "./default.png";

const { Sider } = Layout;

class SideNav extends Component {
  state = {
    collapsed: false,
    collapsedWidth: 80,
    selectedKey: true,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };


  render() {
    return (
      <Fragment>
        <div
          className={
            this.state.collapsedWidth === 80
              ? this.state.collapsed
                ? "small"
                : "big"
              : null
          }
        />
        <Sider
          collapsible
          breakpoint="xs"
          collapsedWidth={this.state.collapsedWidth}
          onBreakpoint={(broken) => {
            if (broken) {
              this.setState({
                collapsedWidth: 0,
              });
            } else {
              this.setState({
                collapsedWidth: 80,
              });
            }
          }}
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          style={{
            zIndex: 4,
            position: "fixed",
            height: "100%",
          }}
          width={210}
          className={"sidescroll"}
        >
          <div className="ant-pro-sider-logo" id="sidenavpic">
            {/* <Link to={`/app/profile/${this.props.user.id}`}> */}
            {/* {this.props.user.photo ? (
              <Avatar
                size={60}
                style={{ margin: 10 }}
                src={this.props.user.photo}
              />
            ) : ( */}
            <Avatar size={60} style={{ margin: 10 }} src={profileDefault} />
            {/* )} */}
            {/* </Link> */}
          </div>
          <div id="sidescrollbar" style={{ overflow: "hidden auto" }}>
            <Menu
              theme="dark"
              selectedKeys={[window.location.pathname]}
              mode="inline"
            >
              <Menu.Item key="/" icon={<UserOutlined />}>
                <Link to={`/`}>Dashboard</Link>
              </Menu.Item>


              {/* {this.props.user.is_superuser ? (
                <Menu.Item key="/app/create-user" icon={<UserOutlined />}>
                  <Link to={`/app/create-user`}>Create User</Link>
                </Menu.Item>
              ) : null} */}

              {/* {this.props.user.is_superuser ? (
                <Menu.Item key="/app/manage-users" icon={<TeamOutlined />}>
                  <Link to={`/app/manage-users`}>Manage Users</Link>
                </Menu.Item>
              ) : null} */}
              <Menu.SubMenu
                key="/app/products"
                icon={<MacCommandOutlined />}
                title="Product"
              >
                <Menu.Item
                  key="/app/add-product"
                  icon={<MacCommandOutlined />}
                >
                  <Link
                    to={`/app/add-product`}
                  >
                    Add Product
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key={`/app/manage-products`}
                  icon={<CalendarOutlined />}
                >
                  <Link
                    to={`/app/manage-products`}
                  >
                    Manage Products
                  </Link>
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu
                key="/app/customers"
                icon={<MacCommandOutlined />}
                title="Customer"
              >
                <Menu.Item
                  key="/app/add-customer"
                  icon={<MacCommandOutlined />}
                >
                  <Link
                    to={`/app/add-customer`}
                  >
                    Add Customer
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key={`/app/manage-customers`}
                  icon={<CalendarOutlined />}
                >
                  <Link
                    to={`/app/manage-customers`}
                  >
                    Manage Customers
                  </Link>
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu
                key="/app/job-card"
                icon={<MacCommandOutlined />}
                title="Job Card"
              >
                <Menu.Item
                  key="/app/add-job-card"
                  icon={<MacCommandOutlined />}
                >
                  <Link
                    to={`/app/add-job-card`}
                  >
                    Add Job Card
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key={`/app/manage-job-cards`}
                  icon={<CalendarOutlined />}
                >
                  <Link
                    to={`/app/manage-job-cards`}
                  >
                    Manage Job Cards
                  </Link>
                </Menu.Item>
              </Menu.SubMenu>
              {/* <Menu.Item
                  key={`/app/allinvoice`}
                  icon={<CalendarOutlined />}
                >
                  <Link
                    to={`/app/allinvoice`}
                  >
                  All Invoice
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key={`/app/allquotation`}
                  icon={<CalendarOutlined />}
                >
                  <Link
                    to={`/app/allquotation`}
                  >
                    All Quotation
                  </Link>
                </Menu.Item> */}
              {/* <Menu.SubMenu
                key="/app/quatations"
                icon={<MacCommandOutlined />}
                title="Quatation"
              >
                <Menu.Item
                  key="/app/create-quatation"
                  icon={<MacCommandOutlined />}
                >
                  <Link
                    to={`/app/create-quatation`}
                  >
                    Create Quatation
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key={`/app/manage-quatations`}
                  icon={<CalendarOutlined />}
                >
                  <Link
                    to={`/app/manage-quatations`}
                  >
                    All Quatations
                  </Link>
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu
                key="/app/invoice"
                icon={<MacCommandOutlined />}
                title="Invoice"
              >
                <Menu.Item
                  key="/app/generate-invoice"
                  icon={<MacCommandOutlined />}
                >
                  <Link
                    to={`/app/generate-invoice`}
                  >
                    Generate Invoice
                  </Link>
                </Menu.Item>
                <Menu.Item
                  key={`/app/manage-invoices`}
                  icon={<CalendarOutlined />}
                >
                  <Link
                    to={`/app/manage-invoices`}
                  >
                    Manage Invoices
                  </Link>
                </Menu.Item> 
              </Menu.SubMenu>*/}

            </Menu>
          </div>
        </Sider>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, null)(SideNav);
