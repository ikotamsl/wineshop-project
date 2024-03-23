import {$auth_host, $host} from "./index";
import {jwtDecode} from "jwt-decode";
export const customerLogin = async (login, password) => {
    const {data} = await $host.post('/api/customers/login', {login, password});
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const empLogin = async (login, password) => {
    const data = await $host.post('/api/employees/', {login, password});
}

export const check = async () => {
    const {data} = await $auth_host.get('/api/customers/auth');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}