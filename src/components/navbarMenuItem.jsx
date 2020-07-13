import React, { Component } from 'react';

class NavbarMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() { 
    return ( 
      <li className="navbarItem">
        <a href="#" className={this.props.className}>
          {this.props.children}
        </a>
      </li>
    );
  }
}
 
export default NavbarMenuItem;
