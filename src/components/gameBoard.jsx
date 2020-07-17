import React, { Component } from 'react';
import Card from './card'

import './../styles/gameBoard.css'

class GameBoard extends Component {

  renderRow(id_number) {
    const id = 'row-' + id_number;

    return (
      <div className="boardRow" id={id}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    );
  }

  render() { 
    return ( 
      <div className="gameBoard">
        {this.renderRow(1)}
        {this.renderRow(2)}
        {this.renderRow(3)}
        {this.renderRow(4)}
        {this.renderRow(5)}
      </div>
    );
  }
}
 
export default GameBoard;
