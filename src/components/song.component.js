import React, { Component } from 'react';
import axios from 'axios';

import Tab from './tab.component';
import Spotify from './spotify.component';
import YouTube from './youtube.component';

export default class Song extends Component {
    constructor(props) {
        super(props)

        this.notes = this.notes.bind(this)
        this.goBack = this.goBack.bind(this)

        this.state = {
            song: ''
        }
    }

    componentDidMount() {
        let { id } = this.props.match.params

        axios.get('http://localhost:5000/songs/' + id)
            .then(response => {
                this.setState({ song: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    notes(song) {
        return song.notes.map(note => {
          return (
            <li key={note}>{note}</li>
          )
        })
    }

    goBack() {
        this.props.history.goBack()
    }
    

    render() {
        const song = this.state.song;

        return (
            <div>
                <span onClick={this.goBack}><i className="fa fa-arrow-left"></i></span>
                <h3>{song.artist}</h3>
                <h2>{song.title}</h2>
                <p>{song.album}</p>
                <p>Difficulty: {song.difficulty}</p>
                <Tab />
                <Spotify id={song.spotify_id} />
                <YouTube id={song.youtube_id} />

                {

                song.notes ?

                    <div>
                    <p>Notes: </p>
                    <ul>
                        {this.notes(song)}
                    </ul>
                    </div>

                    :

                    <div></div>
                }
            </div>
        )
    }
}