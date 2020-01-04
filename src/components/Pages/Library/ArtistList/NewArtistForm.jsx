import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewArtist extends Component {
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

    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    toggleForm() {
        this.props.toggleForm();
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.onSubmit({ 
            name: this.state.name, 
            spotify_id: this.state.spotify_id, 
            image_url: this.state.image_url, 
            user_id: this.props.auth.user.id 
        });
    }

    render() {
        return (
           <div className="modal">
                <div className="modal__content">
                    <div className="modal__header">
                        <h2>New Artist</h2>
                        <span className="button button--close" onClick={this.toggleForm}></span>
                    </div>
                    <form onSubmit={this.onSubmit} >
                        <input name="name" onChange={this.handleInput} placeholder="Name" autoComplete="off" />
                        <input name="spotify_id" onChange={this.handleInput} placeholder="Spotify ID" autoComplete="off" />
                        <input name="image_url" onChange={this.handleInput} placeholder="Image URL" autoComplete="off" />
                        <div className="submit-container">
                            <button className="button button--primary" type="submit">Add Artist</button>
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

export default connect(mapStateToProps)(NewArtist);