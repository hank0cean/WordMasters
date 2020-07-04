import React, { Component } from 'react'
import { Button, TextField } from '@material-ui/core'
import GameApi from '../api/game'

import '../styles/loginContainer.css'

class LoginContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      roomName: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    console.log(`You've entered your username: '${this.state.username}' and a room name: '${this.state.roomName}'`)
    event.preventDefault()
  }

  handlePressTest(e) {
    console.log('test')
    GameApi.createGame()
  }

  render() {
    return (
      <div id="loginContainer">
        <h1>Codenames.plus.plus</h1>
        <form onSubmit={this.handleSubmit}>
          <TextField id="usernameInput" name="username" type="text" value={this.state.username} onChange={this.handleChange} label="Username" variant="outlined" />
          <TextField id="roomNameInput" name="roomName" type="text" value={this.state.roomName} onChange={this.handleChange} label="Room Name" variant="outlined" />
        </form>
        <Button type="submit" variant="contained" onClick={this.handlePressTest}>Submit</Button>
      </div>
    )
  }
}

export default LoginContainer
