import React, { Component } from 'react';

export default class Youtube extends Component {
  render() {
    return (
      <iframe title="youtube" width={this.props.width} height={this.props.height} src={`https://www.youtube.com/embed/${this.props.youtubeId}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    )
  }
}