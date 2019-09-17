import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,Switch } from "react-router";
import { createBrowserHistory } from 'history'
import Booking from './components/booking/index'
import Login from './components/login/index'
import NotFound from './components/NotFound/index'
import './styles/app.scss'
import 'antd/dist/antd.css'



const history = createBrowserHistory()

const renderApp = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Booking}/>
      <Route exact path="/login" component={Login}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
)
ReactDOM.render(renderApp, document.getElementById('app-container'));

