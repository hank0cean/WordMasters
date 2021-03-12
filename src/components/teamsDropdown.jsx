import React, { useState, useEffect } from 'react';
import { Box, Button } from '@material-ui/core';
import InputPopup from './inputPopup';
import JoinTeamInput from './joinTeamInput';

import {connect} from 'react-redux';
import {login} from '../redux/actions';

import './../styles/teamsDropdown.css'
import GameApi from '../api/game';

function teamListBox(gameRefID, teamName, playerList) {
  
  console.log("playerList: ", playerList)

  return (
    <div className="teamListBox">
      <h4 className="teamNameHeader">{teamName + " Team"}</h4>
      {(playerList ?  playerList.map(({key, name}) => (
        <div key={key}>{name}</div>
      )) : <p>No Players</p>)}
      <div className="stickBottom">
        {(teamName === 'Blue' ? 
          <Box ml="0.5rem" my="1rem">
            <InputPopup buttonText="Join Blue" buttonColor="primary">
              <JoinTeamInput teamName="blue" gameRefID={gameRefID} />
            </InputPopup>
          </Box>
        : <Box my="1rem">
            <InputPopup buttonText="Join Red" buttonColor="secondary">
              <JoinTeamInput teamName="red" gameRefID={gameRefID} />
            </InputPopup>
          </Box>
        )}
      </div>
    </div>
  );
}

function TeamsDropdown({gameRefID, username}) {

  const [gameObj, setGameObj] = useState({
    blueTeam: [],
    redTeam: [],
    redTurn: false,
  });

  useEffect(() => {
    GameApi.addListenerForRefChild('games', gameRefID, 'value', (gameData) => {
      if (gameData !== gameObj) {
        setGameObj({
          blueTeam: gameData.blueTeam,
          redTeam: gameData.redTeam,
          redTurn: gameData.redTurn,
        });
      }
    });

    return () => GameApi.removeListenerForRefChild('games', gameRefID, 'value')
  }, []);

  return (
    <div className="teamsDropdown">
      <div className="teamsInfo">
        {teamListBox(gameRefID, "Red", gameObj.redTeam)}
        <div className="verticalDivider" />
        {teamListBox(gameRefID, "Blue", gameObj.blueTeam)}
      </div>
      <div className="horizontalDivider" />
      <Box mt="1rem">
        <Button variant="contained">Randomize Teams</Button>
      </Box>
      <Box mt="1rem">
        <Button variant="contained">Invite Link</Button>
      </Box>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    gameRefID: state.gameRefID,
    username: state.username
  }
}

export default connect(mapStateToProps, {login})(TeamsDropdown);