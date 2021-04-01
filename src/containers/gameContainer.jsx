import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { set_gameRef, set_spymaster } from '../redux/actions/index'

import GameBoard from './../components/gameBoard'
import GameNavbar from './../components/gameNavbar'

import './../styles/gameContainer.css'

import GameApi from './../api/game'

function GameContainer({match: {params: {gameRefID}}}) {

  let dispatch = useDispatch();
	dispatch(set_gameRef(gameRefID));
	const history = useHistory();
	const storeGameRefID = useSelector((state) => state.gameRefID);
	const username = useSelector((state) => state.username);
  const spymaster = useSelector((state) => state.spymaster);

  const handleChangePlayerStatus = () => {
    console.log("setup event listeners")
    // window.addEventListener('DOMContentLoaded', GameApi.changePlayerStatus(storeGameRefID, username))
    window.addEventListener('unload', GameApi.changePlayerStatus(storeGameRefID, username))
  }

	useEffect(() => {
		history.push(`/game/${storeGameRefID}`);
	}, [storeGameRefID]);

	useEffect(() => {
    if (username !== null) {
      GameApi.findGameByID(storeGameRefID).then(({spymasterRed, spymasterBlue}) => {
        if (spymasterRed === username) dispatch(set_spymaster(true));
        if (spymasterBlue === username) dispatch(set_spymaster(true));
      });
      GameApi.changePlayerStatus(storeGameRefID, username);
    }
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
