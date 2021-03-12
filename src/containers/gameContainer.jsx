import React from 'react'

import {connect} from 'react-redux'
import {set_gameRef} from '../redux/actions/index'

import GameBoard from './../components/gameBoard'
import GameNavbar from './../components/gameNavbar'

import './../styles/gameContainer.css'

// Object destructuring gameRefID from props.match.params.gameRefID
function GameContainer({gameRefID, set_gameRef}) {

	// console.log("gameRef: ", gameRefID)
	set_gameRef(gameRefID);

	return (
		<div className="gameContainer">
			<GameNavbar />
			<GameBoard />
		</div>
	);
}

const mapStateToProps = (state, ownProps) => {
	console.log("params.gameRef: ", ownProps.match.params.gameRefID)
	return {gameRefID: ownProps.match.params.gameRefID}
}

export default connect(
	mapStateToProps,
	{set_gameRef}
)(GameContainer);

