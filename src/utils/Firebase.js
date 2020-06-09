const firebase = require('firebase');
require('firebase/firestore');
require('firebase/firebase-storage');

export class Firebase {

    constructor() {

        //configuração do firebase
        this._config = {

            apiKey: "AIzaSyCwS3cIESHcdlYd8R2AHAYpQFlPFqVHh1U",
            authDomain: "whatsapp-clone-5a046.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-5a046.firebaseio.com",
            projectId: "whatsapp-clone-5a046",
            storageBucket: "whatsapp-clone-5a046.appspot.com",
            messagingSenderId: "807610780278",
            appId: "1:807610780278:web:fa493220fded31fdeaed57",
            measurementId: "G-9KS60WB96F",

        };



        this.init(); //inicia o firebase

    }

    init() { //método que configura o firebase

        if (!this._initialized) {
            // Initialize Firebase
            firebase.initializeApp(this._config);
            firebase.analytics();
            firebase.firestore().settings({}); //configura o firestore
            this._initialized = true;

        }

    } //fechando o init()

    static db() {

        return firebase.firestore(); //retorna o banco de dados firestore

    } //fechando o db()

    static hd() {

        return firebase.storage(); //retorna o firebase storage

    } //fechando o hd()

}