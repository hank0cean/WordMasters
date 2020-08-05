import React, { Component, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'
import GameApi from '../api/game'

import '../styles/loginContainer.css'

function LoginContainer(props) {
  let history = useHistory();
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');


  function handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  function handleSubmit(event) {
    console.log(`You've entered your username: '${username}' and a room name: '${roomName}'`)
    event.preventDefault()
  }

  function handlePressTest(e) {
    console.log('test')
    GameApi.testButtonPress()
  }

  async function createGame() {
    console.log(`creating game... (${roomName})`)
    const gameRefID = await GameApi.createGame(roomName)
    console.log(`created gameRef id: ${gameRefID}`)
    history.push(`/game/${gameRefID}`)
  }

  return (
    <div className="loginContainer">
      <h1>Codenames.plus.plus</h1>
      <form>
        <TextField
          id="usernameInput"
          name="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          label="Username"
          variant="outlined"
        />
        <TextField
          id="roomNameInput"
          name="roomName"
          type="text"
          value={roomName}
          onChange={(event) => setRoomName(event.target.value)}
          label="Room Name"
          variant="outlined"
        />
      </form>
      <Button
        type="submit"
        variant="contained"
        onClick={createGame}
        >
          Submit
      </Button>
    </div>
  )
}

export default LoginContainer;
