import React, { Component } from 'react'
import Board from './Board'

import './../styles/GameContainer.css'

class GameContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div id="GameContainer">
        <h1>GAME CONTAINER</h1>
        <Board />
      </div>
    )
  }
}

export default GameContainer
