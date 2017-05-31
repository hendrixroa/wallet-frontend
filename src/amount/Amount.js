import React, { Component } from 'react';
import io from 'socket.io-client';
import './Amount.css';
let socket = io('http://localhost:8080');

class Amount extends Component {

  constructor(props){
		super(props);

		this.state = {
			total: 1000
		}; 

    socket.on('broadcast', data => {
      console.log('Received data from server '+ data);
      this.setState({ total: data });
    }); 
  }

  render() {
    return (
      <div className="Amount">
       <p>$ {this.state.total}</p>
      </div>
    );
  }
}

export default Amount;