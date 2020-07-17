import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './../styles/navItem.css'

function NavItem(props){

  return ( 
    <li className={(props.iconLogo ? "navLogo" : "navItem")}>
      <a
        href={(props.itemLink ? props.itemLink : "javascript:void(0);")}
        className={"dropdownToggle" + (props.itemIsActive ? ' active' : '')}
        onClick={props.handleClick}>
          <span className="iconLeft">{props.iconLeft}</span>
          <span className="linkText">{props.itemText}</span>
          <span className="iconRight">{props.iconRight}</span>
          <span className="iconLogo">{props.iconLogo}</span>
      </a>
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
