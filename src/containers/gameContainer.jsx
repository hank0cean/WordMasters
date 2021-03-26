import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { set_gameRef } from '../redux/actions/index'

import GameBoard from './../components/gameBoard'
import GameNavbar from './../components/gameNavbar'

import './../styles/gameContainer.css'

import GameApi from './../api/game'

function GameContainer({match: {params: {gameRefID}}}) {

	useDispatch()(set_gameRef(gameRefID));
	const history = useHistory();
	const storeGameRefID = useSelector((state) => state.gameRefID);
	const username = useSelector((state) => state.username);
  const spymaster = useSelector((state) => state.spymaster);

  const handleChangePlayerStatus = () => {
    console.log("setup event listeners")
    window.addEventListener('DOMContentLoaded', GameApi.changePlayerStatus(storeGameRefID, username))
    window.addEventListener('unload', GameApi.changePlayerStatus(storeGameRefID, username))
  }

	useState(() => {
		history.push(`/game/${storeGameRefID}`);
	});


	useEffect(() => {
    handleChangePlayerStatus()

    // if (username !== null) {
    //   GameApi.changePlayerStatus(storeGameRefID, username);
    // }

		// return function logout() {
    //   if (username !== null) {
    //     GameApi.changePlayerStatus(storeGameRefID, username);
    //   }
		// }
	}, [username])

	return (
		<div className="gameContainer">
			<GameNavbar />
			<GameBoard />
		</div>
	);
}

export default GameContainer;
