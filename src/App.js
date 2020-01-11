import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import './styles/App.scss';

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Login from './components/Pages/Login/Login';
import Register from './components/Pages/Login/Register';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import Search from './components/Pages/Search/Search';
import ArtistList from './components/Pages/Library/ArtistList/ArtistList';
import SongList from './components/Pages/Library/SongList/SongList';
import RoutineList from './components/Pages/Library/RoutineList/RoutineList';
import GenreList from './components/Pages/Library/GenreList/GenreList';
import InstrumentList from './components/Pages/Library/InstrumentList/InstrumentList';
import Artist from './components/Pages/Artist/Artist';
import Song from './components/Pages/Song/Song';
import Routine from './components/Pages/Routine/Routine';

var request = require('request'); // "Request" library

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);

    // Decode token and get user info and exp
    const decoded = jwt_decode(token);

    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds

    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = "./login";
    }
}

class App extends Component {
  render() {
    // let client_id = process.env.REACT_APP_SPOTIFY_ID
    // let client_secret = process.env.REACT_APP_SPOTIFY_SECRET

    // var authOptions = {
    //   url: 'https://accounts.spotify.com/api/token',
    //   headers: {
    //     'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    //   },
    //   form: {
    //     grant_type: 'client_credentials'
    //   },
    //   json: true
    // };

    // request.post(authOptions, function(error, response, body) {
    //   if (!error && response.statusCode === 200) {
    
    //     // use the access token to access the Spotify Web API
    //     var token = body.access_token;
    //     var options = {
    //       url: 'https://api.spotify.com/v1/search?q=bob&type=artist',
    //       headers: {
    //         'Authorization': 'Bearer ' + token
    //       },
    //       json: true
    //     };
    //     request.get(options, function(error, response, body) {
    //       console.log(body);
    //     });
    //   }
    // });

    return (
      <Provider store={store}>
        <Router>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Switch>
            <RouteWithLayout exact path="/" component={Dashboard} />
            <RouteWithLayout exact path="/library/songs" component={SongList} />
            <RouteWithLayout exact path="/library/artists" component={ArtistList} />
            <RouteWithLayout exact path="/library/routines" component={RoutineList} />
            <RouteWithLayout exact path="/library/instruments" component={InstrumentList} />
            <RouteWithLayout exact path="/library/genres" component={GenreList} />
            <RouteWithLayout exact path="/search" component={Search} />
            <RouteWithLayout exact path="/artist/:id" component={Artist} />
            <RouteWithLayout exact path="/song/:id" component={Song} />
            <RouteWithLayout exact path="/routine/:id" component={Routine} />
          </Switch>
        </Router> 
      </Provider>
    );
  }
}

const RouteWithLayout = ({ component, ...rest }) => {
  return (
    <PrivateRoute {...rest} component={component} />
  );
};

export default App;
