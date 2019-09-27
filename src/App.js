import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Dashboard from './components/dashboard.component';
import Navbar from './components/navbar.component';
import SongPanel from './components/song-panel.component';

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={Dashboard} />
      <Route path='/songs' exact component={SongPanel} />
    </Router> 
  );
}

export default App;
