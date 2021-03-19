import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { set_gameRef } from '../redux/actions/index'

import GameBoard from './../components/gameBoard'
import GameNavbar from './../components/gameNavbar'

import './../styles/gameContainer.css'

function GameContainer({match: {params: {gameRefID}}}) {

	useDispatch()(set_gameRef(gameRefID));

	// useEffect(() => {
	// 	return function logoutUsername() {

	// 	}
	// })

	return (
		<div className="gameContainer">
			<GameNavbar />
			<GameBoard />
		</div>
	);
}

export default GameContainer;
