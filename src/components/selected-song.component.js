import React, { Component } from 'react';

export default class SelectedSong extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if(this.props.selectedSong) {
            return (
                <div>
                    <h1>Selected Song</h1>
                    <p><strong>{this.props.selectedSong.title}</strong></p>
                    <p>{this.props.selectedSong.artist}</p>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}