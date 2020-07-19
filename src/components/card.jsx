import React, { useState } from 'react';
import { ButtonBase, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  card: {
    fontSize: "2rem",
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
    '&:hover': {
      boxShadow: "rgba(2, 8, 20, 0.1) 0px 0.35rem 1.175rem, rgba(2, 8, 20, 0.08) 0px 0.175rem 0.5rem",
      transform: "translateY(1px) scale(1.15)",
    }
  }
}));


const cardColorStyle = (color) => {
  switch (color) {
    case 'red':
      return {
        backgroundColor: "#ba000d",
      }
    case 'blue':
      return {
        backgroundColor: "#1D39F5",
      }
  
    case 'black':
      return {
        backgroundColor: "#000000",
      }
  
    default:
      return {
        color: "#000000",
        backgroundColor: "#F9F990"
      }
  }
}


function Card(props) {
  /*
    props.card          (1 card of 25 from cardList pulled from selectedDeck)
              .word     
              .color        (['none', 'red', 'blue', 'black'])
              .isFlipped    (true / false)
  */

  const classes = useStyles();
  const [isFlipped, flipCard] = useState(false);

  const handleClick = () => {
    flipCard(isFlipped ? true : true)
  }

  return ( 
    <ButtonBase
      color="primary"
      variant="outlined"
      onClick={handleClick}
      className={classes.card}
      style={isFlipped ? cardColorStyle(props.card.color) : {}}
    >
      <Typography
        variant="subtitle1"
        className="cardWord"
      >
        <p>{isFlipped ? 'flipped' : 'hidden'}___{props.card.word}</p>
      </Typography>
    </ButtonBase>
  );
}

/*
<span className="card">
<Button variant="contained">{props.cardNumber}</Button>

</span>
*/

export default Card;