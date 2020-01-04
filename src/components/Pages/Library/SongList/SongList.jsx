import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

import LibraryNav from '../LibraryNav';

import SongService from '../../../../services/SongService';

class SongList extends Component {
  songService = new SongService();

  constructor(props) {
    super(props)

    this.songList = this.songList.bind(this);
    this.filterList = this.filterList.bind(this);
    this.clearFilter = this.clearFilter.bind(this);

    this.state = {
      songs: [],
      filteredSongs: [],
      filterValue: '',
      showClear: false
    }
  }

  componentDidMount() {
    let user = this.props.auth.user.id;

    this.songService.getSongs(user)
      .then(res => { this.setState({ songs: res, filteredSongs: res }) })
      .catch(err => console.log(err))
  }

  songList() {
    return this.state.filteredSongs.map((song, key) => {
      return (
        <Link className="song-list__item" key={key} to={`/song/${song._id}`} >
          <p>{song.title}</p>
          <p>{song.artist.name}</p>
          <p>{song.album}</p>
          <p>{song.status}</p>
        </Link>
      )
    })
  }

  filterList = (e) => {
    let songs = this.state.songs;

    e.target.value.length ? this.setState({ showClear: true }) : this.setState({ showClear: false });
    this.setState({ filterValue: e.target.value })

    songs = songs.filter(song => {
        if(song.title.toLowerCase().includes(e.target.value.toLowerCase()))
            return true
        else
            return false
    });

    this.setState({
        filteredSongs: songs
    });
  }

  clearFilter() {
      this.setState({
          filteredSongs: this.state.songs,
          filterValue: '',
          showClear: false
      })
  }

  render() {
    return (
      <div className="songs-page">
        <LibraryNav />
        <div className="page-header">
            <h2 className="page-title">Songs</h2>
        </div>
        <div className="filter-bar">
          <input className="filter" type="text" placeholder="Search songs..." 
              onChange={(e) => this.filterList(e)} 
              value={this.state.filterValue}
              />
          <span className={this.state.showClear ? 'clear' : ''} onClick={() => this.clearFilter()}></span>
      </div>
        <div className="song-list">
          <div className="song-list__header">
            <p>Title</p>
            <p>Artist</p>
            <p>Album</p>
            <p>Status</p>
          </div>
          {this.songList()}
        </div>
      </div>
    )
  }
}

SongList.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(SongList);