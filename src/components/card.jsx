import React, { useState, useEffect } from 'react';
import { ButtonBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import GameApi from '../api/game'

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

  const [card, setCard] = useState({
    word: '',
    color: '',
    isFlipped: false,
  });
  const classes = useStyles();

  useEffect(() => {
    GameApi.addListenerForRefChild('cards', props.cardRefID, 'value', (cardData) => {
      if (cardData !== card) {
        setCard(cardData);
      }
    });
  }, []);

  return (
    <ButtonBase
      color="primary"
      variant="outlined"
      onClick={props.spymaster || card.isFlipped ? () => {} : () => GameApi.flipCard(props.cardRefID)}
      className={`${classes.card} ${(card.isFlipped ? classes.flipped : '')}`}
      style={card.isFlipped || props.spymaster ? cardColorStyle(card.color) : {}}
    >
      {card.word}
    </ButtonBase>
  );
}

export default Card;
