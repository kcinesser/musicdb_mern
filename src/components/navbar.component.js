import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div>
        <div href="#home">React-Bootstrap</div>

        <div className="mr-auto">
          <Link to="/">Home</Link>
          <Link to="/songs">Songs</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    )
  }
}