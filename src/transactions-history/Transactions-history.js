import React, { Component } from 'react';
import toastr from 'toastr';
import $ from 'jquery';
import './Transactions-history.css';
import { Panel, Table, Col, Row } from 'react-bootstrap';

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
      <Row>
        <Col sm={6} smOffset={3} >
          <Panel header={(<b>Your Transactions History</b>)} bsStyle="info">              
            <Table responsive>
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
            </Table>
          </Panel>
        </Col>
      </Row>            	
    );
  }
}

export default TransactionsHistory;