import axios from 'axios';
import { API_BASE_URL } from '../../Constants';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL
});

export const makeRequest = async (url, method, data = null,token=null,multifile=false) => {
    try {
        
        const headers = {};
        if (method.toLowerCase() === 'post') {
            headers['Content-Type'] = 'application/json';
        }
        if(multifile)
        {
            headers['Content-Type']= "multipart/form-data"; 
        }
        if (token) {
            headers.Authorization = `Bearer ${atob(token)}`;
        }

        const response = await axiosInstance({url,method,data,headers});
        return response;
    } catch (error) {
        return error.response;
    }
};