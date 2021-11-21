import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppHeader } from './cmps/AppHeader'
import './assets/main.css'
import './assets/style/main.scss'
import { About } from './pages/About';
import { ChooseSurvey } from './pages/ChooseSurvey';
import { CreateSurvey } from './pages/CreateSurvey';
// import { FinalSurvey } from './pages/FinalSurvey';
// import { SurveyEditor } from './pages/SurveyEditor';
import { TreeUpdate } from './pages/TreeUpdate';
import { Home } from './pages/Home';
import { Login } from './cmps/Login';
import { Signup } from './cmps/Signup';
import { ReactComponent as Loader } from './assets/svg/grid.svg';

const SurveyEditor = lazy(() => import('./pages/SurveyEditor'));
const FinalSurvey = lazy(() => import('./pages/FinalSurvey'));



function App() {
  return (
    <div id="swup" className="transition content-wrapper">
      <AppHeader />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/trees" component={FinalSurvey} />
          <Route path="/tree_update/:treeId" component={TreeUpdate} />
          <Route path="/survey_editor" component={SurveyEditor} />
          <Route path="/choose_survey" component={ChooseSurvey} />
          <Route path="/create_survey" component={CreateSurvey} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/" component={Home} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
