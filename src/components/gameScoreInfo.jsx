import React, { useState } from 'react';

import GameApi from '../api/game';
import './../styles/gameScoreInfo.css'

/**
 * 
 * Look at the comments in './gameBoard.jsx' for managing state
 * and removing access fetches for getting the gameObj from firebase
 */

function GameScoreInfo(props) {

  const [blueScore, setBlueScore] = useState('');
  const [redScore, setRedScore] = useState('');
  const [redTurn, setRedTurn] = useState();

  GameApi.addListenerForRefChild('games', props.gameRefID, 'child_changed', (snapshot) => {
    const gameObj = snapshot.val();
    setRedScore(gameObj.redScore);
    setBlueScore(gameObj.blueScore);
    setRedTurn(gameObj.redTurn);
  });

  GameApi.findGameByID(props.gameRefID)
    .then((gameObj) => {
      setRedScore(gameObj.redScore);
      setBlueScore(gameObj.blueScore);
      setRedTurn(gameObj.redTurn);
    })

  return (
    <div className="gameScoreInfo">
      <div className="scoreLabel">
        Cards Left:
      </div>
      {/* Use template strings for string concatenation
          Template strings are wrapped in back-ticks (`) and allow variable access with the following syntax ${}
        ex)
        className={`redScore ${redTurn ? "highlight": ""}`}

        This evaluates the expression within the brackets and concatenate the result to the rest of the string

      */}
      <div className={"redScore " + (redTurn ? "highlight" : "")}>
        {(redScore ? redScore : 0)}
      </div>
      -
      <div className={"blueScore " + (!redTurn ? "highlight" : "")}>
        {(blueScore ? blueScore : 0)}
      </div>
    </div>
  );
}

export default GameScoreInfo;