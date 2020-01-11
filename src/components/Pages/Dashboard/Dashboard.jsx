import React, { Component } from 'react';
import { logoutUser } from "../../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { isSameMonth, isSameYear, isSameWeek } from 'date-fns'

import DashboardService from '../../../services/DashboardService';
import { Link } from 'react-router-dom';

import Chart from './Chart';

class Dashboard extends Component {
  dashboardService = new DashboardService();

  constructor(props) {
    super(props)

    this.state = {
      dashboard: {},
      loading: true,
      selectedRoutine: 0,
      selectedTime: 0
    }
  }

  componentDidMount() {
    let id = this.props.auth.user.id; 

    axios.get('http://localhost:5000/api/users/' + id + '/dashboard')
      .then(dashboard => {
        this.setState({
          dashboard: dashboard.data,
          loading: false
        })
      })
      .catch(err => {console.log(err)})
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  songList = () => {
    return this.state.dashboard.songs.map((song, key) => {
      return (
        <li className="dashboard__item" key={key}><Link to={'/song/' + song._id}>{song.title}</Link></li>
      )
    })
  }

  artistList = () => {
    return this.state.dashboard.artists.map((artist, key) => {
      return (
        <li className="dashboard__item" key={key}><Link to={'/artist/' + artist._id}>{artist.name}</Link></li>
      )
    })
  }

  recentlyAddedRoutineList = () => {
    return this.state.dashboard.routines.map((routine, key) => {
      return (
        <li className="dashboard__item" key={key}><Link to={'/routine/' + routine._id}>{routine.name}</Link></li>
      )
    })
  }

  recentlyPlayedRoutineList = () => {
    return this.state.dashboard.recentlyPlayed.map((routine, key) => {
        if (!routine.lastPlayed) return
        return (<li className="dashboard__item" key={key}><Link to={'/routine/' + routine._id}>{routine.name}</Link></li>)
    })
  }

  mostPlayedRoutineList = () => {
    return this.state.dashboard.mostPlayed.map((routine, key) => {
        return (<li className="dashboard__item" key={key}><Link to={'/routine/' + routine._id}>{routine.name}</Link></li>)
    })
  }

  handleRoutines = (id) => {
    this.setState({ selectedRoutine: id });
  }

  handleTimes = (id) => {
    this.setState({ selectedTime: id });
  }

  calculateTime = () => {
    let totalTime = 0;
    let yearTime = 0;
    let monthTime = 0;
    let weekTime = 0;

    this.state.dashboard.user.records.map(routine => {
      let routineObject = JSON.parse(routine);

      totalTime += Number(routineObject.duration);

      if(isSameMonth(routineObject.date, Date.now())) {
        monthTime += Number(routineObject.duration);
      }

      if(isSameYear(routineObject.date, Date.now())) {
        yearTime += Number(routineObject.duration);
      }

      if(isSameWeek(routineObject.date, Date.now())) {
        weekTime += Number(routineObject.duration);
      }
    });

    let totalSeconds = ("0" + (Math.floor(totalTime / 1000) % 60)).slice(-2);
    let totalMinutes = ("0" + (Math.floor(totalTime / 60000) % 60)).slice(-2);
    let totalHours = ("0" + Math.floor(totalTime / 3600000)).slice(-2);

    let weekSeconds = ("0" + (Math.floor(weekTime / 1000) % 60)).slice(-2);
    let weekMinutes = ("0" + (Math.floor(weekTime / 60000) % 60)).slice(-2);
    let weekHours = ("0" + Math.floor(weekTime / 3600000)).slice(-2);

    let monthSeconds = ("0" + (Math.floor(monthTime / 1000) % 60)).slice(-2);
    let monthMinutes = ("0" + (Math.floor(monthTime / 60000) % 60)).slice(-2);
    let monthHours = ("0" + Math.floor(monthTime / 3600000)).slice(-2);

    let yearSeconds = ("0" + (Math.floor(yearTime / 1000) % 60)).slice(-2);
    let yearMinutes = ("0" + (Math.floor(yearTime / 60000) % 60)).slice(-2);
    let yearHours = ("0" + Math.floor(yearTime / 3600000)).slice(-2);

    let selectedTime = this.state.selectedTime;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if(selectedTime === 0) {
      hours = weekHours;
      minutes = weekMinutes;
      seconds = weekSeconds;
    } else if (selectedTime === 1) {
      hours = monthHours;
      minutes = monthMinutes;
      seconds = monthSeconds;
    } else if (selectedTime === 2) {
      hours = yearHours;
      minutes = yearMinutes;
      seconds = yearSeconds;
    } else if (selectedTime === 3) {
      hours = totalHours;
      minutes = totalMinutes;
      seconds = totalSeconds;
    }

    return(
      <div className="played-time">
        <p>You've practiced:</p> 
        <div className="played-time__container">
          <span className="time">{hours}</span> 
          <span className="time-label">hrs</span>
          <span className="time">{minutes}</span>
          <span className="time-label">min</span>
          <span className="time">{seconds}</span>
          <span className="time-label">sec</span>
        </div>
        <div className="controls">
          <button className={"button button--control" + (selectedTime === 0 ? ' active' : '')} onClick={() => this.handleTimes(0)}>This Week</button>
          <button className={"button button--control" + (selectedTime === 1 ? ' active' : '')} onClick={() => this.handleTimes(1)}>This Month</button>
          <button className={"button button--control" + (selectedTime === 2 ? ' active' : '')} onClick={() => this.handleTimes(2)}>This Year</button>
          <button className={"button button--control" + (selectedTime === 3 ? ' active' : '')} onClick={() => this.handleTimes(3)}>All Time</button>
        </div>
      </div>
    )
  }

  render() {
    const { user } = this.props.auth;

    if(this.state.loading) {
      return null
    }

    return (
      <div className="dashboard">
        <h2>Your Dashboard</h2>
        <div className="dashboard-content">
          <div className="dashboard-content__row">
            <div className="dashboard-content__col full">
              <div>
                <h3>Breakdown</h3>
                {this.calculateTime()}
              </div>
              <Chart records={this.state.dashboard.user.records} />
            </div>
          </div>
          <div className="dashboard-content__row">
            <div className="dashboard-content__col">
              <h3>Recently Added Songs</h3>
              {this.songList()}
              <Link to={'/library/songs'} className="view-more">View All</Link>
            </div>
            <div className="dashboard-content__col">
              <h3>Recently Added Artists</h3>
              {this.artistList()}
              <Link to={'/library/artists'} className="view-more">View All</Link>
            </div>
          </div>
          <div className="dashboard-content__row">
            <div className="dashboard-content__col">    
              <h3>Your Routines</h3>
              <div className="controls">
                <button className={"button button--control" + (this.state.selectedRoutine === 0 ? ' active' : '')} onClick={() => this.handleRoutines(0)}>Recently Added</button>
                <button className={"button button--control" + (this.state.selectedRoutine === 1 ? ' active' : '')} onClick={() => this.handleRoutines(1)}>Recently Played</button>
                <button className={"button button--control" + (this.state.selectedRoutine === 2 ? ' active' : '')} onClick={() => this.handleRoutines(2)}>Most Played</button>
              </div>
              {this.state.selectedRoutine === 0 &&
                this.recentlyAddedRoutineList()
              }
              {this.state.selectedRoutine === 1 &&
                this.recentlyPlayedRoutineList()
              }
              {this.state.selectedRoutine === 2 && 
                this.mostPlayedRoutineList()
              }
              <Link to={'/library/routines'} className="view-more">View All</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);