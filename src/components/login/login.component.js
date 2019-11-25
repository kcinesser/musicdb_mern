import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
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
      <div className="flex">
        <div className="w-1/3 mx-auto">
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
                className="w-full"
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
                className="w-full"
              />
              <span>
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </div>
            <div>
              <button className="w-full bg-blue-500 rounded text-white" type="submit">Login</button>
            </div>
          </form>
          <p>Don't have an account?</p>
          <Link className="w-full bg-blue-500 text-white rounded block text-center" to="/register">Register</Link>
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