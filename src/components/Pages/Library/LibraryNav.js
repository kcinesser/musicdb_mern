import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class LibraryNav extends Component {
  render() {
    return (
      <div className="library-nav">
        <ul className="library-nav__links">
          <li><NavLink to="songs" activeClassName="active">Songs</NavLink></li>
          <li><NavLink to="artists" activeClassName="active">Artists</NavLink></li>
          <li><NavLink to="routines" activeClassName="active">Routines</NavLink></li>
          <li><NavLink to="instruments" activeClassName="active">Instruments</NavLink></li>
          <li><NavLink to="genres" activeClassName="active">Genres</NavLink></li>
        </ul>
      </div>
    )
  }
}