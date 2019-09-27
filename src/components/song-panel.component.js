import React, { Component } from 'react';
import SongList from './song-list.component';
import SelectedSong from './selected-song.component';
import axios from 'axios';

export default class SongPanel extends Component {
    constructor(props) {
        super(props);

        this.deleteSong = this.deleteSong.bind(this);
        this.editSong = this.editSong.bind(this);
        this.addSong = this.addSong.bind(this);
        this.songSelector = this.songSelector.bind(this);

        this.state = { 
            songs: [],
            selectedSong: null
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/songs/')
            .then(response => {
                this.setState({ songs: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteSong(id) {
        axios.get('http://localhost:5000/songs'+id)
            .then(response => { console.log(response.data) });

        this.setState({
            songs: this.state.songs.filter(el => el._id !== id)
        });
    }

    editSong(id, title, artist) {
        const song = {
            title: title,
            artist: artist
        };

        axios.post('http://localhost:5000/songs/update/'+id, song)
            .then(response => { console.log(response.data) });
    }

    addSong(song) {
        axios.post('http://localhost:5000/songs/add', song)
            .then((res) => {
                var song = res;
                var songs = this.state.songs.concat(song.data)
                this.setState({ songs })
            });
    }

    songSelector(song) {
        this.setState({ selectedSong: song })
    }

    render() {
        return ( 
            <div>
                <h1>Songs</h1>
                <SongList songs={this.state.songs} songSelector={this.songSelector} />
                <SelectedSong selectedSong={this.state.selectedSong} />
            </div>
        )
    }
}