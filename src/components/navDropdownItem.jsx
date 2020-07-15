import React from 'react';

import './../styles/gameNavbar.css'

function NavDropdownItem(props){

  return ( 
      <li className="navItem">
        <a href="javascript:void(0);" className={"dropdownToggle" + (props.itemIsActive ? ' active' : '')}
          onClick={props.handleClick}>
            {props.itemImage}
            <span className="linkText">
              {props.itemText}
            </span>
        </a>
        <div className={"dropdownContainer" + (props.itemIsActive ? ' active' : '')}>
          {props.children}
        </div>
      </li>
  );
}
 
export default NavDropdownItem;
