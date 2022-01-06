import React, { Component } from "react";
import MainLayout from "../../Layout/MainLayout";
import "antd/dist/antd.css";
import { create_user, groups } from "../../../actions/users";
import { Form, Input, Button, Upload, Select, Checkbox } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentSize: "default",
      admin: false,
      saving: false,
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
    this.setState({
      saving: true,
    });
    let form_data = new FormData();
    if (values.image) {
      form_data.append("photo", values.image[0].originFileObj);
    }
    form_data.append("email", values.email);
    form_data.append("is_superuser", this.state.admin);
    form_data.append("username", values.username);
    form_data.append("first_name", values.first_name);

    if (values.group) {
      values.group.forEach((item) => {
        form_data.append("groups", item);
      });
    }

    if (values.last_name) {
      form_data.append("last_name", values.last_name);
    }
    form_data.append("is_active", true);
    this.props.create_user(form_data);
    this.setState({
      admin: false,
    });
  };

  componentDidMount() {
    this.props.groups();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isSaving && !this.props.isSaving) {
      if (this.props.isSuccess) {
        this.formRef.current.resetFields();
      }
    }
  }

  Isadmin = (e) => {
    this.setState({
      admin: e.target.checked,
    });
  };

  render() {
    const tailLayout = {
      wrapperCol: {
        offset: 6,
        span: 16,
      },
    };
    // this.props.all_groups;
    return (
      <MainLayout>
        <h1>Create User</h1>
        <br />
        <Form
          ref={this.formRef}
          id="create-user-form"
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
          <Form.Item label="Username">
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  // pattern:
                  //   "^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$",
                },
              ]}
            >
              <Input placeholder="Username" onChange={this.validateUsername} />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Full Name" style={{ marginBottom: 0 }}>
            <Form.Item
              name="first_name"
              rules={[{ required: true, message: "Please input first name!" }]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input placeholder="Fisrt Name" />
            </Form.Item>
            <Form.Item
              name="last_name"
              rules={[{ required: true, message: "Please input last name!" }]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 8px",
              }}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Email">
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input a valid email address!",
                  type: "email",
                },
              ]}
            >
              <Input placeholder="Email Adrress" />
            </Form.Item>
          </Form.Item>
          <Form.Item {...tailLayout} name="superuser" valuePropName="checked">
            <Checkbox onChange={this.Isadmin}>Admin</Checkbox>
          </Form.Item>
          {this.state.admin ? null : (
            <Form.Item label="Permission Group">
              <Form.Item
                name="group"
                rules={[
                  {
                    required: true,
                    message: "Please select user permission groups!",
                  },
                ]}
              >
                <Select
                  allowClear
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Please select group"
                >
                  {this.props.all_groups
                    ? this.props.all_groups.map((group, i) => (
                        <Select.Option key={i} value={group.id}>
                          {group.name}
                        </Select.Option>
                      ))
                    : null}
                </Select>
              </Form.Item>
            </Form.Item>
          )}
          <Form.Item
            name="image"
            label="Upload Image"
            valuePropName="fileList"
            getValueFromEvent={this.normFile}
            extra=""
          >
            <Upload
              // onChange={this.ChangePicture}
              beforeUpload={() => false}
              name="pic"
              listType="picture"
            >
              <Button>
                <UploadOutlined /> Click to upload
              </Button>
            </Upload>
          </Form.Item>
          <div style={{ textAlign: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={this.props.isSaving}
            >
              Create User
            </Button>
          </div>
        </Form>
      </MainLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  msg: state.alerts.msg,
  all_groups: state.users.all_groups,
  isSuccess: state.users.isSuccess,
  isSaving: state.users.isSaving,
});

export default connect(mapStateToProps, {
  create_user,
  groups,
})(CreateUser);
