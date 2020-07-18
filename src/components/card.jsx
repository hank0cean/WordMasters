import React from 'react';
import { Button } from '@material-ui/core'

import './../styles/card.css'

function Card(props) {

  return ( 
    <span className="card">
      <Button variant="contained">{props.cardNumber}</Button>
      
    </span>
  );
}

export default Card;