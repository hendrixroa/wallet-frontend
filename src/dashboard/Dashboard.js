import React, { Component } from 'react';
import $ from 'jquery';
import './Dashboard.css';
import Amount from '../amount/Amount';

class Dashboard extends Component {

  constructor(props){
		super(props);
    
    this.getValue = this.getValue.bind(this);
	}

  getValue(){
    console.log(this.refs.amount.state.total);
  }

  goFormRetireAndRetireMoney(){
    window.location.href = '/#/load-and-retire-money';
  }

  render() {
    return (
      <div className="Dashboard">
        <div className="Dashboard-money">
					<Amount ref="amount" />
				</div>
        <div className="row">
          <div className="btn-group-vertical col-xs-7 col-xs-offset-2 col-sm-4 col-sm-offset-4">
						<button type="button" className="btn btn-default" onClick={this.getValue}>Total Money retired</button>
						<button type="button" className="btn btn-default">Transactions History</button>
						<button type="button" className="btn btn-default" onClick={this.goFormRetireAndRetireMoney}>Load/Retirement Money</button>
					</div>
        </div>
       
      </div>
    );
  }
}

export default Dashboard;