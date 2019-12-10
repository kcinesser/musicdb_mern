import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './SideBar.css';

export default class SideBar extends Component {
    render() {
        return (
            <div className="side-bar">
                <div className="side-bar__wrapper">
                    <div className="side-bar__logo">React-Bootstrap</div>
                    <ul className="side-bar__list">
                        <li className="side-bar__item"><NavLink exact to="/" activeClassName="side-bar__active-link">Home</NavLink></li>
                        <li className="side-bar__item"><NavLink to="/library" activeClassName="side-bar__active-link">Your Library</NavLink></li>
                        <li className="side-bar__item"><NavLink to="/search" activeClassName="side-bar__active-link">Search</NavLink></li>
                    </ul>
                    <span className="side-bar__sep"></span>
                    <div className="side-bar__label">Recent Playlists</div>
                    <ul className="side-bar__list">
                        <li className="side-bar__item">Playlist 1</li>
                        <li className="side-bar__item">Playlist 2</li>
                        <li className="side-bar__item">Playlist 3</li>
                        <li className="side-bar__item">Playlist 4</li>
                        <li className="side-bar__item"><Link to="/">View All</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}