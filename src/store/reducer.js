import _ from 'lodash';
import * as actionTypes from './actions';

const initialState = {
    dep_details: {},
    searchDetails: {},
    flag: false
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.HANDLECHANGE:
            return {
                ...state,
                dep_details: {
                    ...state.dep_details,
                    [action.payload.eventName["0"]]: action.payload.eventValue["0"]
                }
            }

        case actionTypes.HANDLENEWSEARCH:
            return {
                ...initialState
            }

        case actionTypes.HANDLEDELETE:
            const newState = _.cloneDeep(state);
            delete newState.dep_details[action.payload.eventName];
            return newState;

        case actionTypes.HANDLEDEPSEARCH:
            return {
                ...state,
                searchDetails: action.payload.searchData,
                flag: true
            }

        default:
            return state;
    }
}

export default reducer;