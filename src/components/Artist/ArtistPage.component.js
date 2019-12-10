import React, { Component } from 'react';
import axios from 'axios';

import SongDetails from './SongDetails/SongDetails.component';
import SongForm from './SongForm.component';

import './ArtistPage.css';

export default class Artist extends Component {
    constructor(props) {
        super(props)

        this.handleSelect = this.handleSelect.bind(this);
        this.addSong = this.addSong.bind(this);
        this.goBack = this.goBack.bind(this);

        this.state = {
            artist: '',
            songs: [],
            activeSong: null
        }
    }

    componentDidMount() {
        let { id } = this.props.match.params

        axios.get('http://localhost:5000/artists/' + id)
            .then(response => {
                this.setState({ artist: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    addSong(song) { 
        song.artist_id = this.state.artist._id; 
        let songs = this.state.songs;

        axios.put('http://localhost:5000/songs/add', song)
            .then(response => {
                songs.push(response.data)
                this.setState({ songs: songs })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleSelect(song) {
        this.setState({
            activeSong: song
        })
    }

    goBack() {
        this.props.history.goBack()
    }

    render() {
        const songs = this.state.songs;

        return (
            <div className="flex w-full">
                <div className="w-1/2">
                    <div className="artist-header">
                        <span onClick={this.goBack} className="mr-3"><i className="fa fa-arrow-left"></i></span>
                        <div className="artist-header__image-wrapper">
                            <div className="artist-header__image" style={{ backgroundImage: `url(${this.state.artist.image_url})`}}></div>
                        </div>
                        <h1>{this.state.artist.name}</h1>
                        <a href={`https://open.spotify.com/artist/${this.state.artist.spotify_id}`} target="_blank" className="spotify-link"><i className="fa fa-spotify"></i></a>
                    </div>
                    <div className="list">
                        <div className="list__header">
                            <div className="w-1/2">
                                <span>Title</span>
                            </div>
                            <div className="w-1/2">
                                <span>Album</span>
                            </div>
                        </div>
                        <span className="list__sep"></span>
                        {/* { songs.length ? 
                            <SongList songs={songs} activeSong={this.state.activeSong} handleSelect={this.handleSelect} />
                        :
                            null
                        } */}
                    </div>
                    <SongForm addSong={this.addSong} />
                </div>

                <div className="w-1/2">
                    { this.state.activeSong ? 
                        <SongDetails song={this.state.activeSong} artist_id={this.state.artist._id} />
                    :
                        null
                    }
                </div>
            </div>
        )
    }
}

const SongList = (props) => {
    return props.songs.map((song, key) => {
        return (
            <div className={"list__item" + (props.activeSong && props.activeSong._id === song._id ? "--active" : '' )} key={song._id} onClick={(e) => props.handleSelect(song)}>
                <div className="w-1/2">
                    {song.title}
                </div>
                <div className="w-1/2">
                    {song.album}
                </div>
            </div>
        )
    })
}
