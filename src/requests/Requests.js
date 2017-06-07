import React, { Component } from 'react';
import toastr from 'toastr';
import $ from 'jquery';
import './Requests.css';

class Requests extends Component {

  constructor(props){
    super(props);

    this.state = {
      requests: []
    };
  
    this.api = 'http://localhost:8080';
    let userLogged = JSON.parse(sessionStorage.getItem('user'));

    $.ajax({
      url : this.api + '/requests/user/' + userLogged.id,
      type: 'get',
      success : data => {	 				
        if(data.requests !== null){
          this.setState({
            requests: data.requests
          });
        }
      },
      error: err =>{
        toastr.warning('Error connecting with server, try later');
      }
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel panel-info">
            <div className="panel-heading">
              <b>Your requests history</b>
            </div>
              <div className="panel-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th># Request</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Operation</th>
                      <th>Quantity</th>
                      <th>Message</th>	
                    </tr>
                  </thead>
                  <tbody>
                      {
                        this.state.requests.map((request,index) => {
                          return (<tr key={ request.id }> 
                            <td>{request.id}</td>
                            <td>{request.date.slice(0,10)}</td>
                            <td>{request.status}</td>
                            <td>{request.operation}</td>
                            <td>{request.quantity}</td>
                            <td>{request.message}</td> 
                            </tr>
                          )
                        })
                      }
                  </tbody>
                </table>
              </div>
          </div>		
        </div>
      </div>	
    );
  }
}

export default Requests;