import React, { Component } from 'react';

import Spotify from '../../Spotify';
import Youtube from '../../Youtube';
import Difficulty from '../../Difficulty';

import SongService from '../../../services/SongService';

export default class Song extends Component {
  songService = new SongService();

  constructor(props) {
    super(props)

    this.goBack = this.goBack.bind(this);

    this.state = {
      loaded: false,
      song: []
    }
  }

  componentDidMount() {
    let { id } = this.props.match.params;

    this.songService.getSong(id)
      .then(res => {
        this.setState({
          loaded: true,
          song: res
        })
      })
      .catch(err => {console.log(err)})
  }

  goBack(){
    this.props.history.goBack();
  }

  render() {
    const song = this.state.song;

    if(this.state.loaded === false) {
      return null;
    }

    return (
      <div className="song-page">
        <div className="song-header">
          <button className="button button--back" onClick={this.goBack}></button>
          <div className="song-header__details">
            <div className="song-header__album">
              <h3>{song.artist.name}</h3>
              <h3 className="light">{song.album}</h3>
            </div>
            <h2>{song.title}</h2>
            <span className="subhead">{song.status}</span>|
            <span className="subhead"><Difficulty rating={song.difficulty} editable={false} /></span>|
            <span className="subhead">{song.genre}</span>|
            <span className="subhead">{song.instrument}</span>
          </div>
        </div>
        <div className="song-content">
          { song.spotify_id.length ?
            <Spotify spotifyId={song.spotify_id} />
          :
            ''
          }
          { song.youtube_id.length ?
            <Youtube youtubeId={song.youtube_id} />
          :
            ''
          }
        </div>
        <div className="song-content">
          <div>
            <h3>Notes</h3>
            {song.notes}
          </div>
        </div>
      </div> 
    )
  }
}