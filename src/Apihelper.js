import axios from 'axios';

export const fetchUsers = () => {
  return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => response.data)
    .catch(error => {
      console.log(error);
      throw error;
    });
};
