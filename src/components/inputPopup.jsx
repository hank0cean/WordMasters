import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  inputPopup: {
  },
  inputPopupContainer: {
    position: "absolute",
    width: "40%",
    background: "#ffffff",
    left: "25%",
    top: "30%",
    padding: "20px",
  },
  show: {
    display: "block",
    background: "var(--bg-secondary)",
  },
  hide: {
    display: "none",
    background: "var(--bg-secondary)",
  },
}));


function InputPopup({ buttonText, buttonColor, children }) {
  const [ show, setShow ] = useState(false);
  const classes = useStyles();
  function handleOpenClose() {
    show ? setShow(false) : setShow(true);
  }

  return (
    <>
      <Button variant="contained" color={buttonColor} onClick={handleOpenClose}>
        {buttonText}
      </Button>
      <div className={(show ? classes.show : classes.hide)}>
        <div className={classes.inputPopupContainer}>
          {children}
          <Button variant="contained" color={buttonColor} onClick={handleOpenClose}>
            Close
          </Button>
        </div>
      </div>
    </>
  );
}

export default InputPopup;
