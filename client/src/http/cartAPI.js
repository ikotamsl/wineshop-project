import {$auth_host, $host} from "./index";
import {jwtDecode} from "jwt-decode";
export const getCartById = async (id) => {
    const {data} = await $auth_host.get('/api/cart' + id);
    return data;
}