import * as actionTypes from "../actions/actions";
import moment from "moment";
import _ from 'lodash';

const initialState = {
    emp_data: [],
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
        case actionTypes.LOAD_EMPLOYEE:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.DELETE_FILTER_EMP:
            const newState = _.cloneDeep(state);
            delete newState.filterState[action.payload.identifier];
            return newState;
        case actionTypes.EMPLOYEE_UNMOUNT:
            return {
                ...initialState
            }
        case actionTypes.API_CALL_SAGA:
            const newData = action.payload.newData.data.content.map(result => ({
                id: result.id,
                name: result.name,
                skill: result.skill,
                salary: result.salary,
                grade: result.grade,
                city: result.city,
                country: result.country,
                doj: result.doj,
                desg: result.desg,
                deptname: result.dept ? result.dept.deptname : "",
                Dep_head: result.dept
            }));
            return {
                ...state,
                emp_data: newData,
                isLoading: false,
                pages: action.payload.pages
            }
        default:
            return state;
    }
}

export default reducer;