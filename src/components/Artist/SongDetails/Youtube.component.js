import React, { Component } from 'react';

export default class YouTube extends Component {
  render() {
    const id = this.props.id
    return (
      <div className="song-details__youtube">
        {id ?
          <iframe width="100%" height="305" src={`https://www.youtube.com/embed/${this.props.id}`} title={id} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          :
          ''
        }
      </div>
    )
  }
}