import React, { Component } from "react";

export default class SpotifyService extends Component {
  id = '';
  secret = '';
  url = '';

  constructor() {
    super()

    this.id = process.env.REACT_SPOTIFY_ID;
    this.secret = process.env.REACT_SPOTIFY_SECRET;
    this.url = 'https://accounts.spotify.com/api/token'
  }

  render() {
    return this.props.children;
  }
}