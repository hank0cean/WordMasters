import React, { Component } from 'react'

import './../styles/CodenamesLogin.css'

class CodenamesLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            roomName: '',
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        console.log(`You've entered your username: '${this.state.username}' and a room name: '${this.state.roomName}'`);
        event.preventDefault();
    }

    render() {
        return (
            <div id="codenamesLogin">
                <h1>Codenames.plus.plus</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="loginInput">
                        <label id="usernameLabel" className="loginLabel" for="usernameInput">
                            Username:
                            <input id="usernameInput" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
                        </label>
                    </div>
                    <div className="loginInput">
                        <label id="roomNameLabel" className="loginLabel" for="roomNameInput">
                            Room Name:
                            <input id="roomNameInput" name="roomName" type="text" value={this.state.roomName} onChange={this.handleChange} />
                        </label> 
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default CodenamesLogin;
