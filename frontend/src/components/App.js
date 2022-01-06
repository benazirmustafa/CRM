import React, { Component } from "react";
import axios from "axios";
import store from "../store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "../actions/auth";
import { LOGIN_FAIL } from "../actions/types";

import PrivateRoute from "./Auth/PrivateRoute";
import Alert from "../components/Common/Alerts/Alerts";

import Login from "./Pages/Login/Login";
// import PasswordResetRequestForm from "./Pages/PasswordReset/PasswordResetRequestForm";
// import PasswordResetForm from "./Pages/PasswordReset/PasswordResetForm";
import CreateUser from "./Pages/CreateUser/CreateUser";
import Profile from "./Pages/Profile/Profile";
import Dashboard from "./Pages/Dashboard/Dashboard"
import Page404 from "./Common/Page404/Page404";

import AddProjduct from "./Pages/Products/AddProjduct";
import ManageProducts from "./Pages/Products/ManageProducts";
import AddCustomer from "./Pages/Customers/AddCustomer";
import ManageCustomers from "./Pages/Customers/ManageCustomers";
import CreateJobCard from "./Pages/JobCard/CreateJobCard";
import ManageJobCards from "./Pages/JobCard/ManageJobCards";
import UpdateJobCard from "./Pages/JobCard/UpdateJobCard"
import CreateQuatation from "./Pages/Quatations/CreateQuatation";
import CreateInvoice from "./Pages/Invoice/CreateInvoice";
import CustomerDetails from "./Pages/Customers/CustomerDetails";
// import ManageInvoice from "./Pages/Invoice/ManageInvoice";
// import ManageQuatations from "./Pages/Quatations/ManageQuatations";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:8000";
}

class App extends Component {
  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      store.dispatch(loadUser());
    } else {
      store.dispatch({ type: LOGIN_FAIL });
    }
  }

  render() {
    let appRoutes;
    appRoutes = (
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/app/create-user" component={CreateUser} />
        <PrivateRoute path="/app/change-password" component={Profile} />
        <PrivateRoute exact path="/app/add-product" component={AddProjduct} />
        <PrivateRoute exact path="/app/manage-products" component={ManageProducts} />
        <PrivateRoute exact path="/app/add-customer" component={AddCustomer} />
        <PrivateRoute exact path="/app/manage-customers" component={ManageCustomers} />
        <PrivateRoute exact path="/app/customer/:id" component={CustomerDetails} />
        <PrivateRoute exact path="/app/add-job-card" component={CreateJobCard} />
        <PrivateRoute exact path="/app/job-card/:id" component={UpdateJobCard} />
        <PrivateRoute exact path="/app/manage-job-cards" component={ManageJobCards} />
        <PrivateRoute exact path="/app/quotation/:id" component={CreateQuatation} />
        <PrivateRoute exact path="/app/invoice/:id" component={CreateInvoice} />
        {/* <PrivateRoute exact path="/app/allinvoice" component={ManageInvoice} />
        <PrivateRoute exact path="/app/allquotation" component={ManageQuatations} /> */}
        
        <PrivateRoute exact path="/" component={Dashboard} />
      </Switch>
    );

    return (
      <Router>
        <Alert /> {appRoutes}
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(App);
