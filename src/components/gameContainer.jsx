import React, { Component } from 'react'
import Board from './board'

import './../styles/gameContainer.css'

class GameContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<div id="gameContainer">
				<h1>GAME CONTAINER</h1>
				<Board />
			</div>
		);
	}
}

export default GameContainer;
