import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import {login} from '../redux/actions';

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

function JoinTeamInput({teamName}) {

  const gameRefID = useSelector(state => state.gameRefID);
  const username = useSelector(state => state.username);

  const [name, setName] = useState('');
  const classes = useStyles();

  function joinTeam() {
    console.log(`joining ${teamName} team... (${username})`);
    GameApi.joinTeam(gameRefID, teamName, username);
  }

  return (
    <div className={classes.joinTeamContainer}>
      <Typography variant='h5' color={(teamName === 'red' ? 'secondary' : 'primary')} style={{textTransform: 'uppercase'}}>
        {teamName + " Team"}
      </Typography>
      <form className={classes.joinTeamForm} onSubmit={joinTeam}>
        <TextField
          autoComplete='off'
          id="joinTeamInput"
          name="joinTeam"
          type="text"
          value={username}
          onChange={(event) => setName(event.target.value)}
          label="Enter Username"
          variant="outlined"
          color={(teamName === 'red' ? 'secondary' : 'primary')}
          fullWidth={true}
        />
      </form>
      <Button
        type="submit"
        variant='contained'
        onClick={joinTeam}
        size='large'
        color={(teamName === 'red' ? 'secondary' : 'primary')}>
          Join {teamName}
      </Button>
    </div>
  );
}

export default JoinTeamInput;