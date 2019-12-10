import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import ArtistList from './ArtistList.component';
import NewArtist from './NewArtistForm.component';

import './ArtistPanel.css';

class ArtistPanel extends Component {
    constructor(props) {
        super(props)

        this.addArtist = this.addArtist.bind(this);

        this.state = {
            artists: []
        }
    }

    addArtist(artist) {      
        axios.post('http://localhost:5000/artists/add', artist)
            .then((res) => {
                var artist = res;
                var artists = this.state.artists.concat(artist.data)
                this.setState({ artists })
            });
    }

    componentDidMount() {
        axios.get('http://localhost:5000/artists/', { params: { user_id: this.props.auth.user.id } })
            .then(response => {
                this.setState({ artists: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <NewArtist onAdd={this.addArtist} />
                <ArtistList artists={this.state.artists} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(ArtistPanel);