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
		let cardList = ['hello', 'world', 'hello', 'world', 'hello',
										'world', 'hello', 'world', 'hello', 'world',
										'hello', 'world', 'hello', 'world', 'hello',
										'world', 'hello', 'world', 'hello', 'world',
										'hello', 'world', 'hello', 'world', 'hello',];

		return (
			<div className="gameContainer">
				<GameNavbar />
				<GameBoard cardList={cardList} />
			</div>
		);
	}
}

export default GameContainer;
