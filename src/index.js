import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';
import './css/tailwind.css';

import Nav from './components/Nav/Nav';
import App from './components/App/App';
import NewMeeting from './components/NewMeeting/NewMeeting';
import MakeQuestion from './components/MakeQuestion/MakeQuestion';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <div>
      <Nav />

      <Switch>
        <Route path='/meeting/:code'>
          <NewMeeting />
        </Route>
        <Route path='/question/:code'>
          <MakeQuestion />
        </Route>
        <Route path='/'>
          <App />
        </Route>
      </Switch>
    </div>
  </Router>,
  document.getElementById('root'),
);

serviceWorker.unregister();
