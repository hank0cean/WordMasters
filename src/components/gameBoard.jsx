import React, { useState, useEffect } from 'react';
import Card from './card';

import GameApi from '../api/game';
import '../styles/gameBoard.css';

function GameBoard({gameRefID, spymaster}) {

  const [isLoading, setIsLoading] = useState(true);
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    if (isLoading) {
      getCardListByGameID(gameRefID);
    }
  });

	function getCardListByGameID(gameRefID) {
    GameApi.getCardsByGameID(gameRefID)
    .then((cardsObject) => {
      if (cardsObject) {
        const cardList = Object.keys(cardsObject);
        setCardList(cardList);
      }
      else {
        setCardList(null);
      }
      setIsLoading(false);
    })
  }

  if (!isLoading) {
    return ( 
      <div className="game">
        <div className="gameBoardGrid">
          {cardList.map(cardRefID => 
            <Card
              key={cardRefID}
              cardRefID={cardRefID}
              spymaster={spymaster}
            />
          )}
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
