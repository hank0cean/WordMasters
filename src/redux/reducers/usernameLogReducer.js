
const usernameLogReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.payload.username
    case 'LOG_OUT':
      return action.payload.username
    default:
      return state
  }
}

export default usernameLogReducer;
