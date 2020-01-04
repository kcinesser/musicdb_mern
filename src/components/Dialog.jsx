import React, { Component } from 'react';

export default class Dialog extends Component {
  render() {
    return (
      <div className="dialog-box">
        <div className="dialog-box__content">
          { this.props.children }
        </div>
      </div>
    )
  }
}