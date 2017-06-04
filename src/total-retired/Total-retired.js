import React, { Component } from 'react';
import toastr from 'toastr';
import $ from 'jquery';
import './Total-retired.css';

class TotalRetired extends Component {

  constructor(props){
    super(props);

    this.state = {
      transactions: []
    };
  
    this.api = 'http://localhost:8080';
    let userLogged = JSON.parse(sessionStorage.getItem('user'));

    $.ajax({
      url : this.api + '/transactions/user/' + userLogged.id + '/retire',
      type: 'get',
      success : data => {	 				
        if(data.retirements !== null){
          this.setState({
            transactions: data.retirements
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
              <b>Your Retire History</b>
            </div>
              <div className="panel-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th># Retire</th>
                      <th>Date</th>
                      <th>Quantity</th>	
                    </tr>
                  </thead>
                  <tbody>
                      {
                        this.state.transactions.map((transaction,index) => {
                          return (
                            <tr key={ transaction.id }> 
                              <td>{transaction.id}</td>
                              <td>{transaction.date.slice(0,10)}</td>
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

export default TotalRetired;