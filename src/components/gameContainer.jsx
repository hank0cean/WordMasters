import React, { Component } from 'react'

import GameBoard from './gameBoard'
import GameNavbar from './gameNavbar'

import './../styles/gameContainer.css'


class GameContainer extends Component {
	constructor(props) {
		super(props);
		this.gameRefID = this.props.match.params.gameRefID;
	}

	render() { 
		return ( 
			<div className="gameContainer">
				<GameNavbar gameRefID={this.gameRefID} />
				<GameBoard gameRefID={this.gameRefID} />
			</div>
		);
	}
}
 
export default GameContainer;

