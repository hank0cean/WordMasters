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
      /**
       * This conditional looks redundant because if prevState.spymaster is true
       * you're setting this.state.spymaster to true.
       * 
       * Is there an instance where prevState.spymaster is true and this.state.spymaster is false?
       * If so you should include checking this.state.spymaster to ensure it's false so you can prevent 
       * an unnecessary rerender
       */
      if (prevState.spymaster) {
        this.setState({spymaster: true});
      }

      /**
       * Possibly add a conditional here to see if gameRefID changed or if cardList is empty
       * to avoid making an unnecessary fetch. This function should already have been invoked in 
       * the componentDidMount function.
       */
      this.getCardListByGameID(this.props.gameRefID);
    }
  }

	getCardListByGameID(gameRefID) {
    GameApi.getCardsByGameID(gameRefID)
    .then((cardsSnapshot) => {
      const cardsObject = cardsSnapshot.val();
      /** 
       *  const isLoading = false;
      */

      // console.log("cardObject at Mount: ", cardsObject)

      if (cardsObject) {
        // console.log("Object.keys(cardsObject) at Mount: ", Object.keys(cardsObject))
        
        /**
         * Calling the map function on an array and returning the same value is unnecessary 
         * 
         * Using just:
         * 
         * const cardList = Object.keys(cardsObject)
         * 
         * Will return the same list
         */
        const cardList = Object.keys(cardsObject).map(key => (key))

        /**
         * If an objects key is the same name a variable you can simply assignment by just 
         * using the variable
         * 
         * ex)
         * this.setState({isLoading: false, cardList})
         * 
         * You can simplify this further by creating an isLoading const that set to false above this
         * conditional (see comment above), to that you're setState now becomes:
         * 
         * this.setState({isLoading, cardList})
         */
        this.setState({isLoading: false, cardList: cardList});
      }
      else {
        /**
         * Avoid changing arrays to null unless you're specifically checking it's value 
         * prior to accessing it throughout your code.
         * 
         * Setting it to null will cause an error in your render function because you are calling
         * cardList.map
         * 
         * In this instance I would set cardList to an empty array.
         * 
         * This conditional is also an indication that an error occurred, it would be useful to include some 
         * sort of flag in you're state recognize these cases to display an error message to the user
         * or provide fallback logic to resolve the issue
         */
        this.setState({isLoading: false, cardList: null});
      }
    })
  }
  
  async becomeSpymaster(gameRefID) {

    const gameObj = await GameApi.findGameByID(gameRefID);

    /**
     * How do you identify which team the spymaster belongs to prior to calling 
     * GameApi.addSpymaster?
     * 
     * It seems as if the first person to click the button is automatically assigned the 
     * spymaster role for the current turn regardless of their team.
     * 
     * Is their any validation step to ensure that both spymasters aren't on the same team?
     */
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
              /**
               * When rendering lists in React via iteration (ie Array.map) you should include a 
               * key prop on each child that is a unique value. This allows React to optimize it's updates
               * via their internal virtual dom.
               * 
               * It doesn't look like cardFlipHandler is being used in the Card component and can be removed
               * 
               * Additionally arrow functions automatically return the value if brackets aren't used so
               * you can remove the braces and the return statement and just include the Card component.
               * 
               * ex)
               * 
               * {cardList.map(cardRefID => <Card key={cardRefID} cardRefID={cardRefID} .../>)}
               */
              return (
                <Card
                  // key={cardRefID}
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
