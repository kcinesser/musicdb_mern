import React, { Component } from 'react';

import './SongDetails.scss';

import YouTube from './Youtube.component';
import Spotify from './Spotify.component';
import DifficultyRating from './DifficultyRating.component'

export default class SongDetails extends Component {
    constructor(props) {
        super(props)

        this.enableEdit = this.enableEdit.bind(this);
        this.saveSong = this.saveSong.bind(this);
        this.deleteSong = this.deleteSong.bind(this);
        this.starts = this.stars.bind(this);

        this.state = {
            editing: false
        }
    }

    enableEdit() {
        this.setState({
            editing: true
        })
    }

    saveSong() {
        this.setState({
            editing: false
        })
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
            <div className="mt-6 test">
                { editing ?
                    <div>
                        <div className="flex justify-between">
                            <div className="block">
                                <form>
                                    <input value={song.title} />
                                    <input value={song.album} />

                                    <select>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>

                                    <select>
                                        <option vale="NotStarted">Not Started</option>
                                        <option vale="InProgress">In Progress</option>
                                        <option vale="Proficient">Proficient</option>
                                        <option vale="Mastered">Mastered</option>
                                    </select>

                                    <select>
                                        <option value="Guitar">Guitar</option>
                                        <option value="Guitar">Piano</option>
                                    </select>
                                </form>
                            </div>
                            <div>
                                <p><i className="fa fa-check" onClick={this.saveSong}></i></p>
                                <p><i className="fa fa-trash" onClick={this.deleteSong}></i></p>
                            </div>
                        </div>
                    </div>
                :
                    <div className="p-6 shadow glass">
                        <div className="flex justify-between">
                            <div>
                                <h3>{song.album}</h3>
                                <h2>{song.title}</h2>
                            </div>
                            <span><i className="fa fa-pencil" onClick={this.enableEdit}></i></span>
                        </div>

                        {this.stars()}

                        <div className="flex mb-3">
                            <span className="mr-3">{song.status}</span> | <span className="ml-3">{song.instrument}</span>
                        </div>

                        <div className="mb-3">
                            <Spotify id={song.spotify_id} />
                        </div>

                        <div className="mb-3">
                            <YouTube id={song.youtube_id} />
                        </div>

                        <div className="p-2 shadow-inner">
                            <p className="text-sm">NOTES:</p>
                            {song.notes}
                        </div>
                    </div>
                }
            </div>
        )
    }
}