import React, { Component } from "react";
import MainLayout from "../../Layout/MainLayout";
import "antd/dist/antd.css";
import { add_product } from "../../../actions/crm";
import { Form, Input, Button, InputNumber } from "antd";

import { connect } from "react-redux";

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            componentSize: "default",
        };
    }
    formRef = React.createRef();

    onFinish = (values) => {

        this.props.add_product(values);
        this.formRef.current.resetFields();
    };
    render() {
        return (
            <MainLayout>
                <h1>Add Product</h1>
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
                >
                    <Form.Item
                        label="Product Name"
                        name="name"
                        rules={[{ required: true, message: "Please input product name!" }]}
                    >
                        <Input placeholder="Product Name" />
                    </Form.Item>
                    <Form.Item
                        label="Product Details"
                        name="details"
                        rules={[{ required: false, message: "Please input product details!" }]}
                    >
                        <Input placeholder="Product Details" />
                    </Form.Item>
                    <Form.Item
                        label="Unit Price (BDT)"
                        name="unit_price"
                        rules={[{ required: true, message: "Please input unit price!" }]}
                    >
                        <InputNumber placeholder="Unit Price" />
                    </Form.Item>
                    <div style={{ textAlign: "center" }}>
                        {" "}
                        <Button type="primary" htmlType="submit">
                            Add Product
                        </Button>
                    </div>
                </Form>
            </MainLayout>
        );
    }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {
    add_product,
})(AddProduct);
