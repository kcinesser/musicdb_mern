import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Difficulty from '../../Difficulty';
import Youtube from '../../Youtube';
import Spotify from '../../Spotify';
import FileEmbed from '../../FileEmbed';
import Timer from '../../Timer';

import RoutineService from '../../../services/RoutineService';

var moment = require('moment');
var placeholder = document.createElement("div");

placeholder.className = "song-list__item placeholder";

class Routine extends Component {
  routineService = new RoutineService();

  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
    this.songList = this.songList.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRecord = this.handleRecord.bind(this);

    this.state = {
      routine: [],
      items: [],
      dragged: '',
      over: '',
      selectedSong: ''
    }
  }

  componentDidMount() {
    let { id } = this.props.match.params;

    this.routineService.getRoutine(id)
      .then(res => {
        this.setState({
          routine: res,
          items: res.songs,
        })
      })
      .catch(err => {console.log(err)})
  }

  goBack(){
    this.props.history.goBack();
  }

  handleDragStart(e) {
    this.setState({dragged: e.target});

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", e.target);
  }

  handleDragOver(e) {
    e.preventDefault();

    let dragged = this.state.dragged;
    dragged.style.display = "none"
    this.setState({dragged: dragged});

    if(e.target.className === 'song-list__item placeholder') return;
    
    this.setState({
      over: e.target
    })

    e.target.parentNode.insertBefore(placeholder, e.target);
  }

  handleDrop(e) {
    let dragged = this.state.dragged;
    dragged.style.display = 'flex';
    dragged.parentNode.removeChild(placeholder);

    this.setState({
      dragged: dragged
    })
    
    // update state
    var data = this.state.items;
    var from = Number(this.state.dragged.dataset.id);
    var to = Number(this.state.over.dataset.id);
    
    if(from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({items: data, dragged: '', over: ''});

    this.routineService.updateOrder(this.state.routine._id, this.state.items)
  }

  handleSelect(e, song) {
    this.setState({
      selectedSong: song
    })
  }

  handleRecord(time) {
    this.routineService.updateTimestamp(this.state.routine._id, time, this.props.auth.user.id)
  }

  songList() {
    return this.state.routine.songs.map((song, key) => {
      return (
        <div className="song-list__item button button--draggable" data-id={key} key={key} 
          draggable={true} 
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDrop}
          onClick={(e) => this.handleSelect(e, song)}>
          {song.title}
        </div>
      )
    })
  }

  render() {
    let routine = this.state.routine;
    let createdAt = moment(routine.createdAt).format("MMM D, YYYY");
    let lastPlayed = '';
    let selectedSong = this.state.selectedSong;
    
    if(routine.lastPlayed) {
      lastPlayed = moment(routine.lastPlayed).format("MMM D, YYYY")
    } else {
      lastPlayed = "Never"
    }

    return (
      <div className="routine-page">
        <div className="routine-header">
          <button className="button button--back" onClick={this.goBack}></button>
          <div className="routine-details">
            <h2>{routine.name}</h2>
            <p>Created: {createdAt} | Last Played: {lastPlayed}</p>
          </div>
        </div>
        <div className="routine-content">
          <div className="song-list">
            <div className="timer-container">
              <Timer handleRecord={this.handleRecord} />
            </div>
            <div className="song-list__header">
              <p>Songs</p>
            </div>
            <div onDragOver={this.handleDragOver}>
              { routine.songs && routine.songs.length ? 
                  this.songList()
                :
                  <div>No songs yet!</div>
              }
            </div>
          </div>
            
          { selectedSong ?
            <div className="selected-song">
              <div className="selected-song__header">
                <p className="artist">{selectedSong.artist.name}</p>
                <h3>{selectedSong.title}</h3>
                <p className="album">{selectedSong.album}</p>
              </div>
              <span className="subhead">{selectedSong.status}</span>|
              <span className="subhead"><Difficulty rating={selectedSong.difficulty} editable={false} /></span>|
              <span className="subhead">{selectedSong.genre}</span>|
              <span className="subhead">{selectedSong.instrument}</span>
              { selectedSong.spotify_id ?
                <Spotify spotifyId={selectedSong.spotify_id} height={80} width={300} />
              :
                ''
              }

              { selectedSong.youtube_id ?
                <Youtube youtubeId={selectedSong.youtube_id} height={300} width={500} />
              :
                ''
              }

              { selectedSong.uploads.length ? 
                <FileEmbed file={selectedSong.uploads[0].url} height={500} width={500} />
              :
                ''
              }
            </div>
          :
            ''
          }
        </div>
      </div>
    )
  }
}

Routine.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Routine);