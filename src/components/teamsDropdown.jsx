import React, { useState, useEffect } from 'react';
import { Box, Button } from '@material-ui/core';

import InputPopup from './inputPopup';
import JoinTeamInput from './joinTeamInput';
import BecomeTeamSpymaster from './becomeTeamSpymaster';
import NewGame from './newGame';

import { useSelector } from 'react-redux';

import './../styles/teamsDropdown.css'
import Firebase from '../api/firebase';

function playerItem({key, username, logged, spymaster}) {
  return (
    <div key={key} className={(logged ? "playerItem logged" : "playerItem")}>
      {username}
      {(!spymaster ? 
        <></> : <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="svg-inline--fa fa-eye fa-w-18 fa-lg"><path fill="currentColor" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" className=""></path></svg>)}
    </div>
  )
}

// function teamControlsBox(teamName, loggedUser) {

// }

function TeamBox({teamName, playerList, username, children}) {

  console.log("playerList: ", playerList)
  const showUsersTeamsControls = (children) => {
    if (username === null || !playerList) {return children}
    else {
      for (let i = 0; i < playerList.length; i++) {
        // if no user is logged  OR  user is in teams playerList: show controls
        if (playerList[i].username === username) {
          console.log("player name in list");
          return children;
        }
      }
    }
  }

  return (
    <div className="teamListBox">
      <h4 className="teamNameHeader">{teamName + " Team"}</h4>
      {(playerList ? playerList.map((player) => playerItem(player)) : <p>No Players</p>)}
      <div className="stickBottom">
        {showUsersTeamsControls(children)}
      </div>
    </div>
  );
}

function TeamControls({teamName, username, spymaster}) {
  
  if (!username) {
    // login
    return (
      <div className={teamName + "Controls"}>
        <InputPopup buttonText={`Join ${teamName}`} buttonColor={(teamName === 'blue' ? "primary" : "secondary")}>
          <JoinTeamInput teamName={teamName} />
        </InputPopup>
      </div>
    );
  }
  // user is logged in and there is no spymaster: show BecomeSpymaster controls 
  else if (username && !spymaster)
    return (
      <BecomeTeamSpymaster teamName={teamName} username={username} />
    );
  else if (username === spymaster) {
    return (<></>);
  }
  // user is logged in and spymaster claimed: show no controls       OR add special spymaster actions
  else return (<></>);
  
  /* 
  // user is spymaster: show special spymaster actions
  else if (username === spymaster) return (<></>) 
  */
}

function TeamsDropdown() {

  const gameRefID = useSelector(state => state.gameRefID);
  const username = useSelector(state => state.username);
  const inviteLink = () => {
    const copy = require('clipboard-copy');
    copy("https://truethought-1b13a.web.app/game/" + gameRefID);
  };

  const [gameObj, setGameObj] = useState({
    blueTeam: [],
    redTeam: [],
    redTurn: false,
  });

  useEffect(() => {
    Firebase.addListenerForRefChild('games', gameRefID, 'value', (gameData) => {
      if (gameData !== gameObj) {
        console.log("gameObj: ", gameObj)
        setGameObj({
          redTurn: gameData.redTurn,
          blueTeam: gameData.blueTeam,
          redTeam: gameData.redTeam,
          spymasterRed: gameData.spymasterRed,
          spymasterBlue: gameData.spymasterBlue,
        });
      }
    });

    return () => Firebase.removeListenerForRefChild('games', gameRefID, 'value')
  }, []);

  return (
    <div className="teamsDropdown">
      <div className="teamsInfo">
        <TeamBox teamName="red" playerList={gameObj.redTeam} username={username} >
          <TeamControls
            teamName="red"
            username={username}
            spymaster={gameObj.spymasterRed} />
        </TeamBox>
        <div className="verticalDivider" />
        <TeamBox teamName="blue" playerList={gameObj.blueTeam} username={username} >
          <TeamControls
            teamName="blue"
            username={username}
            spymaster={gameObj.spymasterBlue} />
        </TeamBox>
      </div>
      <div className="horizontalDivider" />
      <Box mt="1rem">
        <Button variant="contained" onClick={inviteLink} >Invite Link</Button>
      </Box>
      {/* <Box mt="1rem">
        <NewGame prevRoomName={gameObj.roomName || ''} />
      </Box> */}
    </div>
  );
}

export default TeamsDropdown;