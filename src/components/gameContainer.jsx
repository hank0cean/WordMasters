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
			gameRefID: this.props.match.params.gameRefID,
			isLoading: true,
			cardList: [],
		}
		this.gameRefID = this.props.match.params.gameRefID;
		this.getCardListByGameID(this.state.gameRefID);
	}

	componentDidMount() {
		const { gameRefID } = this.props.match.params

		this.getCardListByGameID(gameRefID);
	}

	componentDidUpdate() {
		const { gameRefID } = this.props.match.params
		
		this.getCardListByGameID(gameRefID);
	}

	async getCardListByGameID(gameRefID) {
		await GameApi.findGameByID(gameRefID).then((snapshot) => {
			let currentBoard = snapshot.val().currentBoard;
			this.setState({gameRefID: gameRefID, isLoading: false, cardList: currentBoard});
			// console.log("promise returned, loading finished; snapshot: ", snapshot);
		});
	}
 
	handleCardFlip(cardNumber) {
		console.log("cardNumber: ", cardNumber)

		// console.log("this.state: ", this.state)
		// console.log("this.gameRefID from handleCardFlip: ", this.gameRefID)

		// GameApi.findGameByID(this.state.gameRefID)
		// 	.then((snapshot) => {
		// 		snapshot.child('currentBoard').child(cardNumber).child('isFlipped').setValue(1)
		// 			.then(
		// 	 			this.setState(() => ({gameRefID: this.state.gameRefID, isLoading: false, cardList: snapshot.val().currentBoard}))
		// 			);
		// 	});
	}

	render() { 
		if (!this.state.isLoading) {
			console.log("rendering gameContainer")
			return ( 
				<div className="gameContainer">
					<GameNavbar />
					<GameBoard cardList={this.state.cardList} cardFlipHandler={this.handleCardFlip} />
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

