import React, { Component } from 'react';
import { Button } from '@material-ui/core';

import './../styles/Board.css'

class Board extends Component {

    renderRow(id_number) {
        const id = 'row-' + id_number;

        return (
            <div className="boardRow" id={id}>
                <Button variant="contained">This is a button</Button>
                <Button variant="contained">This is a button</Button>
                <Button variant="contained">This is a button</Button>
                <Button variant="contained">This is a button</Button>
                <Button variant="contained">This is a button</Button>
            </div>
            // {this.renderCard()}
        );
    }

    render() { 
        return ( 
            <div className="Board">
                {this.renderRow(1)}
                {this.renderRow(2)}
                {this.renderRow(3)}
                {this.renderRow(4)}
                {this.renderRow(5)}
            </div>
        );
    }
}
 
export default Board;
