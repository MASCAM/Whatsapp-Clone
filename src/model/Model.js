import {ClassEvent} from "../utils/ClassEvent";

export class Model extends ClassEvent {

    constructor() {

        super();
        this._data = {};

    }

    fromJSON(json) { //pega um json e gera o objeto correspondente

        this._data = Object.assign(this._data, json); //mescla o json com o objeto de dados
        this.trigger('datachange', this.toJSON()); //avisa que mudou os dados do usuário e envia os dados 

    } //fechando o fromJSON()

    toJSON() { //retorna um json a partir dos dados do objeto correspondente

        return this._data; //retorna os dados atualizados do usuário

    } //fechando o toJSON()

} //fechando a classe Model