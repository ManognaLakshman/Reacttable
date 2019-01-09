export const HANDLECHANGE = 'HANDLECHANGE';
export const HANDLEDELETE = 'HANDLEDELETE';
export const HANDLENEWSEARCH = 'HANDLENEWSEARCH';
export const HANDLEDEPSEARCH = 'HANDLEDEPSEARCH';
export const REFRESH_TABLE = 'REFRESH_TABLE';
export const HANDLE_FILTERS = 'HANDLE_FILTERS';
export const FETCH_DATA = 'FETCH_DATA';
export const LOAD_CHANGE = 'LOAD_CHANGE';
export const DELETE_FILTER = 'DELETE_FILTER';
export const DATE_CHANGE = 'DATE_CHANGE';
export const FILTER_CHANGE = 'FILTER_CHANGE';
export const FETCH_EMPLOYEE = 'FETCH_EMPLOYEE';
export const LOAD_EMPLOYEE = 'LOAD_EMPLOYEE';
export const DELETE_FILTER_EMP = 'DELETE_FILTER_EMP';
export const EMPLOYEE_UNMOUNT = 'EMPLOYEE_UNMOUNT';
export const DEPARTMENT_UNMOUNT = 'DEPARTMENT_UNMOUNT';

export const handlechange = (event) => {
    return {
        type: HANDLECHANGE,
        payload: { eventName: [event.target.name], eventValue: [event.target.value] }
    }
}

export const handledelete = (event) => {
    return {
        type: HANDLEDELETE,
        payload: { eventName: [event.target.name] }
    }
}

export const handlenewsearch = () => {
    return {
        type: HANDLENEWSEARCH
    }
}

export const handledepsearch = (data) => {
    return {
        type: HANDLEDEPSEARCH,
        payload: { searchData: data }
    }
}

export const refresh_table = () => {
    return {
        type: REFRESH_TABLE
    }
}

export const handle_filters = (event, column) => {
    return {
        type: HANDLE_FILTERS,
        payload: { identifier: column.id, value: event.target.value }
    }
}

export const delete_filter = (column) => {
    return {
        type: DELETE_FILTER,
        payload: { identifier: column.id }
    }
}

export const fetch_data = (newData, pages) => {
    return {
        type: FETCH_DATA,
        payload: { newData: newData, isLoading: false, pages: pages }
    }
}

export const load_change = () => {
    return {
        type: LOAD_CHANGE
    }
}

export const department_unmount = () => {
    return {
        type: REFRESH_TABLE
    }
}

export const date_change = (column, event) => {
    return {
        type: DATE_CHANGE,
        payload: { identifier: column.id, value: event._d }
    }
}

export const filter_change = (column, event) => {
    return {
        type: FILTER_CHANGE,
        payload: { identifier: column.id, value: event.target.value }
    }
}

export const fetch_employee = (newData, pages) => {
    return {
        type: FETCH_EMPLOYEE,
        payload: { empData: newData, pages: pages }
    }
}

export const load_employee = () => {
    return {
        type: LOAD_EMPLOYEE
    }
}

export const delete_filter_emp = (column) => {
    return {
        type: DELETE_FILTER_EMP,
        payload: { identifier: column.id }
    }
}

export const employee_unmount = () => {
    return {
        type: EMPLOYEE_UNMOUNT
    }
}