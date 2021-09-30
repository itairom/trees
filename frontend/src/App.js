import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {AppHeader } from './cmps/AppHeader'
import './assets/main.css'
import './assets/style/main.scss'
import { About } from './pages/About';
import { TreesSurvey } from './pages/TreesSurvey';
import { TreesForm } from './cmps/TreesForm';
import { ChooseSurvey } from './pages/ChooseSurvey';
import { CreateSurvey } from './pages/CreateSurvey';
import { SurveyEditor } from './pages/SurveyEditor';
import { Home } from './pages/Home';

function App() {
  return (
    <div className="content-wrapper">
      <AppHeader/>
      <Switch>
        <Route path="/about" component={ About } />
        <Route path="/trees" component={ TreesSurvey } />
        {/* <Route path="/form" component={ TreesForm } /> */}
        <Route path="/survey_editor" component={ SurveyEditor } />
        <Route path="/choose_survey" component={ ChooseSurvey } />
        <Route path="/create_survey" component={ CreateSurvey } />
        <Route path="/" component={ Home } />
      </Switch>
    </div>
  );
}

export default App;
