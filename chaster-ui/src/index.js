import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Welcome from './COMPONENTS/Welcome';
import ChatEntry from './COMPONENTS/ChatEntry'

import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
  <Router>
    <Switch>
      <Route exact path="/">
        <Welcome />
        </Route>
      <Route exact path="/chat">
        <ChatEntry />
      </Route>
    </Switch>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
