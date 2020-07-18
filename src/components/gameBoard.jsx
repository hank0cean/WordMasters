import React, { Component } from 'react';
import Card from './card'

import './../styles/gameBoard.css'

class GameBoard extends Component {

  render() { 
    let i = 1;
    return ( 
      <div className="gameBoardGrid">
        {this.props.cardList.map(card => {
          return <Card cardData={card} cardNumber={i++} />
        })}
        
      </div>

    );
  }
}
 
export default GameBoard;
