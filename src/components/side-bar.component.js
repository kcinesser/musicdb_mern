import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SideBar extends Component {
    render() {
        return (
            <div id="side-bar" className="p-6 flex-none">
                <div>React-Bootstrap</div>
                <ul className="pb-3">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/library">Your Library</Link></li>
                    <li><Link to="/search">Search</Link></li>
                </ul>
                <div className="py-3 border-t-2">Recent Playlists</div>
                <ul>
                    <li>Playlist 1</li>
                    <li>Playlist 2</li>
                    <li>Playlist 3</li>
                    <li>Playlist 4</li>
                    <li><Link to="/">View All</Link></li>
                </ul>
            </div>
        )
    }
}