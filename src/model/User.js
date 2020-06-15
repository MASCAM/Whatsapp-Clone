import {Firebase} from './../utils/Firebase';
import {Model} from './Model';

export class User extends Model { //classe para o modelo de usuário que herda os atributos e métodos da ClassEvent

    constructor(id) {

        super();
        if (id) {

            this.getById(id).then(doc => { //se possuir um id procura o documento correspondente no db

                this.fromJSON(doc.data()); //passa os dados do usuário para retornar um objeto com o usuário montado

            }); 

        }

    } //fechando o constructor()

    //getters & setters
    get name() {

        return this._data.name;

    }

    set name(value) {

        this._data.name = value;

    }

    get email() {

        return this._data.email;

    }

    set email(value) {

        this._data.email = value;

    }

    get photo() {

        return this._data.photo;

    }

    set photo(value) {

        this._data.photo = value;

    }
    //fim dos getters & setters

    getById(id) { //procura o usuário de acordo com a referência e o retorna

        return new Promise((resolve, reject) => {

            User.findByEmail(id).onSnapshot(doc => { //fica vigiando as alterações no db para passar os dados pra aplicação

                this.fromJSON(doc.data());
                resolve(doc);

            });

        });

    } //fechando o getById()

    save() { //método que salva os dados do usuário no firebase

        return User.findByEmail(this.email).set(this.toJSON());

    } //fechando o save()

    static getRef() { //pegar a referência do usuário no firestore

        return Firebase.db().collection('/users');

    } //fechando o getRef()

    static findByEmail(email) { //encontra o documento do usuário de acordo com o email

        return User.getRef().doc(email); //retorna esse documento

    } //fechando o findByEmail()

} //fechando a classe User