import React, { Component, useContext, useState, useEffect, useRef } from "react";
import MainLayout from "../../Layout/MainLayout";
import "antd/dist/antd.css";
import { update_jobcard, search, get_product_details,get_jobcard_details } from "../../../actions/crm";
import { Form, Input, Button, Select, Switch,Tooltip, InputNumber, Table, Popconfirm, DatePicker } from "antd";
import {
    LockOutlined,
    EditOutlined ,
} from "@ant-design/icons";
import { connect } from "react-redux";
import moment from "moment-timezone";


class CreateJobCard extends Component {
    onChangeLock = (value, index, record) => {
        this.setState({
            [`edit${record.key}`]: value,
        })
      };
    constructor(props) {
        super(props);
        this.state = {
            edit0:false,
            componentSize: "default",
            row_index: null,
            columns_list: [
                {
                    id: "product",
                    name: "Product",
                },
                {
                    id: "details",
                    name: "Details",
                },
                {
                    id: "unit",
                    name: "Unit",
                },
                {
                    id: "unit_price",
                    name: "Rate",
                },
                {
                    id: "quantity",
                    name: "Quantity",
                }
            ],
            columns: [
                {
                    title: 'Product',
                    dataIndex: 'product',
                    width: '30%',
                    // editable: true,
                    render: (text, record, index) => (
                        this.state[`edit${record.key}`]==false ||  this.state[`edit${record.key}`]==undefined)?
                        <Select
                            style={{ width: "100%" }}
                            placeholder={"Select Product"}
                            id={`product${record.index}`}
                            // onFocus={() => onFocus()}
                            filterOption={(input, option) =>
                                option.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                            allowClear
                            showSearch
                            onSearch={this.searchProduct}
                            onChange={(e,option )=> this.SelectProduct(option, index)}
                            value={text}
                            >
                            {this.props.all_products ?
                                this.props.all_products.map((pro, i) => (
                                    <Select.Option key={pro.id} value={pro.name}>
                                        {pro.name}
                                    </Select.Option>
                                ))
                                : null}
                        </Select>: <Input value={text} onChange={(e) => this.onChange(e, "product", index)} placeholder="enter product name" />
                },
                {
                    title: 'Details',
                    dataIndex: 'details',
                    render: (text, record, index) => (
                         this.state[`edit${record.key}`] == false ||  this.state[`edit${record.key}`]==undefined?
                        <h4>{text}</h4>:<Input onChange={(e) => this.onChange(e, "details", index)} placeholder="enter details" />
                    )
                },
                {
                    title: 'Unit',
                    dataIndex: 'unit',
                    render: (text, record, index) =>  (
                        <Select
                            onChange={e => this.SelectUnit(e, index)}
                            placeholder={"Select Unit"}
                            value={text}
                           >      
                           <Select.Option value="Sft">
                           Sft
                            </Select.Option>  
                            <Select.Option value="Piece">
                                        Piece
                            </Select.Option>                        
                        </Select>
                   )
                },
                {
                    title: 'Rate',
                    dataIndex: 'unit_price',
                    render: (text, record, index) =>  (
                        this.state[`edit${record.key}`] == false ||  this.state[`edit${record.key}`]==undefined?
                       <h4>{text}</h4>:<InputNumber value={text} placeholder="enter unit rate" id={`myLI${index}`} onChange={(e) => this.onChange(e, "unit_price", index)}/>
                   )
                },
                {
                    title: 'Quantity',
                    dataIndex: 'quantity',
                    render: (text, record, index) => (
                        <InputNumber min={0} value={text} onChange={(e) => this.onInputChange(e, "quantity", index)} />
                    )
                },
                {
                    title: 'Amount',
                    dataIndex: 'amount',
                    render: (text, record, index) => <h4>{text}</h4>

                },
                {
                    title: 'operation',
                    dataIndex: 'operation',
                    render: (_, record, index) =>
                        this.state.dataSource.length >= 1 ? (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(index)}>
                                <a>Delete</a>
                            </Popconfirm>
                        ) : null,
                },
            ],
            dataSource: [
                {
                    key: '0',
                    product: null,
                    details: null,
                    unit: null,
                    unit_price: 0,
                    quantity: 0,
                    amount: 0
                },
            ],
            count: 1
        };
    }
    formRef = React.createRef();
    onSearch = (value) => {
        if (value.length > 1) {
            this.props.search("customer", value);
        }
    };
    onFinish = (values) => {
        var total_amount= document.getElementById("total_amount").getAttribute("value")
        var cus
        // console.log(parseInt(values.customer.value),values.customer.value,typeof values.customer.value,'llllllllll')


        if (parseInt(values.customer.value)){
            cus=values.customer.value
        }
        else{
            cus=this.props.jobcard_details.jobCardDetails.customer
        }
        
        let body = {
            jobcard_data: {
                jobcard_number: values.jobcard_number,
                customer: cus,
                advance:values.advance,
                due:values.due,
                cheque_no:values.cheque_no,
                delivery_date:values['delivery_date']?values['delivery_date'].format('YYYY-MM-DD HH:mm:ss'):null,
                quotation_date:values['quotation_date']?values['quotation_date'].format('YYYY-MM-DD'):null,
                timestamp: new Date(),
                total_amount:total_amount,
            },
            jobcard_items: this.state.dataSource
        }
        console.log(values,'valuesvalues')
        this.props.update_jobcard(this.props.match.params.id,body);
    };
    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
       
        this.setState({
            dataSource: dataSource.filter((item,i) => i !== key),
        });
    };
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            product: null,
            details: null,
            unit: null,
            unit_price: 0,
            quantity: 0,
            amount: 0
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };

    onInputChange = (value, titlekey, index) => {
        var title
        let newData = this.state.dataSource;
        if ( document.getElementById(`myLI${index}`)){
            title = document.getElementById(`myLI${index}`).getAttribute("value");
        }
        else{
            title= newData[index]["unit_price"]
        }
        // let amount = value * newData[index]["unit_price"]
        let amount = value * title
        newData[index]["quantity"] = value
        newData[index]["amount"] = amount
        this.setState({
            dataSource: newData,
        })
    }
    onChange = (value, title, index) => {
        let newData = this.state.dataSource;
        if(title=="product" || title =="details"){
            newData[index][title] = value.target.value
        }
        else{
            newData[index][title] = value
        }
        this.setState({
            dataSource: newData,
        })
    }
    SelectUnit = (value, index) => {
        let newData = this.state.dataSource;
        
        newData[index]["unit"] = value
        this.setState({
            dataSource: newData,
        })
    }
    SelectProduct = (option, index) => {
        this.props.get_product_details(option.key)
        let newData = this.state.dataSource;
        newData[index]["product"] = option.children
        newData[index]["quantity"] = 0
        newData[index]["amount"] = 0

        this.setState({
            dataSource: newData,
            row_index: index
        })
    };
    componentDidMount(){
        if(this.props.match.params.id){
            this.props.get_jobcard_details(this.props.match.params.id)
        }
    }
    componentDidUpdate(prevpros, prevstate) {
        if (this.props.productdetails != prevpros.productdetails) {
            let newData = this.state.dataSource;
            let index = this.state.row_index
            newData[index]["details"] = this.props.productdetails.details
            newData[index]["unit_price"] = this.props.productdetails.unit_price
            this.setState({
                dataSource: newData,
            })
        }        
        if(this.props.jobcard_details!=prevpros.jobcard_details){
            this.formRef.current.setFieldsValue({
                jobcard_number:this.props.jobcard_details.jobCardDetails.jobcard_number,
                customer:{value:this.props.jobcard_details.jobCardDetails.customer_name},
                advance:this.props.jobcard_details.jobCardDetails.advance,
                due:this.props.jobcard_details.jobCardDetails.due,
                cheque_no:this.props.jobcard_details.jobCardDetails.cheque_no,
                delivery_date:this.props.jobcard_details.jobCardDetails.delivery_date?moment(this.props.jobcard_details.jobCardDetails.delivery_date, 'YYYY-MM-DD HH:mm:ss'):null,
                quotation_date:this.props.jobcard_details.jobCardDetails.quotation_date?moment(this.props.jobcard_details.jobCardDetails.quotation_date, 'YYYY-MM-DD'):null,
              });

            var dataSource=[]
            // console.log(this.props.jobcard_details.jobCardItems,'this.props.jobcard_details.jobCardItems')
            this.props.jobcard_details.jobCardItems.map((data,i)=>(
                dataSource.push(
                    {
                        key: i,
                        product: data.product,
                        details: data.details,
                        unit: data.unit,
                        unit_price: data.unit_price,
                        quantity: data.quantity,
                        amount: data.amount
                    }  
                )
            ))
            this.setState(
                {
                    dataSource:dataSource,
                    count: this.props.jobcard_details.jobCardItems.length,

                }
            )           
        }
    }

    searchProduct = (value) => {
        if (value.length > 1) {
            this.props.search("product", value);
        }

    }
    render() {
        if(!this.props.jobcard_details){
            return null
        }
        let { columns, dataSource } = this.state
        var total = 0
        this.state.dataSource.map((data)=>{
            total=total + data.amount
        })
        // console.log(this.state,'state')
        return (
            <MainLayout>
                <h1>Update Job Card</h1>
                <br />
                <Form
                    ref={this.formRef}
                    id="create-group-form"
                    onFinish={this.onFinish}
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 12,
                    }}
                    layout="horizontal"
                    initialValues={{ 
                        jobcard_number:this.props.jobcard_details.jobCardDetails.jobcard_number,
                        customer:{value:this.props.jobcard_details.jobCardDetails.customer_name},
                        advance:this.props.jobcard_details.jobCardDetails.advance,
                        due:this.props.jobcard_details.jobCardDetails.due,
                        cheque_no:this.props.jobcard_details.jobCardDetails.cheque_no,
                        delivery_date:this.props.jobcard_details.jobCardDetails.delivery_date?moment(this.props.jobcard_details.jobCardDetails.delivery_date, 'YYYY-MM-DD HH:mm:ss'):null,
                        quotation_date:this.props.jobcard_details.jobCardDetails.quotation_date?moment(this.props.jobcard_details.jobCardDetails.quotation_date, 'YYYY-MM-DD'):null,
                    }}
                >
                    <Form.Item
                        label="Job Card Number"
                        name="jobcard_number"
                        rules={[{ required: true, message: "Please input job card number!" }]}
                    >
                        <Input readOnly />
                    </Form.Item>
                    <Form.Item
                        label="Select Customer"
                        name="customer"
                        rules={[{ required: true }]}
                    >
                        <Select
                            showSearch
                            onSearch={this.onSearch}
                            labelInValue
                            style={{ width: "100%" }}
                            placeholder={"Select Customer"}
                            filterOption={(input, option) =>
                                option.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                            allowClear
                        >
                            {this.props.all_users_list  ? this.props.all_users_list.length > 0 ? (
                                this.props.all_users_list.map((user, i) => (
                                    <Select.Option key={i} value={`${user.id}`}>
                                        {`${user.name}`}
                                    </Select.Option>
                                ))
                            ) : null : null
                        }
                        </Select>
                    </Form.Item>
                    <div>

                        <Table
                            bordered
                            dataSource={dataSource}
                            columns={columns}
                            pagination={false}
                        />
                        <Button
                            onClick={this.handleAdd}
                            type="primary"
                            style={{
                                marginBottom: 16,
                            }}
                        >
                            Add new item
                        </Button>
                    </div>

                    <Form.Item
                        label="Total amount"
                    >
                        <InputNumber value={total} id="total_amount"/>
                    </Form.Item>
                    <Form.Item
                        label="Advance"
                        name="advance"
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="Due"
                        name="due"
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="cheque no"
                        name="cheque_no"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Delivery date"
                        name="delivery_date"
                    >
                       <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>
                    <Form.Item
                        label="Quotation date"
                        name="quotation_date"
                    >
                       <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                    <div style={{ textAlign: "center" }}>
                        {" "}
                        <Button type="primary" htmlType="submit">
                            Create Job Card
                        </Button>
                    </div>

                </Form>
            </MainLayout>
        );
    }
}

const mapStateToProps = (state) => ({
    all_users_list: state.crm.searchdata,
    all_products: state.crm.searchproduct,
    productdetails: state.crm.productdetails,
    jobcard_details: state.crm.jobcard_details

});

export default connect(mapStateToProps, {
    update_jobcard,
    get_product_details,
    search,
    get_jobcard_details
})(CreateJobCard);
