import React, { Component } from 'react';

import LibraryNav from '../LibraryNav';

export default class RoutineList extends Component {
  render() {
    return (
      <div className="routine-list">
        <LibraryNav />
        <h1>Routines</h1>
      </div>
    )
  }
}