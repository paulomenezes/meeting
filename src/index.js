import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './index.css';
import './css/tailwind.css';

import App from './components/App/App';
import NewMeeting from './components/NewMeeting/NewMeeting';
import MakeQuestion from './components/MakeQuestion/MakeQuestion';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <div>
      <nav className='flex items-center justify-between flex-wrap bg-orange-400 p-6 mb-4 shadow'>
        <div className='flex items-center flex-shrink-0 text-white mr-6'>
          <Link to='/'>
            <svg
              className='fill-current h-8 w-8 mr-2'
              width='54'
              height='54'
              viewBox='0 0 54 54'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z' />
            </svg>
          </Link>
          <Link to='/'>
            <span className='font-semibold text-xl tracking-tight'>Meeting</span>
          </Link>
        </div>
      </nav>

      <Switch>
        {/* <Route path='/about'>
          <About />
        </Route> */}
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
