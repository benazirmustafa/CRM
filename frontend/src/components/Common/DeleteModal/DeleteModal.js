import React, { Component } from "react";
import { Modal } from "antd";

class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalvisible: false,
      id: null,
    };
  }

  showModal(id) {
    this.setState({
      modalvisible: true,
      id: id,
    });
  }
  onCancel() {
    this.setState({
      modalvisible: false,
    });
  }
  onOk = () => {
    this.props.deleteValues(this.state.id);
  };
  render() {
    return (
      <Modal
        destroyOnClose={true}
        title={`Delete`}
        visible={this.state.modalvisible}
        onCancel={() => this.onCancel()}
        cancelButtonProps={{
          disabled: this.props.saving,
        }}
        closable={!this.props.saving}
        maskClosable={false}
        okText="Delete"
        onOk={this.onOk}
        okButtonProps={{
          style: { background: "red", color: "white" },
          loading: this.props.saving,
        }}
      >
        Are you sure you want to <b>delete</b>?
      </Modal>
    );
  }
}

export default DeleteModal;
