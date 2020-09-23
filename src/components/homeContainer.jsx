import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'
import GameApi from '../api/game'

import '../styles/homeContainer.css'

function HomeContainer(props) {
  let history = useHistory();
  const [roomName, setRoomName] = useState('');

  /**
   * If a Component has a function that accesses state, hooks or props; that 
   * function needs to be wrapped in useCallback and the state, hooks and props being
   * accessed need to be included in the dependency array. 
   * 
   * This will create a new function anytime any of the values in the dependency array changes
   * and ensures your not accessing stale data.
   */
  const createGame = useCallback(
    /**
     * This is the syntax for using useCallback with an asynchronous function
     */
    async () => {
      console.log(`creating game... (${roomName})`)
      const gameRefID = await GameApi.createGame(roomName)
      console.log(`created gameRef id: ${gameRefID}`)
      history.push(`/game/${gameRefID}`)
    },
    /**
     * history and roomName are state values created via hooks so are included in the dependency array
     */
    [roomName, history]
  )

  return (
    <div className="homeContainer">
      <div className="homeHeader">
        <h1>Codenames.plus.plus</h1>
      </div>
      <div className="homeFormWrapper">
        <form onSubmit={createGame}>
          
          <TextField
            autoComplete='off'
            id="roomNameInput"
            name="roomName"
            type="text"
            value={roomName}
            onChange={(event) => setRoomName(event.target.value)}
            label="Room Name"
            variant="outlined"
            color='secondary'
            fullWidth={true}
          />
        </form>
        <Button
          type="submit"
          variant="contained"
          onClick={createGame}
          size='large'
          color='inherit'
          >
            Create Game
        </Button>
      </div>
    </div>
  )
}

export default HomeContainer;
