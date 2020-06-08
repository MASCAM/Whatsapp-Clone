export class MicrophoneController { //classe que controla as funções relacionadas ao microfone

    constructor() {

        navigator.mediaDevices.getUserMedia({

            audio: true,

        }).then(stream => {

            this._stream = stream;
            let audio = new Audio();    //cria o áudio
            audio.srcObject = stream;         //pega a origem do áudio
            audio.play();               //reproduz o áudio
            this.triggrt('play', audio);

        }).catch(err => {

            console.error(err);

        });

    } //fechando o constructor()

    stop() { //para de gravar com a câmera

        if (this._stream) {
            
            this._stream.getTracks().forEach(track => { //pega as faixas de gravação e para cada uma delas

                track.stop(); //para a faixa
    
            });
            
        }

    } //fechando o stop()

} //fechando a classe MicrophoneController