import React, { useState } from 'react'

import GameBoard from './gameBoard'
import GameNavbar from './gameNavbar'

import './../styles/gameContainer.css'


function GameContainer(props) {
	const [gameRefID] = useState(props.match.params.gameRefID);

	return ( 
		<div className="gameContainer">
			<GameNavbar gameRefID={gameRefID} />
			<GameBoard gameRefID={gameRefID} />
		</div>
	);
}
 
export default GameContainer;

