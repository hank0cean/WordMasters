import React, { useState, useEffect } from 'react'

import GameBoard from './gameBoard'
import GameNavbar from './gameNavbar'

import './../styles/gameContainer.css'


function GameContainer(props) {
	const [gameRefID] = useState(props.match.params.gameRefID);
	const [username, setUsername] = useState();
	const [spymaster, setSpymaster] = useState();

	return (
		<div className="gameContainer">
			<GameNavbar gameRefID={gameRefID} setSpymaster={setSpymaster} setUsername={setUsername} />
			<GameBoard gameRefID={gameRefID} spymaster={spymaster} username={username} />
		</div>
	);
}          

export default GameContainer;

