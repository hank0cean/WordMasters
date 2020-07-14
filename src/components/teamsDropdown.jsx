import React from 'react';
import { Box, Button } from '@material-ui/core';
import { spacing } from '@material-ui/system';

function TeamsDropdown(props) {
  const theme = {
    spacing: 8,
  }

  return ( 
    ((props.itemOpen &&
    <div className="teamsDropdown">
      <div className="teamsInfo">
        <div className="redTeam">
          Red Team
          <p>--------</p>
          {props.redTeam}
          <Box my="1rem">
            <Button variant="contained">Join Red</Button>
          </Box>
        </div>
        <div className="verticalDivider"></div>
        <div className="blueTeam">
          Blue Team
          <p>--------</p>
          {props.blueTeam}
          <Box my="1rem">
            <Button variant="contained">Join Blue</Button>
          </Box>
        </div>
        <div className="horizontalDivider"></div>
        <div className="verticalDivider"></div>
        <div className="horizontalDivider"></div>
      </div>
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