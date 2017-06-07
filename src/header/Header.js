import React, { Component } from 'react';
import './Header.css';
import toastr from 'toastr';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
class Header extends Component {

  logout(){
    sessionStorage.removeItem('user');
    toastr.info('You are logout!');
    window.location.href = '/#/';
  }

  render() {
    return (
        <Navbar>
          <Navbar.Header>
            {
              sessionStorage.getItem('user') !== null && JSON.parse(sessionStorage.getItem('user')).is_admin === 0 ? (
                  <Navbar.Brand>
                  <a href="/#/dashboard">Home</a>
                  </Navbar.Brand>
              ) : null
            }
          <Navbar.Toggle />
          <Navbar.Text>
             <span>Hi <b>{ sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).username : 'Visitant' }</b> to e-Wallet</span>
          </Navbar.Text>
          </Navbar.Header>
          <Navbar.Collapse>         
            {
              sessionStorage.getItem('user') !== null ? (<Nav pullRight><NavItem onClick={this.logout}>Logout</NavItem></Nav>) : null
            }
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default Header;