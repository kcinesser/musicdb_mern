import React, { Component } from 'react';
import SongList from './song-list.component';
import SongSort from './song-sort.component';
import SelectedSong from './selected-song.component';
import SongForm from './song-form.component';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class SongPanel extends Component {
    constructor(props) {
        super(props);

        this.deleteSong = this.deleteSong.bind(this);
        this.editSong = this.editSong.bind(this);
        this.addSong = this.addSong.bind(this);
        this.songSelector = this.songSelector.bind(this);
        this.sortList = this.sortList.bind(this);

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
		axios.delete('http://localhost:5000/songs/'+id)
			.then(response => { console.log(response.data)});

		this.setState({
			songs: this.state.songs.filter(el => el._id !== id)
		})
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

    sortList(value) {
        var songs = this.state.songs;

        var sortedSongs = songs.sort(function(a, b) {
            var nameA = a[value].toUpperCase(); // ignore upper and lowercase
            var nameB = b[value].toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
        });

        this.setState({
            songs: sortedSongs
        });
    }

    render() {
        return ( 
            <Container>
                <Row>
                    <h1>Songs</h1>
                </Row>
                <Row>   
                    <Col>
                        <SongSort onSelect={this.sortList} />
                        <SongList songs={this.state.songs} songSelector={this.songSelector} onDelete={this.deleteSong} />
                        <SongForm onAdd={this.addSong} />
                    </Col>
                    <Col>
                        <SelectedSong selectedSong={this.state.selectedSong} />
                    </Col>
                </Row>
            </Container>
        )
    }
}