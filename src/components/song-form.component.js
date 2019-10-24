import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class SongForm extends Component {
    constructor(props) {
        super(props);

        this.onChangeSongTitle = this.onChangeSongTitle.bind(this);
        this.onChangeArtistName = this.onChangeArtistName.bind(this);
        this.onChangeAlbumName = this.onChangeAlbumName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            artist: '',
            album: ''
        }
    }

    onChangeSongTitle(e) {
        this.setState({
            title: e.target.value
        })
    }
    
    onChangeArtistName(e) {
        this.setState({
            artist: e.target.value
        })
    }

    onChangeAlbumName(e) {
        this.setState({
            album: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.onAdd({title: this.state.title, artist: this.state.artist, album: this.state.album})
        this.setState({ title: '', artist: '', album: '' })
    }

    render() {
        return (
            <div>
                <h2>Add Song</h2>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control value={this.state.title} 
                        onChange={this.onChangeSongTitle} />
                    </Form.Group>

                    <Form.Group controlId="formArtist">
                        <Form.Label>Artist</Form.Label>
                        <Form.Control value={this.state.artist} 
                        onChange={this.onChangeArtistName} />
                    </Form.Group>

                    <Form.Group controlId="formAlbum">
                        <Form.Label>Album</Form.Label>
                        <Form.Control  value={this.state.album} 
                        onChange={this.onChangeAlbumName} />
                    </Form.Group>
               
                    <Button variant="primary" type="submit">
                        Add Song
                    </Button>
                </Form>
            </div>
        )
    }
}