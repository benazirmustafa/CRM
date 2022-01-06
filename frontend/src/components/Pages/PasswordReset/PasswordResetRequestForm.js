import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Result } from "antd";
import { Link } from "react-router-dom";
import { resetPasswordRequest } from "../../../actions/auth";
import "antd/dist/antd.css";

const FormItem = Form.Item;

class PasswordResetRequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      email: null,
    };
  }
  handleSubmit(event) {
    const body = JSON.stringify({
      email: event.email,
    });
    this.setState({
      saving: true,
      email: event.email,
    });
    this.props.resetPasswordRequest(body);
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.success && this.props.success) {
      this.setState({
        success: true,
      });
    }
  }
  render() {
    return (
      <div className="container-login100">
        {this.state.success ? (
          <div className="p-t-30 p-b-50">
            <Result
              status="success"
              title="Successfully Sent Password Reset Instructions"
              subTitle={`Please follow the instructions sent to ${this.state.email} to reset your password.`}
              extra={[
                <Button type="primary" key="console">
                  <Link to={`/login`}>Go Back to Login Page</Link>
                </Button>,
              ]}
            />
          </div>
        ) : (
          <div className="wrap-login100 p-t-30 p-b-50">
            <span className="login100-form-title p-b-41">Reset Password</span>
            <Form
              onFinish={(event) => this.handleSubmit(event)}
              onFinishFailed={this.onFinishFailed}
            >
              <FormItem
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input
                  size="large"
                  // prefix={<UserOutlined style={{ fontSize: 13 }} />}
                  placeholder="Enter Your Email"
                />
              </FormItem>

              <div style={{ position: "relative", height: 100 }}>
                <Fragment>
                  {/* <div style={{ position: "absolute", top: 0, width: "100%" }}>
                  <p
                    style={{
                      color: "red",
                      textAlign: "center",
                    }}
                  >
                    {this.props.credentials
                      ? ""
                      : "Incorrect Username or Password"}
                  </p>
                </div> */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      flexDirection: "row",
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      loading={this.props.loading}
                    >
                      Submit
                    </Button>
                  </div>
                </Fragment>
              </div>
            </Form>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loadingRequest,
  success: state.auth.isSuccess,
});

export default connect(mapStateToProps, { resetPasswordRequest })(
  PasswordResetRequestForm
);
