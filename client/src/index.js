import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,Switch } from "react-router";
import { createBrowserHistory } from 'history'
import Booking from './components/booking/index'
import Login from './components/login/index'
import NotFound from './components/notFound/index'
import './styles/app.scss'
import 'antd/dist/antd.css'
import AdminPanel from './components/adminPanel';
import EditBookingForm from './components/booking/components/EditBookingForm'



const history = createBrowserHistory()

const renderApp = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Booking}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/a" component={AdminPanel}/>
      <Route exact path="/booking/edit" component={EditBookingForm}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
)
ReactDOM.render(renderApp, document.getElementById('app-container'));

