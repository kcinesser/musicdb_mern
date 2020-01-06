import React, { Component } from 'react';

export default class Spofify extends Component {
  render() {
    return (
      <iframe title="spotify" src={`https://open.spotify.com/embed/track/${this.props.spotifyId}`} width={this.props.width} height={this.props.height} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    )
  }
}
