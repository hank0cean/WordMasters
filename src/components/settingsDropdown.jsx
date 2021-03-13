import React from 'react';
import { Button } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { set_spymaster } from '../redux/actions';

import GameApi from '../api/game';

function SettingsDropdown() {

  const gameRefID = useSelector(state => state.gameRefID);
  const dispatch = useDispatch();

  async function becomeSpymaster(gameRefID) {

    const gameObj = await GameApi.findGameByID(gameRefID);

    if (!gameObj.spymaster1) {
      GameApi.addSpymaster(gameRefID);
      dispatch(set_spymaster(gameRefID));
    }
    else if (!gameObj.spymaster2) {
      GameApi.addSpymaster(gameRefID, true);
      dispatch(set_spymaster(gameRefID));
    }
    else {
      // console.log("too many spymasters")
    }
  }

  return (
    <div className="settingsDropdown">
      <Button type="submit" variant="contained" onClick={() => becomeSpymaster(gameRefID)} >
        Become Spymaster
      </Button>
    </div>
  );
}

export default SettingsDropdown;