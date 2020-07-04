import React, { Component } from 'react';
import { Button } from '@material-ui/core'

import './../styles/card.css'

class Card extends Component {

  render() { 
    return ( 
      <span className="card">
        <Button variant="contained">card button</Button>
      </span>
    );
  }
}

export default Card;