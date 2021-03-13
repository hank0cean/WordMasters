import React from 'react'

import { useDispatch } from 'react-redux'
import { set_gameRef } from '../redux/actions/index'

import GameBoard from './../components/gameBoard'
import GameNavbar from './../components/gameNavbar'

import './../styles/gameContainer.css'

// Object destructuring gameRefID from props.match.params.gameRefID
function GameContainer({match: {params: {gameRefID}}}) {

	useDispatch()(set_gameRef(gameRefID));

	return (
		<div className="gameContainer">
			<GameNavbar />
			<GameBoard />
		</div>
	);
}

export default GameContainer;
