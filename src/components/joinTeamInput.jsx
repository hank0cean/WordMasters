import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
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
  // const loggedUsername = useSelector(state => state.username);
  const dispatch = useDispatch();

  const [inputName, setInputName] = useState('');
  const classes = useStyles();

  const joinHandler = () => {
    dispatch(login(inputName));
    console.log(`joining ${teamName} team... (${inputName})`);
    GameApi.joinTeam(gameRefID, teamName, inputName);
  }

  return (
    <div className={classes.joinTeamContainer}>
      <Typography variant='h5' color={(teamName === 'red' ? 'secondary' : 'primary')} style={{textTransform: 'uppercase'}}>
        {teamName + " Team"}
      </Typography>
      <div className={classes.joinTeamForm}>
        <TextField
          autoComplete='off'
          id="joinTeamInput"
          name="joinTeam"
          type="text"
          value={inputName}
          onChange={(event) => setInputName(event.target.value)}
          label="Enter Username"
          variant="outlined"
          color={(teamName === 'red' ? 'secondary' : 'primary')}
          fullWidth={true}
        />
      </div>
      <Button
        type="submit"
        variant='contained'
        onClick={joinHandler}
        size='large'
        color={(teamName === 'red' ? 'secondary' : 'primary')}>
          Join {teamName}
      </Button>
    </div>
  );
}

export default JoinTeamInput;