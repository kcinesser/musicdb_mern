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
                <div className="artist-column" key={key}>
                    <div className="artist-wrapper">
                        <Link to={`/artist/${artist._id}`} className="artist-card" style={{ backgroundImage: 'url(' + artist.image_url + ')' }}>
                            <div className="artist-card__title">{artist.name}</div>
                        </Link>
                    </div>
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