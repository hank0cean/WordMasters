import React from 'react';

function DecksDropdown(props) {

  return ( 
    ((props.itemOpen &&
    <div className="decksDropdown">
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed unde eius consequuntur sequi praesentium in tempore alias! Dolores doloribus accusantium incidunt, maiores molestias explicabo quos assumenda debitis perspiciatis quas voluptates?</p>
    </div>) || null)
  );
}
 
export default DecksDropdown;