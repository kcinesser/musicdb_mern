import React, { Component } from 'react';

export default class SongForm extends Component {
  constructor(props) {
    super(props);

    this.onChangeSongTitle = this.onChangeSongTitle.bind(this);
    this.onChangeAlbumName = this.onChangeAlbumName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      album: ''
    }
  }

  onChangeSongTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeAlbumName(e) {
    this.setState({
      album: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.addSong({ title: this.state.title, album: this.state.album })
    this.setState({ title: '', album: '' })
  }

  render() {
    return (
      <form className="form form--inline" onSubmit={this.onSubmit}>
          <input value={this.state.title}
            onChange={this.onChangeSongTitle} placeholder="Title" />

          <input value={this.state.album}
            onChange={this.onChangeAlbumName} placeholder="Album" />

          <button className="button" type="submit">
            Add Song
          </button>
      </form>
    )
  }
}