import React, { Component } from "react";
import MainLayout from "../../Layout/MainLayout";
import "antd/dist/antd.css";
import { change_password } from "../../../actions/users";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentSize: "default",
    };
  }
  formRef = React.createRef();
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  onFinish = (values) => {
    var body = {
      old_password: values.old_password,
      new_password: values.password,
    };
    this.props.change_password(body);
    this.formRef.current.resetFields();
  };
  ChangePicture = (e) => {
    //
  };
  render() {
    return (
      <MainLayout>
        <h1>Change Current Password</h1>
        <br />
        <Form
          ref={this.formRef}
          id="profile-form"
          onFinish={this.onFinish}
          // labelAlign="left"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 12,
          }}
          layout="horizontal"
        >
          <Form.Item
            name="old_password"
            label="Old Password"
            rules={[
              {
                required: true,
                message: "Please input your old password!",
              },
            ]}
          >
            <Input.Password autoComplete="new-password" />
          </Form.Item>
          <Form.Item
            name="password"
            label="New Password"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password autoComplete="new-password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <div style={{ textAlign: "center" }}>
            {" "}
            <Button type="primary" htmlType="submit">
              Change Password
            </Button>
          </div>
        </Form>
      </MainLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  msg: state.alerts.msg,
});

export default connect(mapStateToProps, {
  change_password,
})(Profile);
