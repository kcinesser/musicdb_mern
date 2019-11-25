import React, { Component } from 'react';
import { logoutUser } from "../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class NavBar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="flex justify-between w-full">
        <h2>{this.props.text}</h2>
        <div>
          {user.name.split(" ")[0]}
          <button onClick={this.onLogoutClick}>Logout</button>
        </div>
      </div>
    )
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavBar);