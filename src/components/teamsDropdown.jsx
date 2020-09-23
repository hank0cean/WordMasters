import React, { useState } from 'react';
import { Box, Button } from '@material-ui/core';

import './../styles/teamsDropdown.css'
import GameApi from '../api/game';

function teamListBox(teamName, playerList) {

  return (
    <div className="teamListBox">
      <p>{teamName} Team</p>
      <p>--------</p>
      {/* 
        Instead of checking if playerList is a truthy value check if it's a non-empty array 

        This is a utility function I use frequently

        function isNonemptyArray(arr){
          return Array.isArray(arr) && arr.length > 0
        }

        Additionally add a unique key prop to each child
      */}
      {(playerList ?  playerList.map((player) => (
        <p>{player}</p>
      )) : <p>No Players</p>)}
      {(teamName === 'Blue' ? 
        <Box ml="0.5rem" my="1rem">
          <Button variant="contained" color="primary">Join Blue</Button>
        </Box>
      : <Box my="1rem">
          <Button variant="contained" color="secondary">Join Red</Button>
        </Box>
      )}
    </div>
  );
}

/**
 * 
 * Look at the comments in './gameBoard.jsx' for managing state
 * and removing access fetches for getting the gameObj from firebase
 */

function TeamsDropdown(props) {

  const [redTeam, setRedTeam] = useState();
  const [blueTeam, setBlueTeam] = useState();
  const [redTurn, setRedTurn] = useState();

  GameApi.addListenerForRefChild('games', props.gameRefID, 'child_changed', (snapshot) => {
    const gameObj = snapshot.val();
    setRedTeam(gameObj.redTeam);
    setBlueTeam(gameObj.blueTeam);
    setRedTurn(gameObj.redTurn);
  });

  GameApi.findGameByID(props.gameRefID)
    .then((gameObj) => {
      setRedTeam(gameObj.redTeam);
      setBlueTeam(gameObj.blueTeam);
      setRedTurn(gameObj.redTurn);
    });

  return (
    <div className="teamsDropdown">
      <div className="teamsInfo">
        {teamListBox("Red", redTeam)}
        <div className="verticalDivider" />
        {teamListBox("Blue", blueTeam)}
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
 
export default TeamsDropdown;