import {makeAutoObservable} from "mobx";

export default class customerStore {
    constructor() {
        this._isAuth = false;
        this._customer = {};
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setCustomer(customer) {
        this._customer = customer
    }

    get isAuth() {
        return this._isAuth
    }

    get customer() {
        return this._customer
    }
}
