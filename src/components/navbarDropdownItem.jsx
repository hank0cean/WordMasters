import React from 'react';

import './../styles/gameNavbar.css'

function NavbarDropdownItem(props){

  // const [open, setOpen] = useState(false);

  // <... onClick={() => setOpen(!open)}>

  return ( 
      <li className="navbarItem">
        <a href="#" className="dropdownToggle" onClick={props.handleClick}>
          {props.itemImage}
          <span className="linkText">
            {props.itemText}
          </span>
        </a>
        <div className="dropdownContainer">
          {props.children}
        </div>
      </li>
  );
}
 
export default NavbarDropdownItem;
