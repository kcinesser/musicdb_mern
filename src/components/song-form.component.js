import React, { Component } from 'react';

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
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Title</label>
                        <input value={this.state.title} 
                        onChange={this.onChangeSongTitle} />
                    </div>

                    <div>
                        <label>Artist</label>
                        <input value={this.state.artist} 
                        onChange={this.onChangeArtistName} />
                    </div>

                    <div>
                        <label>Album</label>
                        <input  value={this.state.album} 
                        onChange={this.onChangeAlbumName} />
                    </div>
               
                    <button type="submit">
                        Add Song
                    </button>
                </form>
            </div>
        )
    }
}