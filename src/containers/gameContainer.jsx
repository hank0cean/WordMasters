import React, { useState, useEffect } from 'react'

import GameBoard from './../components/gameBoard'
import GameNavbar from './../components/gameNavbar'

import './../styles/gameContainer.css'

// Object destructuring gameRefID from props.match.params.gameRefID
function GameContainer({match: {params: {gameRefID}}}) {
	const [username, setUsername] = useState();
	const [spymaster, setSpymaster] = useState();

	useEffect(() => {
		// check if username is the same as the spymaster on the db
		// 			if username matches set spymaster to true
	}, [username])

	return (
		<div className="gameContainer">
			<GameNavbar
				gameRefID={gameRefID}
				setSpymaster={setSpymaster}
				setUsername={setUsername}
			/>
			<GameBoard
				gameRefID={gameRefID}
				spymaster={spymaster}
				username={username}
			/>
		</div>
	);
}

export default GameContainer;

