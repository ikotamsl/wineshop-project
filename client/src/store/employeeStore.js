import {makeAutoObservable} from "mobx";

export default class employeeStore {
    constructor() {
        this._isAuth = false;
        this._employee = {};
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setEmployee(employee) {
        this._employee = employee
    }

    get isAuth() {
        return this._isAuth
    }

    get employee() {
        return this._employee
    }
}
