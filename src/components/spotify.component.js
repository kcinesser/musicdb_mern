import React, { Component } from 'react';

export default class Spotify extends Component {
  render() {
    const id = this.props.id

    return (
      <div>
        {id ?
          <iframe src={`https://open.spotify.com/embed/track/${id}`} title={id} width="300" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          :
          ''
        }
      </div>
    )
  }
}