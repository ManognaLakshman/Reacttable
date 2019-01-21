import axios from 'axios';

export const fetchEmpData = params => {
    return axios.get("https://genericspringrest.herokuapp.com/employee",
        { params: params }
    );
}

export const fetchDepData = params => {
    return axios.get("https://genericspringrest.herokuapp.com/department",
        { params: params });
}

