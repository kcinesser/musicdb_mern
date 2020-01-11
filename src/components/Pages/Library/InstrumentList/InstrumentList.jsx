import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LibraryNav from '../LibraryNav';

export default class GenreList extends Component {
  render() {
    return (
      <div className="instruments-page">
        <LibraryNav />
        <div className="page-header">
          <h2 className="page-title">Instruments</h2>
        </div>
        <div className="instrument-list">
          <div className="instrument-card">
              <div className="instrument-card__wrapper">
                  <Link className="instrument-card__inner" style={{ backgroundImage: 'url(https://musicdbproduction.s3.amazonaws.com/assets/acoustic-guitar.jpg)' }}>
                      <div className="instrument-card__title"><h3>Acoustic Guitar</h3></div>
                  </Link>
              </div>
          </div>
          <div className="instrument-card">
              <div className="instrument-card__wrapper">
                  <Link className="instrument-card__inner" style={{ backgroundImage: 'url(https://musicdbproduction.s3.amazonaws.com/assets/electric-guitar.jpg)' }}>
                      <div className="instrument-card__title"><h3>Electric Guitar</h3></div>
                  </Link>
              </div>
          </div>
          <div className="instrument-card">
              <div className="instrument-card__wrapper">
                  <Link className="instrument-card__inner" style={{ backgroundImage: 'url(https://musicdbproduction.s3.amazonaws.com/assets/piano.jpg)' }}>
                      <div className="instrument-card__title"><h3>Piano</h3></div>
                  </Link>
              </div>
          </div>
          <div className="instrument-card">
              <div className="instrument-card__wrapper">
                  <Link className="instrument-card__inner" style={{ backgroundImage: 'url(https://musicdbproduction.s3.amazonaws.com/assets/bass.jpg)' }}>
                      <div className="instrument-card__title"><h3>Bass</h3></div>
                  </Link>
              </div>
          </div>
        </div>
      </div>
    )
  }
}