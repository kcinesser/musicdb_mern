import React, { Component } from 'react';

import SongPanel from './song-panel.component';
import ArtistPanel from './artist-panel.component';

const slides = {
    1: <SongPanel />,
    2: <ArtistPanel />
}

export default class Library extends Component {
    constructor(props) {
        super(props);

        this.onClickTab = this.onClickTab.bind(this)

        this.state = {
            active_slide: 1
        }
    }

    onClickTab(tab) {
        this.setState({
            active_slide: tab
        })
    }

    render() {
        let active_slide = this.state.active_slide;

        return (
            <div>
                <ul className="flex mx-auto w-1/2">
                    <li className="mx-6" onClick={() => this.onClickTab(1)}>Songs</li>
                    <li className="mx-6" onClick={() => this.onClickTab(2)}>Artists</li>
                    <li className="mx-6" onClick={() => this.onClickTab(3)}>Genres</li>
                    <li className="mx-6" onClick={() => this.onClickTab(4)}>Playlists</li>
                </ul>
                { slides[active_slide] }
            </div>
        )
    }
}