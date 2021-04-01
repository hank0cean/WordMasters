import React, { useEffect, useState } from 'react'

import DecksApi from './../api/decks'

import { makeStyles } from "@material-ui/core"
import { Button, TextField } from '@material-ui/core'
import GameApi from './../api/game'

const useStyles = makeStyles((theme) => ({
    decksFormWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'var(--text-secondary)',
      height: '25%',
      width: '40%',
      borderRadius: '10px',
      color: 'black',
    },
}));

function DecksLogin({children}) {
  const [key, setKey] = useState('');
  const [logged, setLogged] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    let keyVerified = DecksApi.verifyLoginKey(key);
    console.log(keyVerified)
    if (!keyVerified){
      setLogged(false);
    }
    else setLogged(true);
  });

  if (!logged) {
    return (
      <div className={classes.decksFormWrapper}>
        <div>
          <TextField
            autoComplete='off'
            id="loginKeyInput"
            name="loginKey"
            type="text"
            value={key}
            onChange={(event) => setKey(event.target.value)}
            label="Login Key"
            variant="outlined"
            color='secondary'
            fullWidth={true}
          />
        </div>
				{/* <Button
          type="submit"
          variant="contained"
          onClick={}
          size='large'
          color='inherit'>
            Create Game
				</Button> */}
      </div>
    )
  }
  else {
    return children
  }
}

export default DecksLogin;
