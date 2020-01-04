import React, { Component } from 'react';

export default class EditArtist extends Component {
  constructor(props) {
    super(props)

    this.handleInput = this.handleInput.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      spotify_id: '',
      image_url: ''
    }
  }

  componentDidMount() {
    let artist = this.props.artist;

    this.setState({
      name: artist.name,
      spotify_id: artist.spotify_id,
      image_url: artist.image_url
    });
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleForm() {
    this.props.toggleForm();
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.onSubmit({ 
        id: this.props.artist._id,
        name: this.state.name, 
        spotify_id: this.state.spotify_id, 
        image_url: this.state.image_url, 
    });
  }

  render() {
    return (
      <div className="modal">
        <div className="modal__content">
          <div className="modal__header">
            <h2>Edit Artist</h2>
            <span className="button button--close" onClick={this.toggleForm}></span>
          </div>
          <form onSubmit={this.onSubmit} >
            <input name="name" onChange={this.handleInput} placeholder="Name" value={this.state.name} autoComplete="off" />
            <input name="spotify_id" onChange={this.handleInput} placeholder="Spotify ID" value={this.state.spotify_id} autoComplete="off" />
            <input name="image_url" onChange={this.handleInput} placeholder="Image URL" value={this.state.image_url} autoComplete="off" />
            <div className="submit-container">
              <button className="button button--primary" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}