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
      message: '',
      itemSelected: -1
    };
  
    this.api = 'http://localhost:8080';
    this.userLogged = JSON.parse(sessionStorage.getItem('user'));
    this.handleChangeMessage = this.handleChangeMessage.bind(this);

    this.loadRequests();
  }

  loadRequests(){
    $.ajax({
      url : this.api + '/requests',
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

  addMessage(req, id){
    if(this.state.message === ''){
      document.getElementById('buttonSend'+this.state.itemSelected).disabled= true;
      toastr.error('The message is required!','Message required');
    }else{
      document.getElementById('buttonSend'+this.state.itemSelected).disabled= false;
      document.getElementById('boxMessage'+this.state.itemSelected).style.display = 'none';
      //send a message
      $.ajax({
      url : this.api + '/requests/admin/' + this.userLogged.id,
      type: 'POST',
      data:  'id=' + req.id + '&id_requester=' + req.id_requester + '&date=' +
       req.date.slice(0,10) + '&quantity=' + req.quantity + '&operation=' + req.operation +
       '&state=rejected&message=' + this.state.message,
      success : data => {	 				
        if(data.request === 'rejected'){
          toastr.info('The request has been rejected');
          this.setState({
            requests: this.state.requests.filter((req,index) => { return index === id ? false: true}),
            itemSelected: -1,
            status:'',
            message: ''
          });
        }
      },
      error: err =>{
        toastr.warning('Error connecting with server, try later');
        console.log(err);
      }
      });
    }  
  }

  handleChangeMessage(event, id){
    this.setState({
      message: event.target.value
    });
    if(event.target.value === ''){
      document.getElementById('buttonSend'+this.state.itemSelected).disabled= true;
      toastr.error('The message is required!','Message required');
    }else{
      document.getElementById('buttonSend'+this.state.itemSelected).disabled= false;
    }   
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

  rejectRequest(id){
    this.setState({
      status: 'reject',
      itemSelected: id,
    }); 
    document.getElementById('buttonReject'+id).style.display = 'none';
    document.getElementById('buttonAccept'+id).style.display = 'none';
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
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
                              <td><button className="btn btn-success" id={ 'buttonAccept' + index } onClick={ () => this.acceptRequest(request, index) }>Accept</button></td>
                              <td><button className="btn btn-danger" id={ 'buttonReject' + index } onClick={ () => this.rejectRequest(index) }>Reject</button></td>
                               { 
                                 this.state.status === 'reject' && this.state.itemSelected === index ? (
                                    <td>                          
                                        <div className="input-group" id={'boxMessage' + index}>
                                            <span className="input-group-addon" id="basic-addon1">Message</span>
                                            <input type="text" className="form-control" value={this.state.message} name="message" onChange={this.handleChangeMessage}/>
                                        </div><br/>
                                        <button id={ 'buttonSend' + index } className="btn btn-primary" onClick={ () => this.addMessage(request, index) } >Send</button>             
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