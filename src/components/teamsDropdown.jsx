import React from 'react';
import { Box, Button } from '@material-ui/core';

function TeamsDropdown(props) {
  
  return ( 
    ((props.itemOpen &&
    <div className="teamsDropdown">
      <div className="teamsInfo">
        <div className="redTeam">
          Red Team
          <p>--------</p>
          {props.redTeam}
          <Box my="1rem">
            <Button variant="contained" color="secondary">Join Red</Button>
          </Box>
        </div>
        <div className="verticalDivider"></div>
        <div className="blueTeam">
          Blue Team
          <p>--------</p>
          {props.blueTeam}
          <Box ml="0.5rem" my="1rem">
            <Button variant="contained" color="primary">Join Blue</Button>
          </Box>
        </div>
      </div>
      <div className="horizontalDivider"></div>
      <Box mt="1rem">
        <Button variant="contained">Randomize Teams</Button>
      </Box>
      <Box mt="1rem">
        <Button variant="contained">Invite Link</Button>
      </Box>
    </div>) || null)
  );
}
 
export default TeamsDropdown;