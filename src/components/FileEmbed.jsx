import React, { Component } from 'react';

export default class FileEmbed extends Component {
  render() {
    return (
      <iframe title="tab" className="file-embed" height={this.props.height} width={this.props.width} src={this.props.file}></iframe>
    )
  }
}