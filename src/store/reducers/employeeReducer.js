import * as actionTypes from "../actions";
import moment from "moment";
import _ from 'lodash';

const initialState = {
    emp_data: [],
    dep_data_emp: {},
    isLoading: false,
    filterState: {},
    pages: -1
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DATE_CHANGE:
            return {
                ...state,
                filterState: {
                    ...state.filterState,
                    [action.payload.identifier]: moment(action.payload.value).format("YYYY-MM-DD")
                }
            }
        case actionTypes.FILTER_CHANGE:
            return {
                ...state,
                filterState: {
                    ...state.filterState,
                    [action.payload.identifier]: action.payload.value
                }
            }
        case actionTypes.FETCH_EMPLOYEE:
            return {
                ...state,
                emp_data: action.payload.empData,
                isLoading: false,
                pages: action.payload.pages
            }
        case actionTypes.LOAD_EMPLOYEE:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.DELETE_FILTER_EMP:
            const newState = _.cloneDeep(state);
            delete newState.filterState[action.payload.identifier];
            return newState;
        default:
            return state;
    }
}

export default reducer;