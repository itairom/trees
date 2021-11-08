import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppHeader } from './cmps/AppHeader'
import './assets/main.css'
import './assets/style/main.scss'
import { About } from './pages/About';
import { TreesSurvey } from './pages/TreesSurvey';
import { ChooseSurvey } from './pages/ChooseSurvey';
import { CreateSurvey } from './pages/CreateSurvey';
import { SurveyEditor } from './pages/SurveyEditor';
import { TreeUpdate } from './pages/TreeUpdate';
import { Home } from './pages/Home';
import { Login } from './cmps/Login';
import { Signup } from './cmps/Signup';

function App() {
  return (
    <div id="swup" className="transition content-wrapper">
      <AppHeader />
      <Switch> 
        <Route path="/about" component={About} />
        <Route path="/trees" component={TreesSurvey} />
        <Route path="/tree_update/:treeId" component={TreeUpdate} />
        <Route path="/survey_editor" component={SurveyEditor} />
        <Route path="/choose_survey" component={ChooseSurvey} />
        <Route path="/create_survey" component={CreateSurvey} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
