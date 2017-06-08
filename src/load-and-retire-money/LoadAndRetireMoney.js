import React, { Component } from 'react';
import toastr from 'toastr';
import $ from 'jquery';
import { Form, FormControl, FormGroup, Col} from 'react-bootstrap';
import './LoadAndRetireMoney.css';
import Amount from '../amount/Amount';
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

		if(this.state.quantity === ''){
			toastr.error('The Quantity is empty', 'Wrong data');
			return;
		}
		
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
		<div>	
			<Col>
				<Amount ref='amount'/>
			</Col>
			<Col sm={5} smOffset={3}>
				<h3>Load or retire your money fast!</h3>
			</Col>
			<Form horizontal onSubmit={this.handleSubmit}>
				<FormGroup controlId="formHorizontalUsername">
					<Col sm={1} smOffset={4}>
						Quantity
					</Col>
					<Col sm={2} >
						<FormControl type="number" placeholder="Quantity" name="quantity" value={this.state.quantity} onChange={this.handleOnChange} />
					</Col>	
				</FormGroup>
				<FormGroup controlId="formControlsSelect">
					  <Col sm={1} smOffset={4}>
						Select the operation
					  </Col>
					  <Col sm={2}>	
						<FormControl componentClass="select" placeholder="Operation" value={this.state.operation} onChange={this.handleOnChange}>
							<option value="retirement">Retirement</option>
							<option value="payment">Payment</option>
						</FormControl>
					  </Col>
					</FormGroup>
				<FormGroup>
					<Col smOffset={5} sm={2}>
						<button className="btn btn-primary" ref='buttonSend' type="submit">Send</button>
					</Col>
				</FormGroup>
			</Form>
		</div>
    );
  }
}

export default LoadAndRetireMoney;