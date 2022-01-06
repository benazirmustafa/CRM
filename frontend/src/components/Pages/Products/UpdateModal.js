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
        title={`Update Product`}
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
              details: this.state.record.details,
              unit_price: this.state.record.unit_price,
            }}
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
