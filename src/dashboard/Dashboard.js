import React, { Component } from 'react';
import './Dashboard.css';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import Amount from '../amount/Amount';

class Dashboard extends Component {

  render() {
    return (
      <Row>   
        <Col xs={7} xsOffset={2} sm={6} smOffset={3}>
          <ListGroup>
            <ListGroupItem header="Total Money retired" href="/#/total-retired">Checkout all current retirements</ListGroupItem>
            <ListGroupItem header="Transactions History" href="/#/transactions-history">All transactions history currently made</ListGroupItem>
            <ListGroupItem header="Load/Retirement Money" href="/#/load-and-retire-money">Load wallet in your account and make a request for retire it</ListGroupItem>
            <ListGroupItem header="Requests" href="/#/requests">View all requests approved or reject</ListGroupItem>
          </ListGroup>
        </Col>
        <Col>
          <Amount/>
        </Col>
      </Row>
    );
  }
}

export default Dashboard;