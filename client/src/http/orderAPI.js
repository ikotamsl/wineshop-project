import {$auth_host, $host} from "./index";
import {jwtDecode} from "jwt-decode";
import {type} from "@testing-library/user-event/dist/type";

export const placeOrder = async (body) => {
    const {data} = await $host.post('/api/orders', body);
    return data;
}

export const getOrders = async (config) => {
    let data = {};

    if (config)
        data = (await $host.get('/api/orders', config)).data;
    else
        data = (await $host.get('/api/orders')).data;
    return data;
}


export const getOnePosition = async (id) => {
    const {data} = await $host.get('/api/positions/' + id);
    return data;
}