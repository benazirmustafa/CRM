import React, { Component } from "react";
import { Result, Button } from "antd";

export default class PermissionDenied extends Component {
  render() {
    return (
      <Result
        status="500"
        title="Permission Denied"
        subTitle="Sorry, you don't have permission to access this page. Contact ipqual_team@globalfoundries.com to get access."
        // extra={<Button type="primary">Back Home</Button>}
      />
    );
  }
}
