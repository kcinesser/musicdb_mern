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

import Artist from './components/Pages/Artist/Artist';
import Song from './components/Pages/Song/Song';

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
            <RouteWithLayout exact path="/library/genres" component={GenreList} />
            <RouteWithLayout exact path="/search" component={Search} />
            <RouteWithLayout exact path="/artist/:id" component={Artist} />
            <RouteWithLayout exact path="/song/:id" component={Song} />
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
