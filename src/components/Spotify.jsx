import React, { Component } from 'react';

export default class Spofify extends Component {
  render() {
    return (
      <iframe src={`https://open.spotify.com/embed/track/${this.props.spotifyId}`} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    )
  }
}
