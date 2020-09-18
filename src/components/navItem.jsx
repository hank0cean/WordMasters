import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './../styles/navItem.css'

function NavItem(props){

  return ( 
    <li className={(props.iconLogo ? "navLogo" : "navItem")}>
      <div
        className={"dropdownToggle" + (props.itemIsActive ? ' active' : '')}
        onClick={props.handleClick}>
          <div className="iconLeft">{props.iconLeft}</div>
          <div className="itemText">{props.itemText}</div>
          <div className="iconRight">{props.iconRight}</div>
          <div className="iconLogo">{props.iconLogo}</div>
      </div>
      <CSSTransition
        in={props.itemIsActive}
        unmountOnExit
        timeout={500}
        classNames="navbar-dropdown"
      >
        <div className="dropdownContainer">
          {props.children}
        </div>
      </CSSTransition>
    </li>
  );
}

export default NavItem;
