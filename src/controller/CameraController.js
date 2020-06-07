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

    takePicture(mimeType = 'image/png') { //método para efetivamente tirar a foto

        let canvas = document.createElement('canvas'); //para criar um canvas no html
        canvas.setAttribute('height', 664);
        canvas.setAttribute('width', 885); //atribui a altura e largura do canvas de acordo com o vídeo
        let context = canvas.getContext('2d');
        context.drawImage(this._videoEl, 0, 0, 885, 664); //desenha a imagem de acordo com o vídeo e o tamanho do canvas
        return canvas.toDataURL(mimeType);

    } //fechando o takePicture()

} //fechando a classe CameraController