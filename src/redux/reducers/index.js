import { combineReducers } from 'redux';

import usernameLogReducer from './usernameLogReducer';
import gameRefReducer from './gameRefReducer';
import spymasterReducer from './spymasterReducer';

const rootReducer = combineReducers({
    username: usernameLogReducer,
    gameRefID: gameRefReducer,
    spymaster: spymasterReducer,
});

export default rootReducer;