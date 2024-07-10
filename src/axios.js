import axios from "axios";

// http://127.0.0.1:8000
// https://quizhouse.filtergst.in

const axiosInstance = axios.create({
    baseURL: 'https://quizhouse.filtergst.in/api',
    headers: {
        'Accept': 'application/json',
    },
    withCredentials: false,
    responseType: 'json'
});

export default axiosInstance;