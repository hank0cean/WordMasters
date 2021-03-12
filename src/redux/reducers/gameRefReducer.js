
const gameRefReducer = (state = null, action) => {
    if (action.type === "SET_GAME_REF") {
        console.log("payload.gRID: ", action.payload.gameRefID)
        return action.payload.gameRefID
    }
    else return state;
}

export default gameRefReducer;
