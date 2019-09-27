import React, { Component } from 'react';

export default class SongList extends Component {
    constructor(props) {
        super(props)

        this.songList = this.songList.bind(this);
    }

    songList() {
        return this.props.songs.map(song => {
            return (
                <li onClick={() => this.props.songSelector(song)} key={song._id}>{song.title} - {song.artist}</li>
            )
        });
    }

    render() {
        return <div>{this.songList()}</div>
    }
}