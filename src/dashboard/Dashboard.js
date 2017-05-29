import React, { Component } from 'react';
import $ from 'jquery';
import './Dashboard.css';
import Amount from '../amount/Amount';

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <div className="Dashboard-money">
					<Amount />
				</div>
        <div className="row">
          <div className="btn-group-vertical col-xs-7 col-xs-offset-2 col-sm-4 col-sm-offset-4">
						<button type="button" className="btn btn-default">Total Money retired</button>
						<button type="button" className="btn btn-default">Transactions History</button>
						<button type="button" className="btn btn-default">Load/Retirement Money</button>
					</div>
        </div>
       
      </div>
    );
  }
}

export default Dashboard;