import {$auth_host, $host} from "./index";
import {jwtDecode} from "jwt-decode";
import {type} from "@testing-library/user-event/dist/type";

export const getTypes = async () => {
    const {data} =  await $host.get('/api/types');
    return data;
}

export const getGrapes = async () => {
    const {data} = await $host.get('/api/grapes');
    return data;
}

export const getPositions = async (type_code, grape_code) => {
    const {data} = await $host.get('/api/positions', {
        params: {
            type_code: type_code,
            grape_code: grape_code
        }
    });
    return data;
}

export const getOnePosition = async (id) => {
    const {data} = await $host.get('/api/positions/' + id);
    return data;
}