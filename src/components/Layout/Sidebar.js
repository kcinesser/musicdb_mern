import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, NavLink } from 'react-router-dom';
import RoutineService from '../../services/RoutineService';

class SideBar extends Component {
    routineService = new RoutineService();

    constructor() {
        super();

        this.routineList = this.routineList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);

        this.state = {
            routines: [],
            playlistName: ''
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
            .catch(err => { console.log(err) })
    }

    routineList() {
        return this.state.routines.map((routine, key) => {
            return (
                <li key={key}><Link to={"/routine/" + routine._id} 
                    onDragOver={this.handleDragOver} 
                    onDrop={(e) => this.handleDrop(e, routine._id)}
                    onDragEnd={this.handleDragEnd}>{routine.name}</Link></li>
            )
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let newRoutine = {
            name: this.state.playlistName,
            user_id: this.props.auth.user.id
        }

        this.routineService.saveRoutine(newRoutine)
            .then(routine => {
                let routines = this.state.routines;

                routines.unshift(routine);
                this.setState({ routines: routines });
            })
            .catch(err => { console.log(err)})

        this.setState({ playlistName: '' });
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleDragOver(e) {
        e.preventDefault();
        e.target.classList.add("hover");
    }

    handleDragEnd(e) {
        e.preventDefault();
        console.log(e.target)
        e.target.classList.remove("hover");
    }

    handleDrop(e, routine) {
        let song = e.dataTransfer.getData("id");

        let data = {
            song_id: song,
            routine_id: routine
        }

        e.target.classList.remove("hover");

        this.routineService.addSong(data)
            .then(res => { console.log("song added!") })
            .catch(err => { console.log(err) })
    }

    render() {
        return (
            <div className="sidebar">
                <div className="sidebar__inner">
                    <h1>Music DB</h1>
                    <ul>
                        <li><NavLink exact to="/" activeClassName="active" >Home</NavLink></li>
                        <li><NavLink to="/library/songs" activeClassName="active"
                            isActive={(match, location) => {
                                if (location.pathname.includes('/library/'))
                                    return true
                            }}>Your Library</NavLink></li>
                        <li><NavLink to="/search" activeClassName="active">Search</NavLink></li>
                    </ul>
                    <span className="sidebar__sep"></span>
                    <span className="sidebar__label">Recent Routines</span>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="playlistName" placeholder="New Routine" value={this.state.playlistName} onChange={this.handleInput} />
                    </form>
                    <ul>
                        {this.routineList()}
                        <li><Link to="/library/routines">View All</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}

SideBar.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(SideBar);