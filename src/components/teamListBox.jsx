import React from 'react';
import { Box, Button } from '@material-ui/core';

function TeamListBox(props) {
  
  return (
    <div className="teamListBox">
      <p>{props.teamName} Team</p>
      <p>--------</p>
      {(props.playerList ? props.playerList.map((player) => (
        <p>{player}</p>
      )) : <p>No Players</p>)}

      {(props.teamName === 'Blue' ? 
        <Box ml="0.5rem" my="1rem">
          <Button variant="contained" color="primary">Join Blue</Button>
        </Box>
      : <Box my="1rem">
          <Button variant="contained" color="secondary">Join Red</Button>
        </Box>)}
    </div>
  )
}

export default TeamListBox;
