import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import './App.css';

import PrivateRoute from "./components/private-route/private_route.component";

import Dashboard from './components/dashboard.component';
import Header from './components/navbar.component';
import SongPanel from './components/song-panel.component';
import Login from './components/login/login.component';
import Register from './components/login/register.component';

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
          <Header />
          <div className="content">
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path='/songs' exact component={SongPanel} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router> 
      </Provider>
    );
  }
}

export default App;
