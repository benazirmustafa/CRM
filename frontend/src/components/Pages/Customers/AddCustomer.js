import React, { Component } from "react";
import MainLayout from "../../Layout/MainLayout";
import "antd/dist/antd.css";
import { add_customer } from "../../../actions/crm";
import { Form, Input, Button, InputNumber } from "antd";

import { connect } from "react-redux";

class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            componentSize: "default",
        };
    }
    formRef = React.createRef();

    onFinish = (values) => {
        values.created_at = new Date();

        this.props.add_customer(values);
        this.formRef.current.resetFields();
    };
    render() {
        return (
            <MainLayout>
                <h1>Add Customer</h1>
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
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please input customer name!" }]}
                    >
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: false, message: "Please input email!" }]}
                    >
                        <Input type="email" placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: "Please input address!" }]}
                    >
                        <Input placeholder="Address" />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="contact"
                        rules={[{ required: true, message: "Please input phone number!" }]}
                    >
                        <Input placeholder="Phone Number" />
                    </Form.Item>
                    <div style={{ textAlign: "center" }}>
                        {" "}
                        <Button type="primary" htmlType="submit">
                            Add Customer
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
    add_customer,
})(AddCustomer);
