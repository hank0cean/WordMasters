import React, { useState } from 'react';

import GameApi from '../api/game';
import './../styles/gameScoreInfo.css'

function GameScoreInfo(props) {

  const [blueScore, setBlueScore] = useState('');
  const [redScore, setRedScore] = useState('');
  const [redTurn, setRedTurn] = useState();

  GameApi.addListenerToGame(props.gameRefID, (snapshot) => {
    setRedScore(snapshot.val().redScore);
    setBlueScore(snapshot.val().blueScore);
    setRedTurn(snapshot.val().redTurn);
  });

  GameApi.findGameByID(props.gameRefID)
    .then((snapshot) => {
      setRedScore(snapshot.val().redScore);
      setBlueScore(snapshot.val().blueScore);
      setRedTurn(snapshot.val().redTurn);
    })

  return (
    <div className="gameScoreInfo">
      <div className="scoreLabel">
        Cards Left:
      </div>
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