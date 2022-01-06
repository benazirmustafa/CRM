import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Result, Spin } from "antd";
import { Link, Redirect } from "react-router-dom";
import { validateResetToken, resetPassword } from "../../../actions/auth";
import "antd/dist/antd.css";

class PasswordResetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.match.params.resetToken,
      spinning: true,
      validated: true,
      success: false,
    };
  }

  componentDidMount() {
    const body = JSON.stringify({
      token: this.state.token,
    });
    this.props.validateResetToken(body);
  }

  handleSubmit(event) {
    const body = JSON.stringify({
      password: event.password,
      token: this.state.token,
    });
    this.props.resetPassword(body);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.validatingToken && !this.props.validatingToken) {
      if (this.props.tokenValidated) {
        this.setState({
          spinning: false,
          validated: true,
        });
      } else {
        this.setState({
          spinning: false,
          validated: false,
        });
      }
    }
    if (prevProps.loadingRequest && !this.props.loadingRequest) {
      if (this.props.isSuccess) {
        this.setState({
          success: true,
        });
      }
    }
  }

  render() {
    if (this.state.success) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container-login100">
        {this.state.spinning || this.state.validated ? (
          <Spin tip="validating..." spinning={this.state.spinning}>
            <div className="wrap-login100 p-t-30 p-b-50">
              <span className="login100-form-title p-b-41">Reset Password</span>
              <Form
                onFinish={(event) => this.handleSubmit(event)}
                onFinishFailed={this.onFinishFailed}
              >
                <Form.Item
                  name="password"
                  //   label="New Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your new password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    autoComplete="new-password"
                    placeholder="Enter New Password"
                  />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  //   label="Confirm Password"
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
                  <Input.Password placeholder="Confirm Password" />
                </Form.Item>
                <div style={{ position: "relative", height: 100 }}>
                  <Fragment>
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
                        loading={this.props.loadingRequest}
                      >
                        Submit
                      </Button>
                    </div>
                  </Fragment>
                </div>
              </Form>
            </div>
          </Spin>
        ) : (
          <Result
            status="error"
            title="Invalid/Expired Password Reset Request"
            subTitle="The Password reset request is either invalid or expired. Please request password reset link again or go back to the login page."
            extra={[
              <Button type="primary" key="console">
                <Link to="/login">Go to Login Page</Link>
              </Button>,
              <Button key="buy">
                <Link to="/app/reset-password-request">Request Again</Link>
              </Button>,
            ]}
          />
        )}
      </div>
    );
  }
}

const mapStatToProps = (state) => ({
  validatingToken: state.auth.validatingToken,
  tokenValidated: state.auth.tokenValidated,
  loadingRequest: state.auth.loadingRequest,
  isSuccess: state.auth.isSuccess,
});

export default connect(mapStatToProps, { validateResetToken, resetPassword })(
  PasswordResetForm
);
