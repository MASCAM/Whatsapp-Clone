import { ClassEvent } from "../utils/ClassEvent";
//exemplo muito bom de herança
export class MicrophoneController extends ClassEvent { //classe que controla as funções relacionadas ao microfone

    constructor() {

        super(); //para  chamar o construtor da ClassEvent
        this._available = false; //se o usuário permite a gravação de áudio 
        this._mimeType = 'audio/webm';
        navigator.mediaDevices.getUserMedia({

            audio: true,

        }).then(stream => {

            this._available = true;
            this._stream = stream;
            this.trigger('ready', this._stream); //avisa quando está pronto pra gravar

        }).catch(err => {

            console.error(err);

        });

    } //fechando o constructor()

    isAvailable() { //verifica se o stream de áudio está disponível

        return this._available;

    } //fechando o isAvailable()

    stop() { //para de streamar o microfone

        if (this._stream) {
            
            this._stream.getTracks().forEach(track => { //pega as faixas de gravação e para cada uma delas

                track.stop(); //para a faixa
    
            });
            
        }

    } //fechando o stop()

    startRecorder() { //inicia a gravação de áudio

        if (this.isAvailable()) { //se a gravação de áudio está disponível 

            this._mediaRecorder = new MediaRecorder(this._stream, { //cria um objeto que recupera os dados da stream
                
                mimeType: this._mimeType,
            
            }); 
            this._recordedChunks = []; //porque os dados são liberados em pedaços e é preciso organizá-los em sequência
            this._mediaRecorder.addEventListener('dataavailable', e => { //quando há dados disponíveis para serem salvos

                this._recordedChunks = e.data; //pega os dados gravados e salva (vira um Blob);

            });
            this._mediaRecorder.addEventListener('stop', e => { //quando para a stream (para de receber dados)

                let fileName = `rec${Date.now()}.webm`;
                let file = new File([this._recordedChunks], fileName, { //para criar o arquivo de áudio

                    type: this._mimeType,
                    lastModified: Date.now(),

                }); //com base no Blob, no nome do arquivo designado e parâmetros passados
                console.log('file', file);
                
            });
            this._mediaRecorder.start();
            this.startTimer();

        }

    } //fechando o startRecorder()

    stopRecorder() { //para a gravação de áudio

        if (this.isAvailable()) { //se a gravação de áudio está disponível 

            this._mediaRecorder.stop();
            this.stop();
            this.stopTimer();

        }

    } //fechando o stopRecorder()

    startTimer() { //timer da gravação

        let start = Date.now();
        this._recordMicrophoneInterval = setInterval(() => {

            this.trigger('recordtimer', Date.now() - start)

        }, 100);

    } //fechando o startTimer()

    stopTimer() { //para o timer da gravação

        clearInterval(this._recordMicrophoneInterval);

    } //fechando o stopTimer()

} //fechando a classe MicrophoneController