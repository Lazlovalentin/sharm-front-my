import axios from 'axios';
import {cookies} from "next/headers";

export const getAllUsers = async (url: string, page: string, limit: string) => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const token = cookies().get('token')

    return axios.get(`${baseURL}/api/${url}`, {
        params: {page: page, limit: limit},
        headers: {
            'Authorization': `Bearer ${token?.value}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching users:', error);
            throw error;
        });
}
