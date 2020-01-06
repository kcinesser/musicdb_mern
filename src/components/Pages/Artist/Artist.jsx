import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import ArtistService from '../../../services/ArtistService';
import SongService from '../../../services/SongService';

import NewSong from './NewSong';
import EditArtist from './EditArtist';
import OptionsButton from '../../OptionsButton';
import Dialog from '../../Dialog';

export default class Artist extends Component {
  artistService = new ArtistService();
  songService = new SongService();

  constructor(props) {
    super(props)

    this.goBack = this.goBack.bind(this);
    this.songList = this.songList.bind(this);
    this.toggleNewSongForm = this.toggleNewSongForm.bind(this);
    this.toggleEditForm = this.toggleEditForm.bind(this);
    this.onNewSongSubmit = this.onNewSongSubmit.bind(this);
    this.editArtist = this.editArtist.bind(this);
    this.deleteArtist = this.deleteArtist.bind(this);
    this.handleDeleteArtistDialog = this.handleDeleteArtistDialog.bind(this);

    this.state = {
      artist: [],
      showNewSongForm: false,
      showEditForm: false,
      isDelete: false,
      isDeleted: false,
    }
  }

  componentDidMount() {
    let { id } = this.props.match.params;

    this.artistService.getArtist(id)
      .then(res => {
        this.setState({
            artist: res,
            songs: res.songs
        })
      })
      .catch(err => {console.log(err)})
  }

  goBack(){
    this.props.history.goBack();
  }

  songList() {
    return this.state.songs.map((song, key) => {
      return (
        <Link className="song-list__item" key={key} to={`/song/${song._id}`} >
          <p>{song.title}</p>
          <p>{song.album}</p>
          <p>{song.status}</p>
        </Link>
      )
    })
  }

  toggleNewSongForm() {
    this.setState({
      showNewSongForm: !this.state.showNewSongForm
    })
  }

  toggleEditForm() {
    this.setState({
      showEditForm: !this.state.showEditForm
    })
  }

  onNewSongSubmit(song) {
    this.setState({
      showNewSongForm: false
    });

    song.artist = this.state.artist._id;

    this.songService.saveSong(song)
      .then(res => {
        var song = res;
        var songs = this.state.songs.concat(song);
        this.setState({ songs: songs })
      })
      .catch(err => { console.log(err) })
  }

  handleDeleteArtistDialog(state) {
    this.setState({ isDelete: state })
  }

  editArtist(artist) {
    this.artistService.editArtist(artist)
      .then(artist => { this.setState({ artist: artist, showEditForm: false }) })
      .catch(err => console.log(err))
  }

  deleteArtist() {
    this.artistService.deleteArtist(this.state.artist)
      .then(res => { this.setState({ isDeleted: true }) })
      .catch(err => {console.log(err)})
  }

  render() {
    const artist = this.state.artist;

    if(this.state.isDeleted) {
      return <Redirect to="/library/artists" />;
    }

    return (
      <div className="artist-page">
        <div className="artist-header">
          <div className="artist-header__left">
            <button className="button button--back" onClick={this.goBack}></button>
            <div className="artist-header__image" style={{ backgroundImage: 'url(' + artist.image_url + ')' }}>
              <h2>{artist.name}</h2>
            </div>
            <OptionsButton>
              <div className="options-menu__item" onClick={this.toggleEditForm}>Edit</div>
              <div className="options-menu__item" onClick={() => this.handleDeleteArtistDialog(true)}>Delete</div>
            </OptionsButton>
          </div>
          <span className="button button--new" onClick={() => this.toggleNewSongForm()}></span>
        </div>
        <div className="song-list">
          <div className="song-list__header">
            <p>Title</p>
            <p>Album</p>
            <p>Status</p>
          </div>
          { artist.songs && artist.songs.length ? 
              this.songList()
            :
              <div>No songs yet!</div>
          }
        </div>

        { this.state.showNewSongForm && 
          <NewSong toggleForm={this.toggleNewSongForm} onSubmit={this.onNewSongSubmit} />
        }

        { this.state.showEditForm && 
          <EditArtist toggleForm={this.toggleEditForm} onSubmit={this.editArtist} artist={artist} />
        }

        { this.state.isDelete && 
          <Dialog>
            <h2>Are you sure you want to delete?</h2>
            <button className="button button--primary" onClick={this.deleteArtist}>Yes</button>
            <button className="button button--secondary" onClick={() => this.handleDeleteArtistDialog(false)}>Cancel</button>
          </Dialog>
        }
      </div>
    )
  }
}