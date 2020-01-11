import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

import LibraryNav from '../LibraryNav';
import RoutineService from '../../../../services/RoutineService';

var moment = require('moment');

class RoutineList extends Component {
  routineService = new RoutineService();

  constructor(props) {
    super(props)

    this.state = {
      routines: []
    }
  }

  componentDidMount() {
    let user = this.props.auth.user.id;

    this.routineService.getRoutines(user)
      .then(res => {
          this.setState({
              routines: res,
          })
      })
      .catch(err => {console.log(err)})
  }

  routineList() {
    return this.state.routines.map((routine, key) => {
      let lastPlayed = '';
      if(routine.lastPlayed) {
        lastPlayed = moment(routine.lastPlayed).format("MMM D, YYYY")
      } else {
        lastPlayed = "Never"
      }

      return (
        <Link className="routine-list__item" key={key} to={`/routine/${routine._id}`} >
          <p>{routine.name}</p>
          {routine.lastPlayed ?
              <p>{lastPlayed}</p>
              :
              <p>Never</p>
            }
          <p>{routine.songs.length}</p>
          <p>{routine.estTime} min</p>
        </Link>
      )
    })
  }

  render() {
    return (
      <div className="routines-page">
        <LibraryNav />
        <div className="page-header">
          <h2 className="page-title">Routines</h2>
        </div>
        <div className="routine-list">
         <div className="routine-list__header">
            <p>Playlist Name</p>
            <p>Last Played</p>
            <p># Items</p>
            <p>Est. Time</p>
          </div>
          {this.routineList()}
        </div>
      </div>
    )
  }
}

RoutineList.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(RoutineList);