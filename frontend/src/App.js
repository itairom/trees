import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {AppHeader } from './cmps/AppHeader'
import './assets/main.css'
import './assets/style/main.scss'
import { Home } from './pages/Home';
import { About } from './pages/About';
import { TreesSurvey } from './pages/TreesSurvey';
import { TreesForm } from './cmps/TreesForm';

function App() {
  return (
    <div className="content-wrapper">
      <AppHeader/>
      <Switch>
        <Route path="/about" component={ About } />
        <Route path="/trees" component={ TreesSurvey } />
        <Route path="/form" component={ TreesForm } />
        {/* <Route path="/" component={ Home } /> */}
      </Switch>
    </div>
  );
}

export default App;
