import axios from 'axios';

const api = axios.create({
 baseURL: 'https://employee-notes-dashboard-kvfa.onrender.com/api'
});

export default api;
