import React, { useState, useEffect } from 'react';
import { ButtonBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import GameApi from '../api/game';
import Firebase from '../api/firebase';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#353535",
    color: "white",
    boxShadow: "rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem",
    height: "100%",
    width: "100%",
    border: "3px solid",
    borderRadius: 8,
    borderColor: "#202020",
    transition: "all 500ms",
    overflow: "hidden",
    textTransform: "capitalize",
    fontSize: "1.8vw",
    fontWeight: "bold",
    '&:hover': {
      fontSize: "1.8vw",
      fontWeight: "bold",
      boxShadow: "rgba(2, 8, 20, 0.1) 0px 0.35rem 1.175rem, rgba(2, 8, 20, 0.08) 0px 0.175rem 0.5rem",
      transform: "translateY(1px) scale(1.15)",
    }
  },
  flipped: {
    fontSize: "0rem",
  }
}));

const cardColorStyle = (color) => {
  switch (color) {
    case 'red':
      return { backgroundColor: "#ba000d" }
    case 'blue':
      return { backgroundColor: "#1D39F5" }
    case 'black':
      return { backgroundColor: "#000000" }
    default:
      return { color: "#000000", backgroundColor: "#F9F990" }
  }
}

function Card(props) {

  let color = '';
  let word = '';

  const [isFlipped, setIsFlipped] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    Firebase.addListenerForRefChild('cards', props.cardRefID, 'value', (cardData) => {
      if ([cardData.isFlipped, cardData.word, cardData.color] !== [isFlipped, word, color]) {
        setIsFlipped(cardData.isFlipped);
        word = cardData.word;
        color = cardData.color;
      }
    });
  }, []);

  return (
    <ButtonBase
      color="primary"
      variant="outlined"
      onClick={props.spymaster || isFlipped ? () => {} : () => GameApi.flipCard(props.cardRefID)}
      className={`${classes.card} ${(isFlipped ? classes.flipped : '')}`}
      style={isFlipped || props.spymaster ? cardColorStyle(color) : {}}
    >
      {word}
    </ButtonBase>
  );
}

export default Card;
