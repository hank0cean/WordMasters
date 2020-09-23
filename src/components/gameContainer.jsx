import React from 'react'

import GameBoard from './gameBoard'
import GameNavbar from './gameNavbar'

import './../styles/gameContainer.css'

// Access match directly using object destructing
//
// Optionally you could access gameRefID directly like so
//
// ex)
// function GameContainer({match: {params: {gameRefId}}}){
// 	return ( 
// 		<div className="gameContainer">
// 			<GameNavbar gameRefID={gameRefID} />
// 			<GameBoard gameRefID={gameRefIDeRefID} />
// 		</div>
// 	);
// }
function GameContainer({match}) {
	// Since gameRefID is provided on the match.params object as a passed down property and doesn't
	// update via a useState function, you don't need to use a useState hook 
	// const [gameRefID] = useState(props.match.params.gameRefID);
	return ( 
		<div className="gameContainer">
			<GameNavbar gameRefID={match.params.gameRefID} />
			<GameBoard gameRefID={match.params.gameRefID} />
		</div>
	);
}
 
export default GameContainer;

