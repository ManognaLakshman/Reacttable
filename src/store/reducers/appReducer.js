import * as actionTypes from "../actions/actions";

const initialState = {
    userDetails: {},
    isLoggedIn: false,
    userId: null,
    userTextBoxValue: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER_DETAILS:
            return {
                ...state,
                userDetails: action.payload.userDetails.data,
                isLoggedIn: true,
                userId: action.payload.userId
            }
        case actionTypes.CHANGE_USERID:
            return {
                ...state,
                userTextBoxValue: action.payload.target.value
            }
        default:
            return state;
    }
}


export default reducer;