import {LOG_IN, LOG_OUT, SET_GAME_REF, SET_SPYMASTER} from './actionTypes';

export const login = (username) => ({
  type: LOG_IN,
  payload: {
    username: username
  }
});

export const logout = (username) => ({
  type: LOG_OUT,
  payload: {
    username: username
  }
});

export const set_spymaster = (username) => ({
  type: SET_SPYMASTER,
  payload: {
    username: username
  }
})

export const set_gameRef = (gameRefID) => ({
  type: SET_GAME_REF,
  payload: {
    gameRefID: gameRefID
  }
})