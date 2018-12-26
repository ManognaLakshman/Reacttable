const initialState = {
    dep_details: {}
}

const reducer = (state = initialState, action) => {

    if (action.type === 'HANDLECHANGE') {
        console.log(action.payload.eventName["0"]);
        console.log(state);
        return {
            ...state,
            dep_details: {
                ...state.dep_details,
                [action.payload.eventName["0"]]: action.payload.eventValue["0"]
            }

        }
    }
    return state;
}

export default reducer;