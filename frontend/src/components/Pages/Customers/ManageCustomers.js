import React, { Component, Fragment } from "react";
import MainLayout from "../../Layout/MainLayout";
import {
    //   filter_data_function,
    manage_customers,
    edit_customer,
    delete_customer
} from "../../../actions/crm";
import TableCommon from "../../Common/TableCommon/TableCommon";
import { connect } from "react-redux";
import {
    DeleteOutlined
} from "@ant-design/icons";
import { Row, Col, Collapse, Button, Switch, Tooltip } from "antd";
import UpdateModal from "./UpdateModal";
import DeleteModal from "../../Common/DeleteModal/DeleteModal";
// import FilterPannel from "./FilterPannel";
// import {
//   get_installation_status,
// } from "../../../actions/dropOptions";
// import moment from "moment-timezone";
import moment from 'dayjs';
import { Link } from "react-router-dom";

const { Panel } = Collapse;

class ManageCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 20,
            offset: 0,
            page: 1,
            row_id: null,
            filter_data: null,
            currentpage: 1,
            columns_list: [
                {
                    id: "name",
                    name: "Customer Name",
                },
                {
                    id: "email",
                    name: "Email",
                },
                {
                    id: "address",
                    name: "Address",
                },
                {
                    id: "contact",
                    name: "Contact",
                },
                {
                    id: "created_at",
                    name: "Created At",
                },
            ],

            ordervalue: null,
            orderpattern: null,
            screenWidth: window.innerWidth,
            selectedRowKeys: [],
        };
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

    componentDidMount() {
        this.props.manage_customers(this.state.offset, this.state.limit)
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    pagechange = (page, pageSize) => {
        this.setState({
            page,
            currentpage: page,
        });
        var offset = (page - 1) * pageSize;
        var search = `?offset=${offset}&limit=${pageSize}`;
        this.props.history.push(this.props.location.pathname + search);
        this.props.manage_customers(
            offset,
            pageSize,
        );
    };
    updateValues = (values) => {
        var offset = (this.state.page - 1) * this.state.limit;
        this.props.edit_customer(
            values,
            this.state.row_id,
            offset,
            this.state.limit,
        );
        this.refs.childupdate.onCancel();
    };
    deleteValues = () => {
        var afterDeleteCount = this.props.data.count - 1;
        var totalpage = Math.ceil(afterDeleteCount / this.state.limit);
        var offset = (this.state.page - 1) * this.state.limit;
        if (this.state.page > totalpage && this.state.page !== 1) {
            offset = offset - this.state.limit;
            this.setState({
                page: this.state.page - 1,
                currentpage: this.state.page - 1,
            });
        }
        this.props.delete_customer(
            this.state.row_id,
            offset,
            this.state.limit,
        );
        this.refs.childdelete.onCancel();
    };
    // filterdatatable = (values) => {
    //     if (values["filters"]) {
    //         this.setState({
    //             filter_data: values,
    //             currentpage: 1,
    //             page: 1,
    //         });
    //         let search;
    //         var location = this.props.location.search;
    //         const regex = /\?offset=(\d*)&limit=(\d*)/s;
    //         if (/^(\?offset=(\d*)&limit=(\d*))$/.test(location)) {
    //             let m;
    //             var offset_value, limit_value;
    //             if ((m = regex.exec(location)) !== null) {
    //                 m.forEach((match, groupIndex) => {
    //                     if (groupIndex === 1 && parseInt(match) % this.state.limit === 0) {
    //                         offset_value = parseInt(match);
    //                     } else if (
    //                         groupIndex === 2 &&
    //                         parseInt(match) === this.state.limit
    //                     ) {
    //                         limit_value = parseInt(match);
    //                     }
    //                 });
    //             }
    //             if (limit_value && offset_value) {
    //                 search =
    //                     `?offset=${offset_value}&limit=${limit_value}&` +
    //                     filter_data_function(values);
    //             }
    //         } else {
    //             search = `?` + filter_data_function(values);
    //         }
    //         this.props.manage_customers(
    //             this.state.offset,
    //             this.state.limit,
    //         );
    //     }
    // };

    searchData = (type, value) => {
        var body = {
            search: value,
        };
        if (type === "user") {
            this.props.searchuser(type, body);
        } else {
            this.props.searchlist(type, body, "designkit");
        }
    };

    // for mobile screen
    updateDimensions = () => {
        this.setState({ screenWidth: window.innerWidth });
    };
    getTextWidth = (textContent) => {
        if (textContent === "Customer Name") {
            return 138;
        }
        if (textContent === "Email") {
            return 144;
        }
        if (textContent === "Address") {
            return 118;
        }
        if (textContent === "Contact") {
            return 118;
        }
        if (textContent === "Created At") {
            return 118;
        }
    };

    render() {

        // table values section start
        let columns = [];

        columns = this.state.columns_list.map((col, i) => {
            var dictval = {};
            dictval["title"] = col.name;
            dictval["dataIndex"] = col.id;
            dictval["key"] = col.id;
            dictval["sorter"] =  (col.id=="email" || col.id=="contact") ? false:
             (a, b) =>{
                if (col.id=="email" || col.id=="contact"){
                    return false
                }
                else if (col.id=="created_at"){
                    return  moment(a[col.id]).unix() - moment(b[col.id]).unix()
                }
                else{
                    return a[col.id].localeCompare(b[col.id])
                }
            }
            
            dictval["render"] = (value) => {
                if (col.name == "Created At") {

                    return (
                        <div style={{ minWidth: this.getTextWidth(col.name) }}>{moment(value).format("DD-MM-YYYY")}</div>
                    );
                }
                else {
                    return (
                        <div style={{ minWidth: this.getTextWidth(col.name) }}>{value}</div>
                    );
                }

            };
            return dictval;
        });
        if (this.props.user.is_superuser) {
            columns.push({
                title: "Update",
                key: "operation",
                fixed: "right",
                // width: this.state.screenWidth < 600 ? 64 : 180,
                render: (value, record, index) => (
                    <Fragment>
                        {this.props.user.is_superuser ?
                            <Fragment>
                                <div id="fixed_action" style={{ display: "inline" }}>
                                    <Link
                                        style={{ color: "green" }}
                                        to={`/app/customer/${value.key}`}
                                    // onClick={() => {
                                    //     this.showDeletedata(record);
                                    // }}
                                    >
                                        Details
                                        {/* <DeleteOutlined style={{ color: "red" }} /> */}
                                    </Link>
                                </div>
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
                                        <DeleteOutlined style={{ color: "red" }} />
                                    </Button>
                                </div>


                            </Fragment>
                            : null}
                    </Fragment>
                ),
            });
        }

        var datatable = [];
        if (this.props.data) {
            datatable = this.props.data.results.map((data, i) => {
                return {
                    key: data.id,
                    name: data.name,
                    email: data.email,
                    address: data.address,
                    contact: data.contact,
                    created_at: data.created_at,
                };
            });
        }


        // table values section end
        return (
            <MainLayout>
                <h1>Manage Customer</h1>
                <br />
                <Collapse defaultActiveKey={["1"]} style={{ background: "#0000001f" }}>
                    <Panel
                        header={<span style={{ fontSize: 17 }}>Filter Options</span>}
                        key="1"
                    // extra={this.FormatSetting()}
                    >
                        {/* <FilterPannel
                            filterdatatable={this.filterdatatable}
                            columns_list={filter_columns_list}
                            ip_vendor={this.props.ip_vendor}
                            ip_geometry_tech={this.props.ip_geometry_tech}
                            plm_details__qa_status={this.props.qa_status}
                            prioritise_qa={this.props.prioritise_qa}
                            installation_status={this.props.installation_status}
                            ip_library_name={this.state.ip_library_name}
                            plm_details__plm_lib_id={this.state.plm_lib_id}
                            // all_users={all_users}
                            all_users={this.state.all_users_list}
                            searchData={this.searchData}
                        /> */}
                    </Panel>
                </Collapse>

                <UpdateModal
                    ref={"childupdate"}
                    // searchData={this.searchData}
                    updateValues={this.updateValues}
                />

                <DeleteModal ref={"childdelete"} deleteValues={this.deleteValues} />

                <Row>
                    <Col>
                        <TableCommon
                            xcontent={"max-content"}
                            loading={this.props.data ? false : true}
                            data={datatable}
                            columns={
                                this.props.data
                                    ? this.props.data.results.length > 0
                                        ? columns
                                        : null
                                    : null
                            }
                            count={
                                this.props.data
                                    ? this.props.data.count
                                    : null
                            }
                            pageSize={this.state.limit}
                            currentpage={this.state.currentpage}
                            pagechange={this.pagechange}
                        />
                    </Col>
                </Row>
                <div style={{ height: 50 }}></div>
            </MainLayout>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    data: state.crm.customers
});

export default connect(mapStateToProps, {
    manage_customers,
    edit_customer,
    delete_customer
})(ManageCustomer);
