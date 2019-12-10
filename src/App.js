import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import PrivateRoute from "./components/private-route/private_route.component";

import Login from './components/login/login.component';
import Register from './components/login/register.component';
import Library from './components/Library/Library.component';
import Dashboard from './components/dashboard.component';
import Search from './components/search.component';
import Artist from './components/Artist/ArtistPage.component';

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
          <RouteWithLayout exact path="/" component={Dashboard} text="Dashboard" />
            <RouteWithLayout exact path="/library" component={Library} text="Your Library" />
            <RouteWithLayout exact path="/search" component={Search} text="Search" />
            <RouteWithLayout exact path="/artist/:id" component={Artist} />
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
