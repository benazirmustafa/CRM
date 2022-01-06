import React, { Component, Fragment } from "react";
import { Table } from "antd";
import "./TableCommon.css";
class TableCommon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHiddenRow: false,
    };
  }

  showHiddenRows = () => {
    this.setState({ showHiddenRow: !this.state.showHiddenRow });
    this.props.showHiddenRows();
  };

  getFragment = (total, total_hidden) => {
    if (total_hidden !== undefined) {
      if (!this.state.showHiddenRow) {
        return (
          <Fragment>
            Showing {total} items,{" "}
            <a
              href
              onClick={() => {
                this.showHiddenRows();
              }}
            >
              {total_hidden} Hidden Items
            </a>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            Showing {total_hidden} Hidden Items,{" "}
            <a
              href
              onClick={() => {
                this.showHiddenRows();
              }}
            >
              Go Back
            </a>
          </Fragment>
        );
      }
    } else {
      return <Fragment>Total {total} items</Fragment>;
    }
  };

  getTotal = () => {
    if (this.props.total_hidden !== undefined) {
      if (!this.state.showHiddenRow) {
        return this.props.count > 0 ? this.props.count : 1;
      } else {
        return this.props.total_hidden > 0 ? this.props.total_hidden : 1;
      }
    } else {
      return this.props.count;
    }
  };

  render() {
    return (
      <Table
        columns={this.props.columns}
        dataSource={this.props.data}
        tableLayout="fixed"
        rowSelection={this.props.rowSelection}
        onRow={this.props.onRow}
        size="small"
        scroll={{ x: this.props.xcontent, y: 500 }}
        loading={this.props.loading}
        bordered
        // onChange={this.handleTableChange}
        rowClassName={this.props.rowClassName}
        pagination={{
          pageSize: this.props.pageSize,
          position: ["topRight"],
          // total: this.props.count,
          total: this.getTotal(),
          // total: 1,
          onChange: this.props.pagechange,
          size: "large",
          hideOnSinglePage: false,
          // simple: true,
          current: this.props.currentpage,
          showSizeChanger: false,
          showQuickJumper: true,
          // showTotal: (total) => `Total ${total} items`,
          showTotal: (total) =>
            this.getFragment(this.props.count, this.props.total_hidden),
        }}
      />
    );
  }
}

export default TableCommon;
