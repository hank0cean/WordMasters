import React, { useState } from 'react';

import GameApi from '../api/game';
import './../styles/gameScoreInfo.css'

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