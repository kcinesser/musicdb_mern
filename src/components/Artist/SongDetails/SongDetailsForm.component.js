import React, { Component } from 'react';
import DifficultyRating from './DifficultyRating.component';

import { Statuses, Instruments, Genres } from '../../../utils/enums/enums';

export default class SongDetailsForm extends Component {
    constructor() {
        super();

        this.titleChange = this.titleChange.bind(this);
        this.albumChange = this.albumChange.bind(this);
        this.spotifyChange = this.spotifyChange.bind(this);
        this.youtubeChange = this.youtubeChange.bind(this);
        this.notesChange = this.notesChange.bind(this);
        this.statusChange = this.statusChange.bind(this);
        this.instrumentChange = this.instrumentChange.bind(this);
        this.genreChange = this.genreChange.bind(this);
        this.selectOptions = this.selectOptions.bind(this);
        this.difficultyChange = this.difficultyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            _id: '',
            title: '',
            album: '',
            difficulty: '',
            status: '',
            instrument: '',
            spotify_id: '',
            youtube_id: '',
            notes: '',
            genre: ''
        }
    }

    componentDidMount() {
        let song = this.props.song;

        this.setState({
            _id: song._id,
            artist_id: this.props.artist_id,
            title: song.title,
            album: song.album || '',
            difficulty: song.difficulty || 0,
            status: song.status || '',
            instrument: song.instrument || '',
            spotify_id: song.spotify_id || '',
            youtube_id: song.youtube_id || '',
            notes: song.notes || '',
            genre: song.genre || ''
        });
    }

    titleChange(e) {
        this.setState({
            title: e.target.value 
        })
    }

    albumChange(e) {
        this.setState({
            album: e.target.value 
        })
    }    

    spotifyChange(e) {
        this.setState({
            spotify_id: e.target.value
        })
    }

    youtubeChange(e) {
        this.setState({
            youtube_id: e.target.value
        })
    }

    notesChange(e) {
        this.setState({
            notes: e.target.value
        })
    }

    statusChange(e) {
        this.setState({
            status: e.target.value
        })
    }

    instrumentChange(e) {
        this.setState({
            instrument: e.target.value
        })
    }

    genreChange(e) {
        this.setState({
            genre: e.target.value
        })
    }

    selectOptions(options) {
        return options.map((value) => {
            return <option value={value} key={value}>{value}</option>
        });
    }

    difficultyChange(rating) {
        this.setState({
            difficulty: rating
        })
    }
 
    handleSubmit(e) {
        e.preventDefault();
        this.props.onSongSave(this.state);
    }

    render() {
        return (
            <div>
                <form className="form form--full" onSubmit={this.handleSubmit}>
                    <div className="form__body">
                        <div className="form__control">
                            <span className="form__label">Album:</span>
                            <input type="text" className="form__subheader" value={this.state.album} onChange={this.albumChange} />
                        </div>

                        <div className="form__control">
                            <span className="form__label">Title:</span>
                            <input type="text" className="form__header" value={this.state.title} onChange={this.titleChange} />
                        </div>

                        <div className="form__control">
                            <span className="form__label">Difficulty:</span>
                            <DifficultyRating rating={this.props.song.difficulty} onDifficultyChange={this.difficultyChange} />
                        </div>

                        <div className="form__control">
                            <span className="form__label">Status:</span>
                            <select value={this.state.status} onChange={this.statusChange}>
                                {this.selectOptions(Statuses)}
                            </select>
                        </div>

                        <div className="form__control">
                            <span className="form__label">Instrument:</span>
                            <select value={this.state.instrument || "Select Instrument"} onChange={this.instrumentChange}>
                                <option disabled value="Select Instrument">Select Instrument</option>
                                {this.selectOptions(Instruments)}
                            </select>
                        </div>

                        <div className="form__control">
                            <span className="form__label">Genre:</span>
                            <select value={this.state.genre || "Select Genre"} onChange={this.genreChange}>
                                <option disabled value="Select Genre">Select Genre</option>
                                {this.selectOptions(Genres)}
                            </select>
                        </div>

                        <div className="form__control">
                            <span className="form__label">Spotify ID:</span>
                            <input type="text" value={this.state.spotify_id} onChange={this.spotifyChange} />
                        </div>

                        <div className="form__control">
                            <span className="form__label">Youtube ID:</span>
                            <input type="text" value={this.state.youtube_id} onChange={this.youtubeChange} />
                        </div>

                        <div className="form__control">
                            <span className="form__label">Notes:</span>
                            <textarea value={this.state.notes} onChange={this.notesChange}></textarea>
                        </div>
                    </div>

                    <div className="form__buttons">
                        <button type="submit" className="w-2/5 form-button form-button--main"><i className="fa fa-check"></i></button>
                        <div className="w-2/5 form-button form-button--secondary" onClick={this.props.disableEditing}><i className="fa fa-times"></i></div>
                        <div className="w-1/5 py-3 form-button"><i className="fa fa-trash-o text-red-500"></i></div>
                    </div>
                </form>
            </div>
        )
    }
}