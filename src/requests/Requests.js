import React, { Component } from 'react';
import toastr from 'toastr';
import $ from 'jquery';
import './Requests.css';
import { Table, Panel, Row, Col } from 'react-bootstrap';

class Requests extends Component {

  constructor(props){
    super(props);

    this.state = {
      requests: []
    };
  
    this.api = 'http://localhost:8080';
    let userLogged = JSON.parse(sessionStorage.getItem('user'));

    $.ajax({
      url : this.api + '/requests/user/' + userLogged.id,
      type: 'get',
      success : data => {	 				
        if(data.requests !== null){
          this.setState({
            requests: data.requests
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
          <Panel header={(<b>Your requests history</b>)} bsStyle="info">              
            <Table responsive>
              <thead>
                <tr>
                  <th># Request</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Operation</th>
                  <th>Quantity</th>
                  <th>Message</th>	
                </tr>
              </thead>
              <tbody>
                {
                  this.state.requests.map((request,index) => {
                    return (<tr key={ request.id }> 
                      <td>{request.id}</td>
                      <td>{request.date.slice(0,10)}</td>
                      <td>{request.status}</td>
                      <td>{request.operation}</td>
                      <td>{request.quantity}</td>
                      <td>{request.message}</td> 
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

export default Requests;