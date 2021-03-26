import React from 'react';

import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import GameApi from '../api/game';

function BecomeTeamSpymaster({teamName, username}) {
  const gameRefID = useSelector(state => state.gameRefID);
  const dispatch = useDispatch();

  async function becomeSpymaster(gameRefID) {

    const gameObj = await GameApi.findGameByID(gameRefID);
    try {
      GameApi.addSpymaster(gameRefID, teamName, username);
      dispatch(set_spymaster(gameRefID));
    }
    catch (error) {}

  }

  return (
    <div className="settingsDropdown">
      <Button type="submit" variant="contained" onClick={() => becomeSpymaster(gameRefID)} >
        Become Spymaster
      </Button>
    </div>
  );
}

export default BecomeTeamSpymaster;
