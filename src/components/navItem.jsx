import React from 'react';

import './../styles/navItem.css'

function NavItem(props) {

  return ( 
    <li className={(props.iconLogo ? "navLogo" : (props.iconRight ? "staticItem" : "navItem"))}>
      <div
        className={(props.iconRight ? 'staticIcon' : ("dropdownToggle" + (props.itemIsActive ? ' active' : '')))}
        onClick={props.handleClick}>
          <div className="iconLeft">{props.iconLeft}</div>
          <div className="itemText">{props.itemText}</div>
          <div className="iconRight">{props.iconRight}</div>
          <div className="iconLogo">{props.iconLogo}</div>
      </div>
      {props.itemIsActive ? 
        <div className={"dropdownContainer" + (props.itemIsActive ? ' active' : '')}>
          {props.children}
        </div>
        :
        <div></div>
      }
    </li>
  );
}

export default NavItem;
