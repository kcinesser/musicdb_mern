import React, { Component } from 'react';

export default class YouTube extends Component {
  render() {
    const id = this.props.id
    return (
      <div>
        {id ?
          <iframe width="560" height="315" src={`https://www.youtube.com/embed/${this.props.id}`} title={id} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          :
          ''
        }
      </div>
    )
  }
}