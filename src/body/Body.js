import React, { Component } from 'react';
import {
  HashRouter,
  Route
} from 'react-router-dom';
import './Body.css';
import Login from '../login/Login';
import Admin from '../admin/Admin';
import Dashboard from '../dashboard/Dashboard';
import LoadAndRetireMoney from '../load-and-retire-money/LoadAndRetireMoney';
import TransactionsHistory from '../transactions-history/Transactions-history';
import TotalRetired from '../total-retired/Total-retired';
import Requests from '../requests/Requests';

class Body extends Component {
  render() {
    return (
      <HashRouter>
        <div className="container-fluid">
            <Route exact path="/" component={Login} />
            <Route path="/admin" component={Admin} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/load-and-retire-money" component={LoadAndRetireMoney} />
            <Route path="/transactions-history" component={TransactionsHistory} />
            <Route path="/total-retired" component={TotalRetired} />
            <Route path="/requests" component={Requests} />
        </div>
      </HashRouter>  
    );
  }
}

export default Body;