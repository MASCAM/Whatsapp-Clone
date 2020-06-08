export class ClassEvent { //classe que manipula os eventos de gravação

    constructor() {

        this._events = {};

    } //fechando o constructor()

    on(eventName, fn) { //cria uma array de listener para o evento com funções específicas

        if (!this._events[eventName]) { //se já não existir um evento com esse nome

            this._events[eventName] = new Array();

        }
        this._events[eventName].push(fn);

    } //fechando o on()

    trigger() { //método que dispara o evento

        let args = [...arguments]; //pega todos os argumentos passados para a função num array
        let eventName = args.shift(); //remove o primeiro elemento do array e passa para eventName
        if (this._events[eventName] instanceof Array) {

            

        }

    } //fechando o trigger()

} //fechando a classe ClassEvent