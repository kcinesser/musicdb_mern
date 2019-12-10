import React, { Component } from 'react';

export default class SongList extends Component {
  constructor(props) {
    super(props)

    this.songList = this.songList.bind(this);
  }

  songList() {
    // return this.props.artists.map((artist, key) => {
    //   return artist.songs.map(song => {
    //     return ( 
    //       <li key={song._id} className="flex song-item">
    //         <div className="w-1/3">
    //           {song.title}
    //         </div>
    //         <div className="w-1/3">
    //           {artist.name}
    //         </div>
    //       </li>
    //     )
    //   })
    // });
  }

  render() {
    return (
      <div className="song-list">
        <div className="flex w-full">
          <div className="w-1/3 list__header">Title</div>
          <div className="w-1/3 list__header">Artist</div>
        </div>
        <ul>
          {this.songList()}
        </ul>
      </div>
    )
  }
}