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
                <h1>GAME CONTAINER</h1>
            </div>
        );
    }
}

export default CodenamesLogin;
