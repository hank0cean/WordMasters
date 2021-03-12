
const spymasterReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_SPYMASTER':
            return !state;
    
        default:
            return state;
    }
}

export default spymasterReducer