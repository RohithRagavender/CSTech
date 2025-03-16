import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;



// 1. Create Axios Instance:
// => Sets a default baseURL (http://localhost:5000/api) so you don’t need to repeat it in every request.

// 2. Add Token Automatically:
// => An interceptor reads the token from localStorage and adds it to the Authorization header (Bearer <token>) for every request.

// 3. Secure Protected Routes:
// => The token allows the backend to verify if the user is authenticated before granting access.

// 4. Clean Code:
// => No need to manually add tokens or headers every time — keeps the code neat and consistent.

// 5. Handle Errors Gracefully:
// => If token retrieval or request modification fails, the interceptor rejects the request and returns an error.