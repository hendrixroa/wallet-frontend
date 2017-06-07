import React, { Component } from 'react';
import './Dashboard.css';
import Amount from '../amount/Amount';

class Dashboard extends Component {

  constructor(props){
		super(props);
  }

  goTotalRetired(){
    window.location.href = '/#/total-retired';
  }

  goFormRetireAndRetireMoney(){
    window.location.href = '/#/load-and-retire-money';
  }

  goTransactionsHistory(){
    window.location.href = '/#/transactions-history';
  }

  goRequests(){
    window.location.href = '/#/requests';
  }

  render() {
    return (
      <div className="Dashboard">
        <div className="Dashboard-money">
					<Amount ref="amount" />
				</div>
        <div className="row">
          <div className="btn-group-vertical col-xs-7 col-xs-offset-2 col-sm-4 col-sm-offset-4">
						<button type="button" className="btn btn-default" onClick={this.goTotalRetired}>Total Money retired</button>
						<button type="button" className="btn btn-default" onClick={this.goTransactionsHistory}>Transactions History</button>
						<button type="button" className="btn btn-default" onClick={this.goFormRetireAndRetireMoney}>Load/Retirement Money</button>
            <button type="button" className="btn btn-default" onClick={this.goRequests}>Requests</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;