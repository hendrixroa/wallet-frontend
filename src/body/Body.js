import React, { Component } from 'react';
import './Body.css';
import Login from '../login/Login';

class Body extends Component {
  render() {
    return (
      <div className="Body">
          <p className="Body-intro">Your prefer site e-wallet</p>  
          <Login />
      </div>
    );
  }
}

export default Body;