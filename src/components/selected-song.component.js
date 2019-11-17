import React, { Component } from 'react';

import Tab from './tab.component';
import YouTube from './youtube.component';
import Spotify from './spotify.component';

export default class SelectedSong extends Component {
    constructor(props) {
        super(props);

        this.notes = this.notes.bind(this);
    }

    notes() {
        return this.props.selectedSong.notes.map(note => {
            return(
                <li key={note}>{note}</li>
            )
        })
    }

    render() {
        if(this.props.selectedSong) {
            return (
                <div>
                    <div>
                        <h2>{this.props.selectedSong.title}</h2>
                        <h3 className="mb-2 text-muted">{this.props.selectedSong.artist}</h3>
                        <p>{this.props.selectedSong.album}</p>
                        <p>Difficulty: {this.props.selectedSong.difficulty}</p>
                        <Tab />
                        <Spotify id={this.props.selectedSong.spotify_id} />
                        <YouTube id={this.props.selectedSong.youtube_id}/>

                        {
                            this.props.selectedSong.notes.length ?

                            <div>
                                <p>Notes: </p>
                                <ul>
                                    {this.notes()}
                                </ul>
                            </div>

                            :

                            <div></div>
                        }
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}