import React, { Component } from 'react';
import axios from 'axios';

import SongDetails from './SongDetails/SongDetails.component';
import SongForm from './SongForm.component';

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
                this.setState({ artist: response.data, songs: response.data.songs })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    addSong(song) {
        let songs = this.state.songs
    
        songs.push(song)

        this.setState({
            songs: songs
        })

        axios.put('http://localhost:5000/artists/' + this.state.artist._id + '/songs', songs)
            .then(response => {
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
                    <div className="flex items-center mb-6">
                        <span onClick={this.goBack} className="mr-3"><i className="fa fa-arrow-left"></i></span>
                        <h1>{this.state.artist.name}</h1>
                    </div>
                    <div className="flex">
                        <div className="w-1/2">
                            Title
                        </div>
                        <div className="w-1/2">
                            Album
                        </div>
                    </div>
                    { songs.length ? 
                        <SongList songs={songs} handleSelect={this.handleSelect} />
                    :
                        null
                    }
                    <SongForm addSong={this.addSong} />
                </div>

                <div className="w-1/2">
                    { this.state.activeSong ? 
                        <SongDetails song={this.state.activeSong} />
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
            <div className="flex mb-6" key={song._id} onClick={(e) => props.handleSelect(song)}>
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