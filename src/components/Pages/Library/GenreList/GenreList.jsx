import React, { Component } from 'react';

import LibraryNav from '../LibraryNav';

export default class GenreList extends Component {
  render() {
    return (
      <div className="genre-list">
        <LibraryNav />
        <h1>Genres</h1>
      </div>
    )
  }
}