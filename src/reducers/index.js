import { isLogged } from './../actions'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    isLogged,
})

export default rootReducer;