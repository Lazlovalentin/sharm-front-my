// hooks/useApi.ts
import axios from 'axios';
import {useState} from 'react';

interface ApiResponse<T> {
    data?: T;
    error?: string;
}

export const useApi = <T = any>() => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const sendRequest = (endpoint: string, method: 'GET' | 'POST' | 'DELETE', data?: any): Promise<ApiResponse<T>> => {
        setLoading(true);
        setError(null);
        const url = `${baseURL}/api/${endpoint}`;

        return axios({url, method, data, withCredentials: true})
            .then((response) => {
                setLoading(false);
                return {data: response.data};
            })
            .catch((error) => {
                setLoading(false);
                const message = error.response?.data.message || 'An error occurred';
                setError(message);
                return Promise.reject({error: message});
            });
    };

    return {sendRequest, loading, error};
};
