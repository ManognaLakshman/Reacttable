import * as actionTypes from '../actions';
import _ from 'lodash';

const initialState = {
    dep_data: [],
    isLoading: false,
    filterState: {},
    pages: -1
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.HANDLE_FILTERS:
            return {
                ...state,
                filterState: {
                    ...state.filterState,
                    [action.payload.identifier]: [action.payload.value]
                }
            }

        case actionTypes.FETCH_DATA:
            return {
                ...state,
                dep_data: action.payload.newData,
                isLoading: action.payload.isLoading,
                pages: action.payload.pages
            }

        case actionTypes.LOAD_CHANGE:
            return {
                ...state,
                isLoading: true
            }

        case actionTypes.DELETE_FILTER:
            const newState = _.cloneDeep(state);
            delete newState.filterState[action.payload.identifier];
            return newState;

        case actionTypes.REFRESH_TABLE:
            return {
                ...initialState
            }
        default:
            return state;
    }

}

export default reducer;

