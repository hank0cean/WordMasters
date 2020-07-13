import React, { Component } from 'react';

import './../styles/gameNavbar.css'

class NavbarDropdownItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() { 
    return ( 
      <li className="navbarItem">
        <a href="#" className="navbarLink">
          {this.props.itemImage}
          <span className="linkText">
            {this.props.itemText}
          </span>
        </a>
        <div>
          {this.props.dropdownInfo}
        </div>
      </li>
    );
  }
}
 
export default NavbarDropdownItem;
