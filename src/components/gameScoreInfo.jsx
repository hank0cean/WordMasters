import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import Firebase from '../api/firebase';
import './../styles/gameScoreInfo.css';

function GameScoreInfo() {

  const gameRefID = useSelector(state => state.gameRefID)

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
    Firebase.addListenerForRefChild('games', gameRefID, 'value', setGameScoreInfo);

    return () => {
      Firebase.removeListenerForRefChild('games', gameRefID, 'value', setGameScoreInfo)
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

//  for use of old connect() style react redux component

// const mapStateToProps = state => {
//   console.log("mSTP in gSI, state.gameRefID: ", state.gameRefID)
//   return {
//     gameRefID: state.gameRefID
//   }
// }

// export default connect(mapStateToProps, {})(GameScoreInfo);