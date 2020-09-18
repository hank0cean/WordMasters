import React, { Component } from 'react';
import Card from './card';
import { Button } from '@material-ui/core';

import GameApi from '../api/game';
import '../styles/gameBoard.css';

class GameBoard extends Component {
  constructor(props){
    super(props);
		this.state = { 
			isLoading: true,
      cardList: [],
      spymaster: false,
    }
    this.getCardListByGameID.bind(this);
    this.becomeSpymaster.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true, cardList: []});
    this.getCardListByGameID(this.props.gameRefID);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      if (prevState.spymaster) {
        this.setState({spymaster: true});
      }
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
  
  async becomeSpymaster(gameRefID) {

    const gameObj = await GameApi.findGameByID(gameRefID);

    if (!gameObj.spymaster1) {
      GameApi.addSpymaster(gameRefID);
      this.setState({spymaster: true});
      console.log("set spymaster1 to true")
    }
    else if (!gameObj.spymaster2) {
      GameApi.addSpymaster(gameRefID, true);
      this.setState({spymaster: true});
      console.log("set spymaster2 to true")
    }
    else {
      console.log("too many spymasters")
    }
  }

  render() { 
    const { cardList } = this.state;

    if (!this.state.isLoading) {
      console.log("render gameBoard")
      return ( 
        <div className="game">
          <div className="gameBoardGrid">
            {cardList.map(cardRefID => {
              return (
                <Card
                  cardRefID={cardRefID}
                  cardFlipHandler={async (cardID) => {await GameApi.flipCard(cardID)}}
                  spymaster={this.state.spymaster}
                />
              );
            })}
          </div>
          <div className="bottomBar">
            <Button type="submit" variant="contained" onClick={() => this.becomeSpymaster(this.props.gameRefID)} >
              Become Spymaster
            </Button>
          </div>
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
