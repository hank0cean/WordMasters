import React, { Component } from 'react'
import GameBoard from './gameBoard'
import GameNavbar from './gameNavbar'

import './../styles/gameContainer.css'

class GameContainer extends Component {

	render() {
		let wordList = ['hello', 'world', 'hello', 'world', 'hello',
										'world', 'hello', 'world', 'hello', 'world',
										'hello', 'world', 'hello', 'world', 'hello',
										'world', 'hello', 'world', 'hello', 'world',
										'hello', 'world', 'hello', 'world', 'hello',];

		let cardList = [
			{word: 'blue', color: 'blue'},
			{word: 'red', color: 'red'},
			{word: 'none', color: 'none'},
			{word: 'red', color: 'red'},
			{word: 'blue', color: 'blue'},
			{word: 'black', color: 'black'},
			{word: 'none', color: 'none'},
			{word: 'blue', color: 'blue'},
			{word: 'none', color: 'none'},
			{word: 'red', color: 'red'},
			{word: 'none', color: 'none'},
			{word: 'blue', color: 'blue'},
			{word: 'black', color: 'black'},
			{word: 'blue', color: 'blue'},
			{word: 'none', color: 'none'},
			{word: 'red', color: 'red'},
			{word: 'none', color: 'none'},
			{word: 'blue', color: 'blue'},
			{word: 'none', color: 'none'},
			{word: 'red', color: 'red'},
			{word: 'blue', color: 'blue'},
			{word: 'red', color: 'red'},
			{word: 'none', color: 'none'},
			{word: 'red', color: 'red'},
			{word: 'blue', color: 'blue'},
			];

		return (
			<div className="gameContainer">
				<GameNavbar />
				<GameBoard wordList={wordList} cardList={cardList} />
			</div>
		);
	}
}

export default GameContainer;
