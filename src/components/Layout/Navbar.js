import React, { Component } from 'react';
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class NavBar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="navbar">
          <div className="navbar__profile">
            <button className="button button--profile"></button>
            {/* {user.name.split(" ")[0]} */}
            {/* <button onClick={this.onLogoutClick}>Logout</button> */}
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