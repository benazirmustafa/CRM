import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Modal, Form, Input, InputNumber, Select, Spin } from "antd";


class UpdateModal extends Component {
  updateFormRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      modalvisible: false,
      row_id: null,
      serial: null,
      record: null,
    };
  }

  showModal(record) {
    this.setState({
      modalvisible: true,
      serial: record.serial,
      record,
      componentSize: "default",
      setComponentSize: "default",
    });
  }
  onCancel() {
    this.setState({
      modalvisible: false,
    });
  }

  onSubmit = (values) => {
    this.props.updateValues(values);
  };

  render() {
    if (!this.state.record) {
      return null;
    }
    return (
      <Modal
        destroyOnClose={true}
        title={`Update Customer`}
        visible={this.state.modalvisible}
        onCancel={() => this.onCancel()}
        width={700}
        style={{ top: 20 }}
        okText="Update"
        maskClosable={false}
        // closable={!this.props.saving}
        // cancelButtonProps={{
        //   disabled: this.props.saving,
        // }}
        okButtonProps={{
          form: "updateform",
          key: "submit",
          htmlType: "submit",
        }}
      >
        <Spin spinning={false}>
          <Form
            // preserve={false}
            ref={this.updateFormRef}
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
            size={this.state.componentSize}
            initialValues={{
              name: this.state.record.name,
              email: this.state.record.email,
              address: this.state.record.address,
              contact: this.state.record.contact
            }}
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
          </Form>
        </Spin>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, null, null, {
  forwardRef: true,
})(UpdateModal);
