import React, { Component } from 'react';
import axios from 'axios';

import './SongDetails.scss';

import YouTube from './Youtube.component';
import Spotify from './Spotify.component';
import SongDetailsForm from './SongDetailsForm.component';

import { Statuses, Instruments, Genres } from '../../../utils/enums/enums';

export default class SongDetails extends Component {
    constructor(props) {
        super(props)

        this.enableEdit = this.enableEdit.bind(this);
        this.disableEditing = this.disableEditing.bind(this);
        this.saveSong = this.saveSong.bind(this);
        this.deleteSong = this.deleteSong.bind(this);
        this.stars = this.stars.bind(this);

        this.state = {
            editing: false
        }
    }

    enableEdit() {
        this.setState({
            editing: true
        })
    }

    disableEditing() {
        this.setState({
            editing: false
        })
    }

    saveSong(song) {
        console.log(song)
        axios.put('http://localhost:5000/songs/' + song.artist_id + '/' + song._id, song)
            .then(response => {
                console.log(response)
                this.setState({
                    editing: false
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteSong() {
        console.log("Deleted")
    }

    stars() {
        let stars = [];
        let rating = this.props.song.difficulty;

        for(let i = 1; i < 6; i++) {
            var klass = 'star-rating__star';
        
            if (rating >= i && rating != null) {
                klass += ' is-selected';
            }
                    
            stars.push(
                <label
                    key={i}
                    className={klass}>
                    ★
                </label>
            )
        }

        return stars;
    }

    render() {
        const song = this.props.song;
        const editing = this.state.editing;

        return (
            <div>
                { editing ?
                    <div className="song-edit">
                        <SongDetailsForm song={song} 
                            artist_id={this.props.artist_id} 
                            disableEditing={this.disableEditing} 
                            onSongSave={this.saveSong}    
                        />
                    </div>
                :
                    <div className="song-details">
                        <div className="flex justify-between">
                            <div>
                                <h3>{song.album}</h3>
                                <h2>{song.title}</h2>
                            </div>
                            <span className="song-details__edit"><i className="fa fa-pencil" onClick={this.enableEdit}></i></span>
                        </div>

                        <div className="flex mb-1">
                            {this.stars()}
                        </div>

                        <div className="flex mb-6">
                            <span className="mr-3">{song.status}</span> {song.instrument ? <span className="mx-3">{song.instrument}</span> : ''} {song.genre ? <span className="ml-3">{song.genre}</span> : ''} 
                        </div>

                        <div className="mb-3">
                            <Spotify id={song.spotify_id} />
                        </div>

                        <div className="mb-3">
                            <YouTube id={song.youtube_id} />
                        </div>

                        { song.notes ? 
                            <div className="p-2 shadow-light">
                                <p className="text-sm">NOTES:</p>
                                {song.notes}
                            </div>
                        :
                            ''
                        }
                    </div>
                }
            </div>
        )
    }
}