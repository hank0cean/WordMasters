import React, { Component } from 'react';
import Card from './card';

import GameApi from '../api/game';
import '../styles/gameBoard.css';

class GameBoard extends Component {
  constructor(props){
    super(props);
		this.state = { 
			isLoading: true,
			cardList: [],
    }
    this.getCardListByGameID.bind(this)
  }

  componentDidMount() {
    this.setState({isLoading: true, cardList: []});
  
    this.getCardListByGameID(this.props.gameRefID);
  }

  componentDidUpdate(prevProps) {
    if (this.props.gameRefID !== prevProps.gameRefID) {
      this.getCardListByGameID(this.props.gameRefID);
    }
  }


	getCardListByGameID(gameRefID) {
    GameApi.getCardsByGameID(gameRefID)
    .then((cardsSnapshot) => {
      const cardsObject = cardsSnapshot.val();
      // console.log("cardObject at Mount: ", cardsObject)

      if (cardsObject) {
        // console.log("Object.keys(cardsObject) at Mount: ", Object.keys(cardsObject))
        const cardList = Object.keys(cardsObject).map(key => (key))
        this.setState({isLoading: false, cardList: cardList});
      }
      else {
        this.setState({isLoading: false, cardList: null});
      }
    })
	}

  render() { 
    const { cardList } = this.state;

    if (!this.state.isLoading) {
      console.log("render gameBoard")
      return ( 
        <div className="gameBoardGrid">
          {cardList.map(cardRefID => {
            return (
              <Card
                cardRefID={cardRefID}
                cardFlipHandler={async (cardID) => {await GameApi.flipCard(cardID)}}
              />
            );
          })}
        </div>
      );
    }
    else {
      return (
        <>
        </>
      )
    }
  }
}

export default GameBoard;
