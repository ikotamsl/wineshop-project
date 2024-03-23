import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

const $auth_host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
}

$auth_host.interceptors.request.use(authInterceptor);

export {
    $host,
    $auth_host
}