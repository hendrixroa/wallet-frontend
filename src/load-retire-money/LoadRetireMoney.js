import React, { Component } from 'react';
import toastr from 'toastr';
import $ from 'jquery';
import './LoadRetireMoney.css';

class LoadRetireMoney extends Component {

	constructor(props){
		super(props);

		this.state = {
			quantity: '',
			operation: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.api = 'http://localhost:8080';
	}
  
	handleOnChange(event){
		let target = event.target;
		let name = target.name;

		this.setState({
			[name]: target.value 
		});
	}

	handleSubmit(event){
		event.preventDefault();
		let values = document.querySelectorAll('[name=quantity],[name=operation]');
		/**
		 * Todo:
		 * obtenemos la data del componente amount para verificar que no quiera retirar una 
		 * cantidad de fondos mayor a la disponible
		 * 
		 */
		/*$.ajax({
			url : this.api + '/request',
			type: 'post',
			data: 'quantity=' + values[0].value + '&operation=' + values[1].value + '&date=' + new Date().toISOString().slice(0, 10) +
			 '&id_requester=' + sessionStorage.getItem('user_wallet').id,
			success : data => {	 
				if(data.user != ''){
					toastr.success('¡You are Logged!', 'Login Successfully');
					window.location.href = '/#/dashboard';
				}else{
					toastr.error('The username or password are invalids', 'Wrong data');
				}
			},
			error: err =>{
				toastr.warning('Error connecting with server, try later');
			}
		});*/
	}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Quantity
        </label>
				<input type="text" name="quantity" value={this.state.quantity} onChange={this.handleOnChange} /><br/>
				<label>
          Selected the operation
          <select value={this.state.value} name="operation" onChange={this.handleChange}>
            <option value="retirement">Retirement</option>
            <option value="payment">Payment</option>
          </select>
        </label>
        <input type="submit" value="Retire" />
      </form>
    );
  }
}

export default LoadRetireMoney;