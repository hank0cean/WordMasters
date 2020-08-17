import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'
import GameApi from '../api/game'

import '../styles/homeContainer.css'

function HomeContainer(props) {
  let history = useHistory();
  const [roomName, setRoomName] = useState('');

  async function createGame() {
    console.log(`creating game... (${roomName})`)
    const gameRefID = await GameApi.createGame(roomName)
    console.log(`created gameRef id: ${gameRefID}`)
    history.push(`/game/${gameRefID}`)
  }

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
