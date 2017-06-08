import React, { Component } from 'react';
import toastr from 'toastr';
import $ from 'jquery';
import './Total-retired.css';
import { Col, Row, Table, Panel } from 'react-bootstrap';

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
      <Row>
        <Col sm={6} smOffset={3}>
          <Panel header={(<b>Your retirements history</b>)} bsStyle="warning"> 
            <Table responsive>
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
            </Table>
          </Panel>
        </Col>
      </Row> 	
    );
  }
}

export default TotalRetired;