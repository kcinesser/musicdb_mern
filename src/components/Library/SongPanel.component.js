import React, { Component } from 'react';
import SongList from '../Artist/SongList.component';
import SongSort from '../song-sort.component';
import axios from 'axios';

export default class SongPanel extends Component {
  constructor(props) {
    super(props);

    this.sortList = this.sortList.bind(this);

    this.state = {
      artists: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/artists/')
      .then(response => {
        this.setState({ artists: response.data })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  sortList(value) {
    var songs = this.state.songs;

    var sortedSongs = songs.sort(function (a, b) {
      var nameA = a[value].toUpperCase(); // ignore upper and lowercase
      var nameB = b[value].toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });

    this.setState({
      songs: sortedSongs
    });
  }

  render() {
    return (
      <div>
        <SongList artists={this.state.artists} />
      </div>
    )
  }
}