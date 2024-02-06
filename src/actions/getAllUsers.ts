import axios from 'axios';

export const getAllUsers = async (url: string, page: string, limit: string) => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    return axios.get(`${baseURL}/api/${url}`, {
        params: {page: page, limit: limit}
    })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching users:', error);
            throw error;
        });
}
