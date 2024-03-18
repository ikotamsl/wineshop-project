import {makeAutoObservable} from "mobx";

export default class wineStore {
    constructor() {
        this._types = [`red semi-dry`, `red dry`, `red sweet`];
        this._years = [1999, 2007, 2018];
        this._wines = [
            {
                id: 1,
                name: 'Chevalier Noir',
                type: 'red dry',
                year: 1999,
                grape: 'merlot',
                price: 200
            }
        ]
        makeAutoObservable(this);
    }

    setTypes(types) {
        this._types = types;
    }

    setYears(years) {
        this._years = years
    }

    setWines(wines) {
        this._wines = wines
    }

    get types() {
        return this._types
    }

    get years() {
        return this._years
    }

    get wines() {
        return this._wines
    }
}
