import React, { Component } from 'react';
import toastr from 'toastr';
import $ from 'jquery';
import './Transactions-history.css';

class TransactionsHistory extends Component {

  constructor(props){
    super(props);

    this.state = {
      transactions: []
    };
  
    this.api = 'http://localhost:8080';
    let userLogged = JSON.parse(sessionStorage.getItem('user'));

    $.ajax({
      url : this.api + '/transactions/user/' + userLogged.id,
      type: 'get',
      success : data => {	 				
        if(data.transactions !== null){
          this.setState({
            transactions: data.transactions
          });
        }
        
      },
      error: err =>{
        toastr.warning('Error connecting with server, try later');
      }
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel panel-info">
            <div className="panel-heading">
              <b>Your Transactions History</b>
            </div>
              <div className="panel-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th># Transaction</th>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Quantity</th>	
                    </tr>
                  </thead>
                  <tbody>
                      {
                        this.state.transactions.map((transaction,index) => {
                          return (<tr key={ transaction.id }> 
                            <td>{transaction.id}</td>
                            <td>{transaction.date.slice(0,10)}</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.quantity}</td> 
                            </tr>
                          )
                        })
                      }
                  </tbody>
                </table>
              </div>
          </div>		
        </div>
      </div>	
    );
  }
}

export default TransactionsHistory;