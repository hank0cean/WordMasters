
const spymasterReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_SPYMASTER':
            return true;
        default:
            return state;
    }
}

export default spymasterReducer