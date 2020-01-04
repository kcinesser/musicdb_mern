import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LibraryNav from '../LibraryNav';
import NewArtistForm from './NewArtistForm';

import ArtistService from '../../../../services/ArtistService';

class ArtistList extends Component {
    artistService = new ArtistService();

    constructor(props) {
        super(props)

        this.artistList = this.artistList.bind(this);
        this.filterList = this.filterList.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            artists: [],
            filteredArtists: [],
            filterValue: '',
            showClear: false,
            showForm: false
        }
    }

    componentDidMount() {
        let user = this.props.auth.user.id;

        this.artistService.getArtists(user)
            .then(res => {
                this.setState({
                    artists: res,
                    filteredArtists: res
                })
            })
            .catch(err => {console.log(err)})
    }

    artistList() {
        return this.state.filteredArtists.map((artist, key) => {
            return (
                <div className="artist-card" key={key}>
                    <div className="artist-card__wrapper">
                        <Link to={`/artist/${artist._id}`} className="artist-card__inner" style={{ backgroundImage: 'url(' + artist.image_url + ')' }}>
                            <div className="artist-card__title"><h3>{artist.name}</h3></div>
                        </Link>
                    </div>
                </div>
            )
        });
    }

    filterList = (e) => {
        let artists = this.state.artists;

        e.target.value.length ? this.setState({ showClear: true }) : this.setState({ showClear: false });
        this.setState({ filterValue: e.target.value })

        artists = artists.filter(artist => {
            if(artist.name.toLowerCase().includes(e.target.value.toLowerCase()))
                return true
            else
                return false
        });

        this.setState({
            filteredArtists: artists
        });
    }

    clearFilter() {
        this.setState({
            filteredArtists: this.state.artists,
            filterValue: '',
            showClear: false
        })
    }

    toggleForm() {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    onSubmit(artist) {
        this.setState({
            showForm: false
        });

        this.artistService.saveArtist(artist)
            .then(res => {
                var artist = res;
                var artists = this.state.artists.concat(artist);
                this.setState({ artists: artists, filteredArtists: artists })
            })
            .catch(err => {console.log(err)})
    }

    render() {
        return (
            <div className="artists-page">
                <LibraryNav />
                <div className="page-header">
                    <h2 className="page-title">Artists</h2>
                    <span className="button button--new" onClick={() => this.toggleForm()}></span>
                </div>
                <div className="filter-bar">
                    <input className="filter" type="text" placeholder="Search artists..." 
                        onChange={(e) => this.filterList(e)} 
                        value={this.state.filterValue}
                        />
                    <span className={this.state.showClear ? 'clear' : ''} onClick={() => this.clearFilter()}></span>
                </div>
                <div className="artist-list">
                    {this.artistList()}
                </div>

                { this.state.showForm ? 
                    <NewArtistForm onSubmit={this.onSubmit} toggleForm={this.toggleForm} />
                :
                    ''
                }
            </div>
        )
    }
}

ArtistList.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(ArtistList);