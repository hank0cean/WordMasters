import React, { useState } from 'react';
import { TextField, Typography, Button, makeStyles } from '@material-ui/core';

import './../styles/decksDropdown.css'
import GameApi from '../api/game'

const useStyles = makeStyles((theme) => ({
  decksDropdown: {
    textAlign: "center",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  deckOptions: {
    width: "90%",
    height: "90%",
    display: "grid",
    gridTemplateColumns: "45% 45%",
    gridTemplateRows: "40% 40%",
    gap: "10%",
    marginBottom: "0.5rem",
  },
  optionsHeader: {
    gridColumn: "1 / 3",
    gridRow: "1",
  },
  deckActions: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    margin: "0.5rem",
    alignItems: "center",
  },
  input: {
    backgroundColor: "var(--sub-menu-secondary)",
    borderRadius: "5px",
    margin: "0.5rem",
  },
  button: {
    width: "50%",
  }
}));

function DecksDropdown() {
  const [currentDeck, setCurrentDeck] = useState('standard');
  const [newWord, setNewWord] = useState('');
  const styles = useStyles();

  function addWordToDeck(deckName, newWord) {
    GameApi.addWordToDeck(deckName, newWord);
  }

  return ( 
    <div className={styles.decksDropdown}>
      <div className={styles.deckOptions}>
        <Typography className={styles.optionsHeader} variant="h6">Featured</Typography>
        <Button
          variant="contained"
          onClick={() => setCurrentDeck('standard')}
        >
          Standard
        </Button>
        <Button
          variant="contained"
          onClick={() => setCurrentDeck('custom')}
        >
          Custom
        </Button>
      </div>
      <div className="horizontalDivider" />
      <div className={styles.deckActions}>
        <form onSubmit={(event) => {
          event.preventDefault()
          setNewWord('')
        }} >
          <TextField
              className={styles.input}
              autoComplete='off'
              id="newWordInput"
              name="newWord"
              type="text"
              value={newWord}
              onChange={(event) => setNewWord(event.target.value)}
              label="New Word"
              variant="outlined"
              color='primary'
          />
        </form>
        <Button
          className={styles.button}
          variant="contained"
          onClick={() => {
            addWordToDeck(currentDeck, newWord)
            setNewWord('')
          }}
        >
            Add Word
        </Button>
      </div>
    </div>
  );
}
 
export default DecksDropdown;