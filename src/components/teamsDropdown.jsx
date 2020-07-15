import React from 'react';
import { Box, Button } from '@material-ui/core';
import TeamListBox from './teamListBox'

function TeamsDropdown(props) {
  
  return ( 
    ((props.itemOpen &&
    <div className="teamsDropdown">
      <div className="teamsInfo">
        <TeamListBox teamName="Red" playerList={props.redTeam} />
        <div className="verticalDivider"></div>
        <TeamListBox teamName="Blue" playerList={props.blueTeam} />
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