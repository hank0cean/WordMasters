import React from 'react';
import { Button } from '@material-ui/core';

import GameApi from '../api/game';

function SettingsDropdown(props) {

  async function becomeSpymaster(gameRefID) {

    const gameObj = await GameApi.findGameByID(gameRefID);

    if (!gameObj.spymaster1) {
      GameApi.addSpymaster(gameRefID);
      props.setSpymaster(true);
    }
    else if (!gameObj.spymaster2) {
      GameApi.addSpymaster(gameRefID, true);
      props.setSpymaster(true);
    }
    else {
      // console.log("too many spymasters")
    }
  }

  return (
    <div className="settingsDropdown">
      <Button type="submit" variant="contained" onClick={() => becomeSpymaster(props.gameRefID)} >
        Become Spymaster
      </Button>
    </div>
  );
}

export default SettingsDropdown;