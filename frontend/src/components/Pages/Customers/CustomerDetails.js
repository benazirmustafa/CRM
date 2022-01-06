import React, { Component, Fragment } from "react";
import MainLayout from "../../Layout/MainLayout";
import {
    //   filter_data_function,
    get_customer_jobcards,
    get_customer_details

} from "../../../actions/crm";
import TableCommon from "../../Common/TableCommon/TableCommon";
import { connect } from "react-redux";
import {
    DeleteOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Row, Col, Collapse, Button, Switch, Tooltip } from "antd";
import DeleteModal from "../../Common/DeleteModal/DeleteModal";
import moment from 'dayjs';

const { Panel } = Collapse;

class CustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 2,
            offset: 0,
            page: 1,
            row_id: null,
            filter_data: null,
            currentpage: 1,
            columns_list: [
                {
                    id: "jobcard_number",
                    name: "Job Card No.",
                },
                {
                    id: "customer",
                    name: "Customer",
                },
                {
                    id: "timestamp",
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
        this.props.get_customer_details(this.props.match.params.id)
        this.props.get_customer_jobcards(this.props.match.params.id,this.state.offset, this.state.limit)
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
        this.props.get_customer_jobcards(
            this.props.match.params.id,
            offset,
            pageSize,
        );
    };
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
        if (textContent === "Created At") {
            return 118;
        }
        else {
            return 118;

        }
    };
   
    render() {

        if(!this.props.customer_details){
            return null
        }
        // table values section start
        let columns = [];

        columns = this.state.columns_list.map((col, i) => {
            var dictval = {};
            dictval["title"] = col.name;
            dictval["dataIndex"] = col.id;
            dictval["key"] = col.id;
            dictval["sorter"] = true;
            dictval["onHeaderCell"] = (column) => {
                return {
                    onClick: () => this.OrderColumn(col.name, column),
                };
            };

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
                                {/* <div id="fixed_action" style={{ display: "inline" }}>
                                    <Button
                                        type="link"
                                        style={{ color: "green" }}
                              
                                    >
                                        
                                        <DeleteOutlined style={{ color: "red" }} />
                                    </Button>
                                </div> */}
                                <div id="fixed_action" style={{ display: "contents" }}>
                                <Link to={`/app/job-card/${value.key}`}>Update</Link>
                                </div>
                                {/* <div id="fixed_action" style={{ display: "inline" }}>
                                    <Button
                                        type="link"
                                        style={{ color: "red" }}
                                        onClick={() => {
                                            this.showDeletedata(record);
                                        }}
                                    >
                                        <DeleteOutlined style={{ color: "red" }} />
                                    </Button>
                                </div> */}


                            </Fragment>
                            : null}
                    </Fragment>
                ),
            },
            {
                title: "Quotation",
                key: "quotation",
                fixed: "right",
                // width: this.state.screenWidth < 600 ? 64 : 180,
                render: (value, record, index) => (
                    <Fragment>
                        {this.props.user.is_superuser ?
                            <Fragment>
                                <div id="fixed_action" style={{ display: "contents" }}>
                                <Link to={`/app/quotation/${value.key}`}>Quotation</Link>
                                </div>
                            </Fragment>
                            : null}
                    </Fragment>
                ),
            },
            {
                title: "Invoice",
                key: "invoice",
                fixed: "right",
                // width: this.state.screenWidth < 600 ? 64 : 180,
                render: (value, record, index) => (
                    <Fragment>
                        {this.props.user.is_superuser ?
                            <Fragment>
                                <div id="fixed_action" style={{ display: "contents" }}>
                                <Link to={`/app/invoice/${value.key}`}>Invoice</Link>
                                </div>
                            </Fragment>
                            : null}
                    </Fragment>
                ),
            }
            );
        }

        var datatable = [];
        if (this.props.data) {
            datatable = this.props.data.results.map((data, i) => {
                return {
                    key: data.id,
                    jobcard_number: data.jobcard_number,
                    customer: data.customer_name,
                    created_at: data.created_at,
                };
            });
        }


        // table values section end
        return (
            <MainLayout>
                <h1>Customer Details</h1>
                <br />
                <p>Name : {this.props.customer_details.customer.name}</p>
                <p>Email : {this.props.customer_details.customer.email}</p>
                <p>Contact : {this.props.customer_details.customer.contact}</p>
                <p>Address : {this.props.customer_details.customer.address}</p>

                {/* <UpdateModal
                    ref={"childupdate"}
                    // searchData={this.searchData}
                    updateValues={this.updateValues}
                /> */}

                <DeleteModal ref={"childdelete"} deleteValues={this.deleteValues} />

                <Row>
                    <Col>
                        <TableCommon
                            xcontent={"max-content"}
                            // loading={this.props.data ? false : true}
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
    customer_details:state.crm.customer_details,
    data:state.crm.customer_jobcards
});

export default connect(mapStateToProps, {
    get_customer_jobcards,
    get_customer_details
})(CustomerDetails);
