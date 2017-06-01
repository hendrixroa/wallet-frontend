import React, { Component } from 'react';
import {
  HashRouter,
  Route,
  Link
} from 'react-router-dom';
import './Body.css';
import Login from '../login/Login';
import Admin from '../admin/Admin';
import Dashboard from '../dashboard/Dashboard';
import LoadAndRetireMoney from '../load-and-retire-money/LoadAndRetireMoney';

class Body extends Component {
  render() {
    return (
      <HashRouter>
        <div className="Body">
            <Route exact path="/" component={Login} />
            <Route path="/admin" component={Admin} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/load-and-retire-money" component={LoadAndRetireMoney} />
        </div>
      </HashRouter>  
    );
  }
}

export default Body;