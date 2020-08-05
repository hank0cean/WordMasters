import React, { Component } from 'react'
import { useParams } from 'react-router-dom'

import GameBoard from './gameBoard'
import GameNavbar from './gameNavbar'
//import LoadingSpinner from './loadingSpinner'
import GameApi from '../api/game'


import './../styles/gameContainer.css'


class GameContainer extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			isLoading: true,
		}
		this.gameRefID = this.props.match.params.gameRefID;
		this.getCardListByGameID(this.gameRefID);
	}

	async getCardListByGameID(gameRefID) {
		await GameApi.findGameByID(gameRefID).then((snapshot) => {
				this.cardList = snapshot.val().currentBoard;
				this.setState({isLoading: false});
				// console.log("promise returned");
				// console.log("snapshot after return: ", snapshot);
			}
		);
	}

	render() { 
		if (!this.state.isLoading) {
			// console.log("rendering gameContainer")
			return ( 
				<div className="gameContainer">
					<GameNavbar />
					<GameBoard cardList={this.cardList} />
				</div>
			);
		}
		else {
			return (
				<div className="loadingSpinner">
					loadingSpinner
				</div>
			);
		}
	}
}
 
export default GameContainer;

