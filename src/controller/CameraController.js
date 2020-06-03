export class CameraController {

    constructor(videoEl) {

        this._videoEl = videoEl;
        navigator.mediaDevices.getUserMedia({

            video: true,

        }).then(stream => {

            this._stream = stream;
            this._videoEl.srcObject = stream; //cria uma URL a partir do arquivo para poder ser executado
            this._videoEl.play(); //executa o vídeo

        }).catch(err => {

            console.error(err);

        });

    } //fechando o constructor()

    stop() { //para de gravar com a câmera

        this._stream.getTracks().forEach(track => { //pega as faixas de gravação e para cada uma delas

            track.stop(); //para a faixa

        });

    } //fechando o stop()

} //fechando a classe CameraController