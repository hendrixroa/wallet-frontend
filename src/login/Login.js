import React, { Component } from 'react';
import toastr from 'toastr';
import $ from 'jquery';
import './Login.css';
import { Form, FormControl, FormGroup, Col, Button } from 'react-bootstrap';

class Login extends Component {

	constructor(props){
		super(props);

		this.state = {
			username: '',
			password: ''
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
		let values = document.querySelectorAll('[name=password],[name=username]');
		
		$.ajax({
			url : this.api + '/login',
			type: 'post',
			data: 'username=' + values[0].value + '&password=' + values[1].value,
			success : data => {	 
				if(data.user !== '' && data.user.is_admin === 0){
					toastr.success('¡You are Logged!', 'Login Successfully');
					sessionStorage.setItem('user', JSON.stringify(data.user));
					window.location.href = '/#/dashboard';
				}else if(data.user !== '' && data.user.is_admin === 1){
					toastr.success('¡You are Logged!', 'Login Successfully');
					sessionStorage.setItem('user', JSON.stringify(data.user));
					window.location.href = '/#/admin';
				}else{
					toastr.error('The username or password are invalids', 'Wrong data');
				}
			},
			error: err =>{
				toastr.warning('Error connecting with server, try later');
			}
		});
	}

  render() {
    return (
		<Form horizontal onSubmit={this.handleSubmit}>
			<FormGroup controlId="formHorizontalUsername">
				<Col sm={1} smOffset={4}>
					Username
				</Col>
				<Col sm={2} >
					<FormControl type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.handleOnChange} />
				</Col>
			</FormGroup>
			<FormGroup controlId="formHorizontalPassword">
				<Col sm={1} smOffset={4}>
					Password
				</Col>
				<Col sm={2}>
					<FormControl type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleOnChange} />
				</Col>
			</FormGroup>
			<FormGroup>
				<Col smOffset={5} sm={2}>
					<Button type="submit">
						Login
					</Button>
				</Col>
			</FormGroup>
		</Form>
    );
  }
}

export default Login;