import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SideBar from '../Layout/SideBar.component';
import NavBar from '../Layout/Navbar.component';

const PrivateRoute = ({ component: Component, auth, text, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <div className="flex h-screen">
          <SideBar />
          <div id="main-content" className="w-full p-6">
            <NavBar text={text} />
            <Component {...props} />
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