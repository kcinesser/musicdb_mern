import React, { Component } from 'react';

export default class Youtube extends Component {
  render() {
    return (
      <iframe width="560" height="315" src={`https://www.youtube.com/embed/${this.props.youtubeId}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    )
  }
}