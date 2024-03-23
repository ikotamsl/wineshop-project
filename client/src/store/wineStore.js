import {makeAutoObservable} from "mobx";

export default class wineStore {
    constructor() {
        this._types = [{id: 1, name: 'Red Dry', code: 'red_dry'}];
        this._years = [1999, 2007, 2018];
        this._grapes = [{id: 1, name: 'Merlot', code: 'merlot'}];
        this._positions = [
            {
                id: 1,
                name: 'Chevalier Noir',
                type: 'red dry',
                year: 1999,
                grape: 'merlot',
                price: 200
            }
        ];
        this._selectedType = {};
        this._selectedGrape = {};
        this._selectedYear = null;
        makeAutoObservable(this);
    }

    setTypes(types) {
        this._types = types;
    }

    setYears(years) {
        this._years = years;
    }

    setGrapes(grapes) {
        this._grapes = grapes;
    }

    setWines(positions) {
        this._positions = positions;
    }

    setSelectedType(type) {
        this._selectedType = type;
    }
    setSelectedGrape(grape) {
        this._selectedGrape = grape;
    }
    setSelectedYear(year) {
        this._selectedYear = year;
    }

    get types() {
        return this._types;
    }

    get years() {
        return this._years;
    }

    get grapes() {
        return this._grapes;
    }

    get positions() {
        return this._positions;
    }

    get selectedType() {
        return this._selectedType;
    }

    get selectedGrape() {
        return this._selectedGrape;
    }
    get selectedYear() {
        return this._selectedYear;
    }
}
