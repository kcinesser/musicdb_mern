import React, { Component } from 'react';

export default class SongList extends Component {
    constructor(props) {
        super(props)

        this.songList = this.songList.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.alert = this.alert.bind(this);

        this.state = {
            deleteLinkClicked: false,
            alertItem: ''
        }
    }

    alert(id = '') {
        this.setState({
            deleteLinkClicked: !this.state.deleteLinkClicked,
            alertItem: id
        });
    }

    onDelete(e, id) {
        e.preventDefault();

        this.props.onDelete(id);

        this.setState({
            deleteLinkClicked: false,
            alertItem: ''
        });
    }

    songList() {
        return this.props.songs.map((song, key) => {
            return (
                <li key={song._id}>
                    <div onClick={() => this.props.songSelector(song)} className="border-right">
                        {song.title} - {song.artist}
                    </div>
                    <div>
                        <i onClick={() => this.alert(song._id)} className="fa fa-trash text-right"></i>                        
                    </div>

                    {
                        this.state.deleteLinkClicked && song._id === this.state.alertItem ?

                        <div variant="danger">
                            Are you sure you want to delete? {' '}
                            <h3 href="#" className="mr-3" onClick={(e) => this.onDelete(e, song._id)}>Delete</h3>
                            <button onClick={() => this.alert()}>Cancel</button>
                        </div>

                        :

                        <div></div>                        
                    }
                </li>
            )
        });
    }

    render() {
        return (
            <ul>
                {this.songList()}
            </ul>
        )
    }
}