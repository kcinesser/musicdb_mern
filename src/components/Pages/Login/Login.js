import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/"); // push user to dashboard when they login
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div>
          <div>
            <h4><b>Login to continue.</b></h4>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div>
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                placeHolder="Email"
                id="email"
                type="email"
              />
              <span>
                {errors.email}
                {errors.emailnotfound}
              </span>
            </div>
            <div>
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                placeHolder="Password"
                id="password"
                type="password"
              />
              <span>
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
          <p>Don't have an account?</p>
          <Link to="/register">Register</Link>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);