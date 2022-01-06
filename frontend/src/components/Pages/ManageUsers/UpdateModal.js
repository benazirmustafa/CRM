import React, { Component } from "react";
import { Modal, Form, Input, Checkbox, Select } from "antd";

class UpdateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalvisible: false,
      row_id: null,
      serial: null,
      record: null,
      admin: null,
    };
  }

  showModal(record) {
    this.setState({
      modalvisible: true,
      serial: record.username,
      record,
      admin: record.superuser,
      componentSize: "default",
      setComponentSize: "default",
    });
  }
  onCancel() {
    this.setState({
      modalvisible: false,
    });
  }
  Isadmin = (e) => {
    this.setState({
      admin: e.target.checked,
    });
  };
  onSubmit = (values) => {
    this.props.updateValues(values, this.state.record);
  };
  render() {
    if (!this.state.record) {
      return null;
    }
    var defgroup = [];
    if (Array.isArray(this.state.record.permissiongroup)) {
      defgroup = this.state.record.permissiongroup.map((grp) => {
        return grp.id;
      });
    }
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16,
      },
    };
    return (
      <Modal
        destroyOnClose={true}
        title={`Update User: ${this.state.serial}`}
        visible={this.state.modalvisible}
        onCancel={() => this.onCancel()}
        okText="Update"
        okButtonProps={{
          form: "updateform",
          key: "submit",
          htmlType: "submit",
        }}
      >
        <Form
          preserve={false}
          id="updateform"
          onFinish={this.onSubmit}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          labelAlign="left"
          layout="horizontal"
          initialValues={{
            user_name: this.state.record.username,
            first_name: this.state.record.first_name,
            last_name: this.state.record.last_name,
            email: this.state.record.email,
            permission_group: defgroup,
            superuser: this.state.admin,
          }}
        >
          <Form.Item
            label="User Name"
            name="user_name"
            rules={[{ required: true, message: "Please input user name!" }]}
          >
            <Input placeholder="User Name" disabled />
          </Form.Item>
          <Form.Item label="Full Name" style={{ marginBottom: 0 }}>
            <Form.Item
              name="first_name"
              rules={[{ required: true, message: "Please input first name!" }]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input placeholder="Fisrt Name" disabled />
            </Form.Item>
            <Form.Item
              name="last_name"
              rules={[{ required: false }]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 8px",
              }}
            >
              <Input placeholder="Last Name" disabled />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input email!" }]}
          >
            <Input placeholder="Email" disabled />
          </Form.Item>
          <Form.Item {...tailLayout} name="superuser" valuePropName="checked">
            <Checkbox onChange={this.Isadmin}>Admin</Checkbox>
          </Form.Item>
          {this.state.admin ? null : (
            <Form.Item
              label="Permission Group"
              name="permission_group"
              rules={[
                {
                  required: true,
                  message: "Please input user group permission!",
                },
              ]}
            >
              <Select mode="multiple">
                {this.props.all_groups
                  ? this.props.all_groups.map((group, i) => (
                      <Select.Option key={i} value={group.id}>
                        {group.name}
                      </Select.Option>
                    ))
                  : null}
              </Select>
            </Form.Item>
          )}

          {/* <Form.Item
            name="image"
            label="Upload Image"
            valuePropName="fileList"
            getValueFromEvent={this.normFile}
            extra=""
          >
            <Upload
              onChange={this.ChangePicture}
              beforeUpload={() => false}
              name="pic"
              listType="picture"
            >
              <Button>
                <UploadOutlined /> Click to upload
              </Button>
            </Upload>
          </Form.Item> */}
        </Form>
      </Modal>
    );
  }
}

export default UpdateModal;
