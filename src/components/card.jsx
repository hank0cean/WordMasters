import React, { useState } from 'react';
import { ButtonBase, Typography } from '@material-ui/core'
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
    transition: "all 750ms",
    overflow: "hidden",
    textTransform: "capitalize",
    '&:hover': {
      boxShadow: "rgba(2, 8, 20, 0.1) 0px 0.35rem 1.175rem, rgba(2, 8, 20, 0.08) 0px 0.175rem 0.5rem",
      transform: "translateY(1px) scale(1.15)",
    }
  },
  cardText: {
    fontSize: "2vw",
    fontWeight: "bold",
  },
  flipped: {
    visibility: "hidden",
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
  /*
    props.card          (1 card of 25 from cardList pulled from selectedDeck)
              .cardID       (card database ref id)
              .word         
              .color        (['none', 'red', 'blue', 'black'])
              .isFlipped    (true / false)
              .gameRefID    (associated game database ref id)
    
    props.cardRefID   (card database ref id)
  */
  const [word, setWord] = useState('');
  const [color, setColor] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const classes = useStyles();

  GameApi.getCardRefByID(props.cardRefID).then((snapshot) => {
    const cardData = snapshot.val();
    setWord(cardData.word);
    setColor(cardData.color);
    setIsFlipped(cardData.isFlipped);
  })

  GameApi.addListenerForRefChild('cards', props.cardRefID, 'child_changed', (snapshot) => {
    const cardData = snapshot.val();
    setWord(cardData.word);
    setColor(cardData.color);
    setIsFlipped(cardData.isFlipped);
  });

  return ( 
    <ButtonBase
      color="primary"
      variant="outlined"
      onClick={(props.spymaster ? {} : () => GameApi.flipCard(props.cardRefID))}
      className={classes.card}
      style={isFlipped || props.spymaster ? cardColorStyle(color) : {}}
    >
      <Typography
        variant="subtitle1"
        className={(isFlipped ? classes.flipped : classes.cardText)}
      >
        {word}
      </Typography>
    </ButtonBase>
  );
}

export default Card;