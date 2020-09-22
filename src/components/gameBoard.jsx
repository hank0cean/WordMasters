import React, { useState, useEffect } from 'react';
import Card from './card';

import GameApi from '../api/game';
import '../styles/gameBoard.css';

function GameBoard(props) {

  const [isLoading, setIsLoading] = useState();
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    getCardListByGameID(props.gameRefID);
  })

	function getCardListByGameID(gameRefID) {
    GameApi.getCardsByGameID(gameRefID)
    .then((cardsSnapshot) => {
      const cardsObject = cardsSnapshot.val();

      if (cardsObject) {
        const cardList = Object.keys(cardsObject).map(key => (key))
        setIsLoading(false);
        setCardList(cardList);
      }
      else {
        setIsLoading(false);
        setCardList(null);
      }
    })
  }
    
  if (!isLoading) {
    console.log("render gameBoard")
    return ( 
      <div className="game">
        <div className="gameBoardGrid">
          {cardList.map(cardRefID => {
            return (
              <Card
                cardRefID={cardRefID}
                cardFlipHandler={async (cardID) => {await GameApi.flipCard(cardID)}}
                spymaster={props.spymaster}
              />
            );
          })}
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

export default GameBoard;
