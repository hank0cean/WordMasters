import React from 'react';
import { Button } from '@material-ui/core';

import {connect} from 'react-redux';
import {set_spymaster} from '../redux/actions';

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

const mapStateToProps = state => {
  return {
    gameRefID: state.gameRefID
  }
}

const mapDispatchToProps = dispatch => {
  return {
    set_spymaster: set_spymaster
  }
}

export default connect({}, mapDispatchToProps)(SettingsDropdown);