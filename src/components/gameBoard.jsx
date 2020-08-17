import React, { Component } from 'react';
import Card from './card'

import './../styles/gameBoard.css'

class GameBoard extends Component {
  constructor(props){
    super(props);
    console.log("gameboard constructor props.cardList: ", props.cardList)
  }

  render() { 
    let i = 1;

    return ( 
      <div className="gameBoardGrid">
        {this.props.cardList.map(card => {
          return <Card card={card} cardFlipHandler={this.props.cardFlipHandler} cardNumber={i++} />
        })}
      </div>
    );
  }
}

export default GameBoard;
