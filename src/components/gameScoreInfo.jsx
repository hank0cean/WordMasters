import React, { useState } from 'react';

import GameApi from '../api/game';
import './../styles/gameScoreInfo.css'
import { useEffect } from 'react';

function GameScoreInfo(props) {

  const [gameInfo, setGameInfo] = useState({
    blueScore: '',
    redScore: '',
    redTurn: false,
  })

  function setGameScoreInfo(gameObj) {
    if (gameObj.blueScore !== gameInfo.blueScore || gameObj.redScore !== gameInfo.redScore || gameObj.redTurn !== gameInfo.redTurn) {
      setGameInfo({
        blueScore: gameObj.blueScore,
        redScore: gameObj.redScore,
        redTurn: gameObj.redTurn,
      })
    }
  }

  useEffect(() => {
    GameApi.addListenerForRefChild('games', props.gameRefID, 'value', setGameScoreInfo);

    return () => {
      GameApi.removeListenerForRefChild('games', props.gameRefID, 'value', setGameScoreInfo)
    };
  }, []);

  return (
    <div className="gameScoreInfo">
      <div className={"redScore " + (gameInfo.redTurn ? "highlight" : "")}>
        {(gameInfo.redScore ? gameInfo.redScore : 0)}
      </div>
      -
      <div className={"blueScore " + (!gameInfo.redTurn ? "highlight" : "")}>
        {(gameInfo.blueScore ? gameInfo.blueScore : 0)}
      </div>
    </div>
  );
}

export default GameScoreInfo;