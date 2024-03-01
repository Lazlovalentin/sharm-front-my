
export const getAction = async (url: string, data: any) => {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    return fetch(`${baseURL}/api/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            return response.json();
        })
        .then(data => data)
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
