import {useState} from 'react';
import Cookies from "js-cookie";

interface ApiResponse<T> {
    data?: T;
    error?: string;
}

export const useApi = <T = any>() => {
    const token = Cookies.get('token');
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const sendRequest = (endpoint: string, method: 'GET' | 'POST' | 'DELETE', data?: any): Promise<ApiResponse<T>> => {
        setLoading(true);
        setError(null);
        const url = `${baseURL}/api/${endpoint}`;

        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                setLoading(false);
                return {data: data};
            })
            .catch(error => {
                setLoading(false);
                const message = error.message || 'An error occurred';
                setError(message);
                return Promise.reject({error: message}); // Відхилення промісу з об'єктом помилки
            });
    };

    return {sendRequest, loading, error};
};
