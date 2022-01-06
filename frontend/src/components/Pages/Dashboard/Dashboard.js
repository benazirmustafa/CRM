import React, { Component, Fragment } from "react";
import MainLayout from "../../Layout/MainLayout";
// import { Row, Col, Select, Button, Transfer } from "antd";
import { connect } from "react-redux";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }

  render() {
    return (
      <MainLayout>
        <h1>Dashboard </h1>
        <br />
        <p style={{textAlign:"center",fontSize:'66px'}}>WELCOME...</p>
      </MainLayout>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(Dashboard);
