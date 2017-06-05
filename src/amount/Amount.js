import React, { Component } from 'react';
import io from 'socket.io-client';
import $ from 'jquery';
import toastr from 'toastr';
import './Amount.css';
let api = 'http://localhost:8080';
let socket = io(api);

class Amount extends Component {

  constructor(props){
		super(props);

		this.state = {
			total: 0
		}; 

    let userLogin = JSON.parse(sessionStorage.getItem('user'));

    $.ajax({
      url : api + '/users/' + userLogin.id + '/wallet',
      type: 'get',
      success : data => {
        if(data.wallet !== null && userLogin.id === data.wallet.id_user){
          this.setState({ total: data.wallet.money });
        }	    
      },
      error: err =>{
        console.log('Error in get amount');
      }
    });

    socket.on('broadcast', data => {
      if(userLogin.id === Number(data.id_user)){
        toastr.success('Your retirement has been aproved!', 'Retirement aproved');
        this.setState({ total: data.money });
      }
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