import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import { makeStyles } from "@material-ui/core"
import { Button, TextField } from '@material-ui/core'
import GameApi from './../api/game'

const useStyles = makeStyles((theme) => ({
	homeFormWrapper: {
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
	form: {
		margin: '1rem',
		width: '60%',
	}
}));

function NewGame({prevRoomName = null}) {
	const classes = useStyles();
	let history = useHistory();
	const [textFieldValue, setTextFieldValue] = useState('');

	async function newGame() {
		const gameRefID = await GameApi.createGame(prevRoomName || textFieldValue);
		setTextFieldValue('');
		history.push(`/game/${gameRefID}`);
	}
	
	if (prevRoomName === null) {
		return (
			<div className={classes.homeFormWrapper}>
				<form className={classes.form} onSubmit={newGame}>
					<TextField
						autoComplete='off'
						id="roomNameInput"
						name="roomName"
						type="text"
						value={textFieldValue}
						onChange={(event) => setTextFieldValue(event.target.value)}
						label="Room Name"
						variant="outlined"
						color='secondary'
						fullWidth={true}
					/>
				</form>
				<Button
				type="submit"
				variant="contained"
				onClick={newGame}
				size='large'
				color='inherit'>
					Create Game
				</Button>
			</div>
		);
	}
	else {
		return (
			<div className={classes.homeFormWrapper}>
				{/* <Button
				type="submit"
				variant="contained"
				onClick={createGame}
				size='large'
				color='inherit'>
					New Game
				</Button> */}
			</div>
		);
	}
}

export default NewGame;
