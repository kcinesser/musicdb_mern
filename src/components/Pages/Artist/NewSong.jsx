import React, { Component } from 'react';
import { connect } from 'react-redux';

import Difficulty from '../../Difficulty';
import Upload from '../../Upload';

import { Genres, Instruments, Statuses } from '../../../services/enums/SongEnums';

class NewSong extends Component {
  constructor(props) {
    super(props)

    this.handleInput = this.handleInput.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.onRate = this.onRate.bind(this);
    this.selectFields = this.selectFields.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      album: '',
      difficulty: 0,
      user_id: '',
      notes: '',
      status: '',
      instrument: '',
      genre: '',
      spotify_id: '',
      youtube_id: '',
      file: ''
    }
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleUpload(file) {
    this.setState({file: file})
  }

  onRate(rating) {
    this.setState({ difficulty: rating });
  }

  selectFields(type) {
    return type.map((option, key) => {
      return <option value={type[key]} key={key}>{option === '' ? 'None' : option}</option>
    })
  }

  toggleForm() {
    this.props.toggleForm();
  }

  onSubmit(e) {
    e.preventDefault();

    let newSong = this.state;
    newSong['user_id'] = this.props.auth.user.id;

    this.props.onSubmit(newSong);

    this.setState({
      title: '',
      album: '',
      difficulty: 0,
      user_id: '',
      notes: '',
      status: '',
      instrument: '',
      genre: '',
      spotify_id: '',
      youtube_id: '',
      file: ''
    })
  }

  render() {
    return (
      <div className="modal">
        <div className="modal__content">
          <div className="modal__header">
            <h2>New Song</h2>
            <span className="button button--close" onClick={this.toggleForm}></span>
          </div>
          <form onSubmit={this.onSubmit} >
            <input name="title" onChange={this.handleInput} placeholder="Title" autoComplete="off" />
            <input name="album" onChange={this.handleInput} placeholder="Album" autoComplete="off" />
            <div className="difficulty-container">
              <span className="form-label">Difficulty</span>
              <Difficulty rating={0} editable={true} onRate={this.onRate} />
            </div>
            <div className="file-container">
              <Upload handleUpload={this.handleUpload}>
                <div className="file-upload__contents">
                    <div>{this.state.file.name}</div>
                </div>
              </Upload>
            </div>
            <textarea name="notes" onChange={this.handleInput} placeholder="Notes" autoComplete="off" />
            <input name="spotify_id" onChange={this.handleInput} placeholder="Spotify ID" autoComplete="off" />
            <input name="youtube_id" onChange={this.handleInput} placeholder="Youtube ID" autoComplete="off" />
            <div className="select-container">
              <span className="form-label">Instrument</span>
              <select name="instrument" onChange={this.handleInput} defaultValue="">
                <option value="" disabled></option>
                {this.selectFields(Instruments)}
              </select>
            </div>
            <div className="select-container">
              <span className="form-label">Genre</span>
              <select name="genre" onChange={this.handleInput} defaultValue="">
                <option value="" disabled></option>
                {this.selectFields(Genres)}
              </select>
            </div>
            <div className="select-container">
              <span className="form-label">Status</span>
              <select name="status" onChange={this.handleInput} defaultValue="">
                <option value="" disabled></option>
                {this.selectFields(Statuses)}
              </select>
            </div>
            <div className="submit-container">
              <button className="button button--primary" type="submit">Add Song</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(NewSong);