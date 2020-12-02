import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import GameApi from '../api/game'
import { Button, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  joinTeamContainer: {
    margin: '1rem',
    marginTop: '0rem',
  },
  joinTeamForm: {
    marginBottom: '1rem',
  },
}))

function JoinTeamInput(props) {

  const [username, setUsername] = useState('');
  const classes = useStyles();

  function joinTeam() {
    console.log(`joining ${props.teamName} team... (${username})`);
    GameApi.joinTeam(props.gameRefID, props.teamName, username);
  }

  return (
    <div className={classes.joinTeamContainer}>
      <Typography variant='h5' color={(props.teamName === 'red' ? 'secondary' : 'primary')} style={{textTransform: 'uppercase'}}>
        {props.teamName + " Team"}
      </Typography>
      <form className={classes.joinTeamForm} onSubmit={joinTeam}>
        <TextField
          autoComplete='off'
          id="joinTeamInput"
          name="joinTeam"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          label="Enter Username"
          variant="outlined"
          color={(props.teamName === 'red' ? 'secondary' : 'primary')}
          fullWidth={true}
        />
      </form>
      <Button
        type="submit"
        variant='contained'
        onClick={joinTeam}
        size='large'
        color={(props.teamName === 'red' ? 'secondary' : 'primary')}>
          Join {props.teamName}
      </Button>
    </div>
  );
}

export default JoinTeamInput;