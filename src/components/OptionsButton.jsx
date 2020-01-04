import React, { Component } from 'react';

export default class OptionsButton extends Component {
  constructor(props) {
    super(props)

    this.toggleShow = this.toggleShow.bind(this);

    this.state = {
      show: false
    }
  }

  toggleShow() {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <div className="options-menu">
        <span className="button button--edit" onClick={this.toggleShow}></span>

        {this.state.show ?
          <div className="options-menu__body" onClick={this.toggleShow}>{this.props.children}</div>
          :
          ''
        }
      </div>
    )
  }
}