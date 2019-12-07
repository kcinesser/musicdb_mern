import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ArtistList extends Component {
    constructor(props) {
        super(props)

        this.artistList = this.artistList.bind(this);
    }

    artistList() {
        return this.props.artists.map((artist, key) => {
            return (
                <div key={key} className="w-1/4 h-64 p-3 rounded mb-6">
                    <Link to={`/artist/${artist._id}`} className="artist-card" style={{ backgroundImage: 'url(' + artist.image_url + ')' }}>
                        <div>{artist.name}</div>
                    </Link>
                </div>
            )
        });
    }

    render() {
        return (
            <div className="flex flex-wrap items-center">
                {this.artistList()}
            </div>
        )
    }
}