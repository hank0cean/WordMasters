import React,{ Component } from 'react';
import { Box, Button } from '@material-ui/core';

import './../styles/teamsDropdown.css'

class TeamsDropdown extends Component {
  
  teamListBox(teamName, playerList) {

    return (
      <div className="teamListBox">
        <p>{teamName} Team</p>
        <p>--------</p>
        {(playerList ? playerList.map((player) => (
          <p>{player}</p>
        )) : <p>No Players</p>)}
        {(teamName === 'Blue' ? 
          <Box ml="0.5rem" my="1rem">
            <Button variant="contained" color="primary">Join Blue</Button>
          </Box>
        : <Box my="1rem">
            <Button variant="contained" color="secondary">Join Red</Button>
          </Box>)}
      </div>
    );
  }
  
  render() {
    return ( 
      <div className="teamsDropdown">
        <div className="teamsInfo">
          {this.teamListBox("Red", this.props.redTeam)}
          <div className="verticalDivider"></div>
          {this.teamListBox("Blue", this.props.blueTeam)}
        </div>
        <div className="horizontalDivider"></div>
        <Box mt="1rem">
          <Button variant="contained">Randomize Teams</Button>
        </Box>
        <Box mt="1rem">
          <Button variant="contained">Invite Link</Button>
        </Box>
      </div>
    );
  }
}
 
export default TeamsDropdown;