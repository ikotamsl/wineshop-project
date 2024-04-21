import {$auth_host, $host} from "./index";
import {jwtDecode} from "jwt-decode";
export const getCartById = async (id) => {
    const {data} = await $auth_host.get('/api/carts/' + id);
    return data;
}

export const updateCart = async (id, body) => {
    try {
        const {data} = await $auth_host.patch('/api/carts/' + id, body); // id is for cart's id and body is a patch po
        return data;
    } catch (e) {
        console.log(e);
    }
}