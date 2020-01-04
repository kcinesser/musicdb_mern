import React, { Component } from 'react';

export default class Youtube extends Component {
  render() {
    return (
      <iframe title="youtube" width="560" height="315" src={`https://www.youtube.com/embed/${this.props.youtubeId}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    )
  }
}