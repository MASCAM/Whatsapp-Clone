const pdfjsLib = require('pdfjs-dist');
const path = require('path'); //chamando os pacotes pdfjsLib e path

pdfjsLib.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, '../../dist/pdf.worker.bundle.js'); //configurando o caminho do worker do pdfjs

export class DocumentPreviewController {

    constructor(file) {

        this._file = file;

    } //fechando o constructor()

    getPreviewData() { //para pegar os dados de pré-visualização do arquivo enviado

        return new Promise((resolve, reject) => {

            let reader = new FileReader();
            switch (this._file.type) {

                case 'image/png':
                case 'image/jpeg':
                case 'image/jpg':
                case 'image/gif':
                    reader.onload = e => {

                        resolve({
                            
                            src: reader.result,
                            info: this._file.name,
                        
                        });

                    }
                    reader.onerror = e => {

                        reject(e);

                    }
                    reader.readAsDataURL(this._file);
                    break;
                case 'application/pdf':
                    reader = new FileReader();
                    reader.onload = e => { //tudo isso para visualizar a página

                        const loadingTask = pdfjsLib.getDocument(new Uint8Array(reader.result));
                        loadingTask.promise.then((pdfDocument) => {

                            pdfDocument.getPage(1).then(page => {

                                var viewport = page.getViewport({ scale: 1, });
                                let canvas = document.createElement('canvas');
                                let canvasContext = canvas.getContext('2d');
                                canvas.width = viewport.width;                      //setAttribute('height', 664);
                                canvas.height = viewport.height;                    //setAttribute('width', 885); atribui a altura e largura do canvas de acordo com o pdf
                                var renderContext = {

                                    canvasContext,
                                    viewport,

                                }
                                var renderTask = page.render(renderContext).promise.then(() => {

                                    let s = (pdfDocument.numPages > 1) ? 's' : '';
                                    resolve({
                            
                                        src: canvas.toDataURL('image/jpg'),
                                        info: `${pdfDocument.numPages} página${s}`,
                                        type: 'pdf',
                                    
                                    });

                                });
                                

                            }).catch(err => {

                                reject(err);

                            });

                        }).catch(err => {

                            reject(err);

                        });

                    }
                    reader.readAsArrayBuffer(this._file); //ler o arquivo como array antes do onload
                    break;
                default:
                    reject();

            }

        });

    } //fechando o getPreviewData()

} //fechando a classe DocumentPreviewController