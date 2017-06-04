import React, { Component } from 'react';
import toastr from 'toastr';
import $ from 'jquery';
import './Admin.css';

class Admin extends Component {

  constructor(props){
    super(props);

    this.state = {
      requests: [],
      status:'',
      message: ''
    };
  
    this.api = 'http://localhost:8080';
    this.userLogged = JSON.parse(sessionStorage.getItem('user'));
    this.addMessage = this.addMessage.bind(this);

    $.ajax({
      url : this.api + '/requests',
      type: 'get',
      success : data => {	 				
        if(data.requests !== null){
          this.setState({
            requests: data.requests
          });
        }
        console.log(data);
      },
      error: err =>{
        toastr.warning('Error connecting with server, try later');
      }
    });
  }

  addMessage(){
    console.log(this.refs.message.value);
  }

  handleChangeMessage(event){
    console.log(event);
  }

  acceptRequest( req, id){
    $.ajax({
      url : this.api + '/requests/admin/' + this.userLogged.id,
      type: 'POST',
      data:  'id=' + req.id + '&id_requester=' + req.id_requester + '&date=' +
       req.date.slice(0,10) + '&quantity=' + req.quantity + '&operation=' + req.operation +
       '&state=accept',
      success : data => {	 				
        if(data.status === 'saved'){
          toastr.success('The request has been updated','Request updated');
          this.setState({
            requests: this.state.requests.filter((req,index) => { return index === id ? false: true})
          });
        }
      },
      error: err =>{
        toastr.warning('Error connecting with server, try later');
        console.log(err);
      }
    });
  }

  rejectRequest(req, id){
    this.setState({
      status: 'reject'
    });
    //this.refs.buttonAccept.style.display = 'none';
    //this.refs.buttonReject.style.display = 'none';

    console.log(id);
    return id;
    /*$.ajax({
      url : this.api + '/requests/admin/' + this.userLogged.id,
      type: 'POST',
      data:  'id=' + req.id + '&id_requester=' + req.id_requester + '&date=' +
       req.date.slice(0,10) + '&quantity=' + req.quantity + '&operation=' + req.operation +
       '&state=reject' + '&message=' + this.state.message,
      success : data => {	 				
        if(data.status === 'saved'){
          toastr.success('The request has been updated','Request updated');
          this.setState({
            requests: this.state.requests.filter((req,index) => { return index === id ? false: true})
          });
        }
      },
      error: err =>{
        toastr.warning('Error connecting with server, try later');
        console.log(err);
      }
    });*/
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-3">
          <div className="panel panel-warning">
            <div className="panel-heading">
              <b>Requests of Users</b>
            </div>
              <div className="panel-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th># Request</th>
                      <th>Date</th>
                      <th>Operation</th>
                      <th>Quantity</th>
                      <th>User</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        this.state.requests.map((request,index) => {
                          return (
                            <tr key={ request.id }> 
                              <td>{ request.id }</td>
                              <td>{ request.date.slice(0,10) }</td>
                              <td>{ request.operation }</td>
                              <td>{ request.quantity }</td>
                              <td>{ request.username }</td>
                              <td><button className="btn btn-success" onClick={ () => this.acceptRequest(request,index) }>Accept</button></td>
                              <td><button className="btn btn-danger" onClick={ () => this.rejectRequest(request,index) }>Reject</button></td>
                               { 
                                 this.state.status === 'reject' && this.rejectRequest(request,index) ? (
                                    <td>
                                      <td>
                                        <div className="input-group" ref="boxMessage">
                                            <span className="input-group-addon" id="basic-addon1">Message</span>
                                            <input type="text" className="form-control" value={this.state.message} name="message" onChange={this.handleChangeMessage}/>
                                        </div> 
                                      </td>
                                      <td>
                                        <input type="button" ref="buttonSend" className="btn btn-primary" value="Send" onClick={this.addMessage} />
                                      </td>
                                    </td>
                                  ) : null
                                }
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

export default Admin;