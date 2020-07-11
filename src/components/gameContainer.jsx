import React, { Component } from 'react'
import GameBoard from './gameBoard'
import GameNavbar from './gameNavbar'

import './../styles/gameContainer.css'

class GameContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<div className="gameContainer">
				<GameNavbar />
				<GameBoard />
			</div>
		);
	}
}

export default GameContainer;
