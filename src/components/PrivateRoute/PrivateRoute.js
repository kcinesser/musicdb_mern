import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SideBar from '../Layout/Sidebar';
import NavBar from '../Layout/Navbar';

const PrivateRoute = ({ component: Component, auth, text, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <div className="app">
          <SideBar />
          <div className="main-content">
            <NavBar text={text} />
            <div className="content">
              <Component {...props} />
            </div>
          </div>
        </div>
      ) : (
          <Redirect to="/login" />
        )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);