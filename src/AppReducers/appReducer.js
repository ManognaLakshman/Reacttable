import * as actionTypes from "../store/actions/actions";

const initialState = {
    userDetails: {},
    isLoggedIn: false,
    userId: null,
    userTextBoxValue: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USERDETAILS:
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