import {makeAutoObservable} from "mobx";

export default class wineStore {
    constructor() {
        this._types = [];
        this._grapes = [];
        this._positions = [];
        this._selectedType = {};
        this._selectedGrape = {};
        makeAutoObservable(this);
    }

    setTypes(types) {
        this._types = types;
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

    get types() {
        return this._types;
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
}
