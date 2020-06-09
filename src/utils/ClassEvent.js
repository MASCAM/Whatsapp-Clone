export class ClassEvent { //classe que manipula os eventos de gravação

    constructor() {

        this._events = {};

    } //fechando o constructor()

    on(eventName, fn) { //cria uma array de listener para o evento com funções específicas

        if (!this._events[eventName]) { //se já não existir um evento com esse nome

            this._events[eventName] = new Array(); //cria uma array dentro do objeto com o nome do evento

        }
        this._events[eventName].push(fn); //insere a função na array

    } //fechando o on()

    trigger() { //método que dispara o evento

        let args = [...arguments]; //pega todos os argumentos passados para a função num array
        let eventName = args.shift(); //remove o primeiro elemento do array e passa para eventName
        args.push(new Event(eventName));
        if (this._events[eventName] instanceof Array) { //verifica se o evento existe

            this._events[eventName].forEach(fn => {
                
                fn.apply(null, args); //para cada função associada ao trigger do evento (array de funções), executa a função

            });

        }

    } //fechando o trigger()

} //fechando a classe ClassEvent