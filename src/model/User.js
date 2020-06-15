import {Firebase} from './../utils/Firebase';
import {ClassEvent} from '../utils/ClassEvent';

export class User extends ClassEvent { //classe para o modelo de usuário que herda os atributos e métodos da ClassEvent

    static getRef() { //pegar a referência do usuário no firestore

        return Firebase.db().collection('/users');

    } //fechando o getRef()

    static findByEmail(email) { //encontra o documento do usuário de acordo com o email

        return User.getRef().doc(email); //retorna esse documento

    } //fechando o findByEmail()

} //fechando a classe User