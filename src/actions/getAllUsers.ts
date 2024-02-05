export const gerAllUsers = async () => {
    return fetch('http://localhost:3000/api/users?page=1&limit=100',
        {next: {revalidate: 86400}}
    )
        .then((response) => response.json())
}

/*
import axios from 'axios';

export const getAllUsers = () => {
  return axios.get('http://localhost:3000/api/users', {
    params: { page: 1, limit: 100 }
  })
  .then(response => response.data)
  .catch(error => {
    console.error('Error fetching users:', error);
    // Можна повернути помилку або ж пустий масив/об'єкт, залежно від того, що більше підходить для вашого додатку
    throw error; // або return [];
  });
}

 */