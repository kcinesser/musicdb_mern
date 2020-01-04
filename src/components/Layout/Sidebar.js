import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default class SideBar extends Component {
    render() {
        return (
            <div className="sidebar">
                <div className="sidebar__inner">
                    <h1>Music DB</h1>
                    <ul>
                        <li><NavLink exact to="/" activeClassName="active" >Home</NavLink></li>
                        <li><NavLink to="/library/songs" activeClassName="active"
                                isActive={(match, location) => {
                                    if(location.pathname.includes('/library/'))
                                        return true
                                }}>Your Library</NavLink></li>
                        <li><NavLink to="/search" activeClassName="active">Search</NavLink></li>
                    </ul>
                    <span className="sidebar__sep"></span>
                    <span className="sidebar__label">Recent Routines</span>
                    <ul>
                        <li>Playlist 1</li>
                        <li>Playlist 2</li>
                        <li>Playlist 3</li>
                        <li>Playlist 4</li>
                        <li><Link to="/library/routines">View All</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}