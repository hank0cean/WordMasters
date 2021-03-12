import React, { useState } from 'react';

import {connect} from 'react-redux';

import GameApi from '../api/game';
import './../styles/gameScoreInfo.css'
import { useEffect } from 'react';

function GameScoreInfo({gameRefID}) {

  console.log("gameRef: ", gameRefID);

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
    GameApi.addListenerForRefChild('games', gameRefID, 'value', setGameScoreInfo);

    return () => {
      GameApi.removeListenerForRefChild('games', gameRefID, 'value', setGameScoreInfo)
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

const mapStateToProps = state => {
  console.log("mSTP in gSI, state.gameRefID: ", state.gameRefID)
  return {
    gameRefID: state.gameRefID
  }
}

export default connect(mapStateToProps, {})(GameScoreInfo);