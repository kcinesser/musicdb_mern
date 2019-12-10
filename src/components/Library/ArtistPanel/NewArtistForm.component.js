import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewArtist extends Component {
    constructor(props) {
        super(props)

        this.handleName = this.handleName.bind(this);
        this.handleSpotify = this.handleSpotify.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            spotify_id: '',
            image_url: ''
        }
    }

    handleName(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleSpotify(e) {
        this.setState({
            spotify_id: e.target.value
        })
    }

    handleImage(e) {
        this.setState({
            image_url: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.onAdd({ name: this.state.name, spotify_id: this.state.spotify_id, image_url: this.state.image_url, user_id: this.props.auth.user.id });

        this.setState({ name: '', spotify_id: '', image_url: '' })
    }

    render() {
        return (
           <div className="ml-3">
               <form onSubmit={this.onSubmit} >
                   <input name="name" onChange={this.handleName} placeholder="Name" />
                   <input name="spotify_id" onChange={this.handleSpotify} placeholder="Spotify ID" />
                   <input name="image_url" onChange={this.handleImage} placeholder="Image URL" />

                    <button type="submit">
                        Add Artist
                    </button>
               </form>
           </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(NewArtist);