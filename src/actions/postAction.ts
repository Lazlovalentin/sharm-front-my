import axios from 'axios';

export const getAction = async (url: string, data: any, page?: string, limit?: string) => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    return fetch(`${baseURL}/api/${url}?page=${page}&limit=${limit}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => data)
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
