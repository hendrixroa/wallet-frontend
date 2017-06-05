import React, { Component } from 'react';
import './Header.css';
import toastr from 'toastr';
class Header extends Component {

  logout(){
    sessionStorage.removeItem('user');
    toastr.info('You are logout!');
    window.location.href = '/#/';
  }

  render() {
    return (
      <header className="Header">
        {
          sessionStorage.getItem('user') !== null && JSON.parse(sessionStorage.getItem('user')).is_admin === 0 ? (
            <a href="/#/dashboard"><button className="btn btn-info btn-home">Home</button></a>
          ) : null
        }
        <h2>Wellcome to E-wallet System </h2>   
         {
           sessionStorage.getItem('user') !== null ? (<button className="btn btn-danger btn-logout" onClick={this.logout}>Logout</button>) : null
         }  
      </header>
    );
  }
}

export default Header;