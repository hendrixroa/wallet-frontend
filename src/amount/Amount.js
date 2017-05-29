import React, { Component } from 'react';
import './Amount.css';

class Amount extends Component {

  constructor(props){
		super(props);

		this.state = {
			total: ''
		};  
  }  

  render() {
    return (
      <div className="Amount">
       <p>$ 1000</p>
      </div>
    );
  }
}

export default Amount;