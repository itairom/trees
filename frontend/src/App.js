import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {AppHeader } from './cmps/AppHeader'
import './assets/main.css'
import './assets/style/main.scss'
import { Home } from './pages/Home';
import { About } from './pages/About';

function App() {
  return (
    <div className="content-wrapper">
      <AppHeader/>
      <Switch>
        <Route path="/about" component={ About } />
        <Route path="/" component={ Home } />
      </Switch>
    </div>
  );
}

export default App;
