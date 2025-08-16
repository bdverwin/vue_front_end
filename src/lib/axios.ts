import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
});

const authHeader = (api) => {
    api.interceptors.request.use(config => {
        const token = localStorage.getItem('auth_token');

        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers.Accept = 'application/json';
        }
        return config;
    });
}

authHeader(api);
// authHeader(productApi);

// api.interceptors.request.use(config => {
//     const token = localStorage.getItem('auth_token');

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       config.headers.Accept = 'application/json';
//     }
//     return config;
// });
  

export default api;
