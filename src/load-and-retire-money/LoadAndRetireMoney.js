import React, { Component } from 'react';
import Amount from '../amount/Amount';
import toastr from 'toastr';
import $ from 'jquery';
import './LoadAndRetireMoney.css';
toastr.options.closeButton = true;
toastr.options.preventDuplicates = true;

class LoadAndRetireMoney extends Component {

	constructor(props){
		super(props);

		this.state = {
			quantity: '',
			operation: 'retirement'
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.isAvailableAmount = this.isAvailableAmount.bind(this);
		this.api = 'http://localhost:8080';
		this.userLogged = JSON.parse(sessionStorage.getItem('user'));
	}
  
	handleOnChange(event){
		let target = event.target;
		let name = target.name;
		this.setState({
			[name]: target.value 
		});
		
		this.isAvailableAmount(name, target.value);	
	}

	handleSubmit(event){
		event.preventDefault();
		
		$.ajax({
			url : this.api + '/requests',
			type: 'post',
			data: 'quantity=' + this.state.quantity + '&operation=' + this.state.operation + '&date=' + new Date().toISOString().slice(0, 10) +
			 '&id_requester=' + this.userLogged.id,
			success : data => {
				if(data.status === 'saved'){
					toastr.success('¡You Operation '+ this.state.operation +' has been processed¡', 'Request Processed');
					window.location.href = '/#/dashboard';
				}else if(data.status === 'in-progress'){
					toastr.info('Your requests has send, wait for an admin...');
					window.location.href = '/#/dashboard';
				}
			},
			error: err =>{
				toastr.warning('Error connecting with server, try later');
			}
		});
	}

	isAvailableAmount(name,value){
		if(name === 'quantity' && value >= this.refs.amount.state.total && this.state.operation === 'retirement'){
			this.refs.buttonSend.disabled = true;
			toastr.error('You dont have these quantity of Money', 'insufficient money');
		}else if(name === 'operation' && value === 'retirement' && this.state.quantity >= this.refs.amount.state.total){
			this.refs.buttonSend.disabled = true;
			toastr.error('You dont have these quantity of Money', 'insufficient money');
		}else{
			this.refs.buttonSend.disabled = false;
		}
	}

  render() {
    return (
		<div className="row formLoadRetire">
			<Amount ref="amount" />
			<div className="col-sm-5 col-sm-offset-4">
				<h3>Load or retire your money fast!</h3>
			</div>
			 <div className="col-md-8 col-sm-offset-4">
			 	<form onSubmit={this.handleSubmit} className="form-horizontal" >
					<div className="form-group">
						<label className="col-sm-2 control-label">
							Quantity
						</label>
						<div className="col-sm-4">
							<input type="number" className="form-control" name="quantity" value={this.state.quantity} onChange={this.handleOnChange} />
						</div>	
					</div>
					<div className="form-group">
						<label className="col-sm-2 control-label">
							Select the operation
						</label>
						<div className="col-sm-4">
							<select name="operation" className="form-control" value={this.state.operation} onChange={this.handleOnChange}>
								<option value="retirement">Retirement</option>
								<option value="payment">Payment</option>
							</select>
						</div>				
					</div>
					<div className="col-md-4 col-sm-offset-2">
						<button type="submit" className="btn btn-primary" ref="buttonSend">Send</button>
					</div>
					
				</form>
			 </div>			
		</div>
    );
  }
}

export default LoadAndRetireMoney;