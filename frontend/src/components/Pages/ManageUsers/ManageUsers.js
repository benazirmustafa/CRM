import React, { Component, Fragment } from "react";
import TableCommon from "../../Common/TableCommon/TableCommon";
import MainLayout from "../../Layout/MainLayout";
import { Row, Col, Select, Button } from "antd";
import { connect } from "react-redux";
import {
  allusers,
  searchuser,
  updateuser,
  deleteuser,
  groups,
} from "../../../actions/users";
import UpdateModal from "./UpdateModal";
import DeleteModal from "../../Common/DeleteModal/DeleteModal";

class ManageUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 20,
      offset: 0,
      page: 1,
      currentpage: 1,
      row_id: null,
      columns_list: ["User Name", "Full Name", "Email", "Permission Group"],
    };
  }
  componentDidMount() {
    this.props.allusers(null, this.state.limit, this.state.offset);
    this.props.groups();
  }
  showUpdatetable(record) {
    this.setState({
      row_id: record.key,
    });
    this.refs.childupdate.showModal(record);
  }
  showDeletedata(record) {
    this.setState({
      row_id: record.key,
    });
    this.refs.childdelete.showModal(record);
  }
  updateValues = (values, record) => {
    // record.comments = values.comments;
    // record.installation_status_details = values.installation_status_details;
    // record.qa_outlook = values.qa_outlook;

    var rec = {
      username: values.user_name,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      is_superuser: values.superuser,
      groups: values.permission_group,
    };

    var offset = (this.state.page - 1) * this.state.limit;
    this.props.updateuser(this.state.limit, offset, this.state.row_id, rec);
    this.refs.childupdate.onCancel();
  };
  deleteValues = () => {
    var afterDeleteCount = this.props.all_users.count - 1;
    var totalpage = Math.ceil(afterDeleteCount / this.state.limit);
    var offset = (this.state.page - 1) * this.state.limit;
    if (this.state.page > totalpage && this.state.page !== 1) {
      offset = offset - this.state.limit;
      this.setState({
        page: this.state.page - 1,
        currentpage: this.state.page - 1,
      });
    }
    this.props.deleteuser(this.state.limit, offset, this.state.row_id);
    this.refs.childdelete.onCancel();
  };
  pagechange = (page, pageSize) => {
    this.setState({
      page,
      currentpage: page,
    });
    var offset = (page - 1) * pageSize;
    this.props.allusers(null, pageSize, offset);
  };
  Search = () => {
    var body = null;
    if (this.state.user || this.state.group) {
      // if (this.state.user !== "All" || this.state.group) {
      body = {
        username: this.state.user,
        group: this.state.group,
      };
      // }
    }
    this.setState({
      page: 1,
      currentpage: 1,
    });
    this.props.allusers(body, this.state.limit, this.state.offset);
  };
  ChangeOption(value, search) {
    this.setState({
      [search]: value,
    });
  }
  onSearch = (value) => {
    var body = {
      search: value,
    };
    if (value.length > 1) {
      this.props.searchuser("user", body);
    }
  };
  render() {
    // table values section start
    let columns = [];
   

    columns = this.state.columns_list.map((col, i) => {
      var dictval = {};
      var txt = "";
      txt = col.replace(/\s+/g, "");
      dictval["title"] = col;
      dictval["dataIndex"] = txt.toLowerCase();
      dictval["key"] = txt.toLowerCase();
      if(col ==="Permission Group" ){
        dictval["render"] = (value, row, index) => {
          return Array.isArray(value)
            ? value.map(
                (grp, i) =>
                  `${grp.name}${i === value.length - 1 ? "" : ", "}`
              )
            : value;
        }
      }
      return dictval;
    });
    columns.push({
      title: "Update",
      key: "operation",
      fixed: "right",
      //   width: 167,
      render: (text, record, index) => (
        <Fragment>
          <div id="fixed_action" style={{ display: "contents" }}>
            <Button
              type="link"
              onClick={() => {
                this.showUpdatetable(record);
              }}
            >
              Update
            </Button>
          </div>
          <div id="fixed_action" style={{ display: "inline" }}>
            <Button
              type="link"
              style={{ color: "red" }}
              onClick={() => {
                this.showDeletedata(record);
              }}
            >
              Delete
            </Button>
          </div>
        </Fragment>
      ),
    });
    var datatable = [];
    // var serial = (this.state.page - 1) * this.state.limit;
    if (this.props.all_users) {
      this.props.all_users.results.map((data, i) => {
        datatable.push({
          key: data.id,
          username: data.username,
          fullname:
            (data.first_name ? data.first_name : "") +
            " " +
            (data.last_name ? data.last_name : ""),
          first_name: data.first_name,
          last_name: data.last_name ? data.last_name : "",
          email: data.email,
          superuser: data.is_superuser,
          permissiongroup: data.is_superuser
            ? "Admin"
            : data.user_groups.length > 0
            ? data.user_groups
            : null,
        });
        return null;
      });
    }
    // table values section end
    var all_users = [];
    if (this.props.all_users_list) {
      this.props.all_users_list.map((value) =>
        all_users.push({
          id: value.id,
          name: value.username,
        })
      );
    }
    // all_users.push({
    //   id: "all",
    //   name: "All",
    // });
    return (
      <MainLayout>
        <h1>Manage Users </h1>
        <br />
        <Row gutter={[20, 20]}>
          <Col lg={24}>
            <Select
              showSearch
              allowClear
              // mode="multiple"
              onSearch={this.onSearch}
              style={{ marginRight: 10, width: 239 }}
              placeholder="Please select User"
              onChange={(e) => this.ChangeOption(e, "user")}
            >
              {all_users.map((values, i) => (
                <Select.Option key={i} value={values.name}>
                  {values.name}
                </Select.Option>
              ))}
            </Select>
            <Select
              // style={{ width: "100%" }}
              allowClear
              style={{ display: "inline-block", width: 239, marginRight: 10 }}
              placeholder="Please select Group"
              onChange={(e) => this.ChangeOption(e, "group")}
            >
              <Select.Option value={"Admin"}>Admin</Select.Option>
              {this.props.all_groups
                ? this.props.all_groups.map((group, i) => (
                    <Select.Option key={i} value={group.id}>
                      {group.name}
                    </Select.Option>
                  ))
                : null}
            </Select>
            <Button
              style={{
                marginRight: 10,
                background: "#06adc4",
                color: "white",
              }}
              onClick={this.Search}
            >
              Search
            </Button>
          </Col>

          <Col lg={24}>
            <TableCommon
              loading={this.props.all_users ? false : true}
              data={datatable}
              columns={columns}
              count={this.props.all_users ? this.props.all_users.count : null}
              pageSize={this.state.limit}
              currentpage={this.state.currentpage}
              pagechange={this.pagechange}
            />
          </Col>
        </Row>{" "}
        <UpdateModal
          ref={"childupdate"}
          updateValues={this.updateValues}
          all_groups={this.props.all_groups}
        />
        <DeleteModal ref={"childdelete"} deleteValues={this.deleteValues} />
      </MainLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  all_users: state.users.all_users,
  all_users_list: state.users.all_users_list,
  all_groups: state.users.all_groups,
});

export default connect(mapStateToProps, {
  allusers,
  updateuser,
  deleteuser,
  searchuser,
  groups,
})(ManageUsers);
