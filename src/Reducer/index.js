import reducerDepSearch from '../Views/Reducers/reducerDepSearch';
import reducerForm from '../Views/DepartmentSearch/DepSearchReducers/reducer';
import employeeReducer from '../Views/Employee/EmployeeReducers/employeeReducer';
import appReducer from '../AppReducers/appReducer';

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    form: reducerForm,
    depSearch: reducerDepSearch,
    emp: employeeReducer,
    login: appReducer
});
export default rootReducer;