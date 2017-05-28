import React, { Component } from 'react';
import $ from 'jquery';
import './Login.css';

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
		console.log(values);
		
		$.ajax({
			url : this.api + '/login',
			type: 'post',
			data: 'username=' + values[0].value + '&password=' + values[1].value,
			success : data => {
				console.log(data);
			},
			error: err =>{
				console.log(err);
			}
		});
	}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username
        </label>
				<input type="text" name="username" value={this.state.username} onChange={this.handleOnChange} /><br/>
				<label>
					Password
				</label>
				<input type="password" name="password" value={this.state.password} onChange={this.handleOnChange} /><br/>
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export default Login;