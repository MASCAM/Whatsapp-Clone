import {Format} from './../utils/Format';
import {CameraController} from './CameraController';
import {MicrophoneController} from './MicrophoneController';
import {DocumentPreviewController} from './DocumentPreviewController';
import {Firebase} from './../utils/Firebase';
import {User} from '../model/User';

export class WhatsAppController {

    constructor() {
        
        //inicia o firebase no controller
        this._firebase = new Firebase();

        //inicia autenticação do Firebase
        this.initAuth();

        //carrega os métodos customizados para os elementos do documento
        this.elementsPrototype();

        //carrega os id's dos elementos do document
        this.loadElements();

        //iniciar as escutas de eventos nos elementos
        this.initEvents();

    } //fechando o constructor()

    initAuth() { //inicia autenticação do Firebase

        this._firebase.initAuth().then((response) => {

            this._user = new User();
            let userRef = User.findByEmail(response.user.email);
            userRef.set({

                name: response.user.displayName,
                email: response.user.email,
                photo: response.user.photoURL,

            }).then(() => {

                this.el.appContent.css({

                    display: 'flex',
    
                });

            });

        }).catch(err => {

            console.error(err);

        });

    } //fechando o initAuth()

    loadElements() { //carrega os elementos html do documento

        this.el = {};
        document.querySelectorAll('[id]').forEach(element => {

            this.el[Format.getCamelCase(element.id)] = element;

        });

    } //fechando o loadElements()

    elementsPrototype() {

        Element.prototype.hide = function() { //para criar uma função dentro do elemento chamado

            this.style.display = 'none'; //esconde o elemento
            return this;

        }
        Element.prototype.show = function() { //mostra o elemeto

            this.style.display = 'block';
            return this;

        }
        Element.prototype.toggle = function() { //alterna a visualização do elemento

            this.style.display = (this.style.display === 'none')? 'block' : 'none';
            return this;

        }
        Element.prototype.on = function(events, fn) { //para ativar eventos no elemento

            events.split(' ').forEach(event => { //para separar os eventos passados e tratar

                this.addEventListener(event, fn); //no escopo da chamada do prototype do element, adiciona uma escuta do evento passado com a função passada

            }); 
            return this;

        }
        Element.prototype.css = function(styles) {

            for (let name in styles) {

                this.style[name] = styles[name]; //this.style.name = styles.name sendo styles um objeto contendo os estilos a serem mudados com um valor dentro de cada

            }
            return this;

        }
        Element.prototype.addClass = function(name) { //para adicionar uma classe ao elemento

            this.classList.add(name);
            return this;

        }
        Element.prototype.removeClass = function(name) { //remover classe do elemento

            this.classList.remove(name);
            return this;

        }
        Element.prototype.toggleClass = function(name) { //alternar a classe

            this.classList.toggle(name);
            return this;

        }
        Element.prototype.hasClass = function(name) { //verifica se possui a classe

            return this.classList.contains(name);

        }
        HTMLFormElement.prototype.getForm = function() { //retorna um formulário HTML preenchido com os dados do objeto
            //método para elementos que herdam a classe HTMLFormElement
            return new FormData(this);

        }
        HTMLFormElement.prototype.toJSON = function() { //retorna um JSON preenchido com os dados do formulário do objeto
            //método para elementos que herdam a classe HTMLFormElement
            let json = {};
            this.getForm().forEach((value, key) => { //para cada campo com chave do formulário

                json[key] = value;

            });
            return json;

        }

    } //fechando o elementsPrototype()

    initEvents() { //coloca as escutas selecionadas nos elementos selecionados com devidas funções

        this.el.myPhoto.on('click', e => {

            this.closeAllLeftPanels();
            this.el.panelEditProfile.show();
            setTimeout(() => { //espera 300 ms para abrir a classe para poder ocorrer o efeito deslizanate

                this.el.panelEditProfile.addClass('open');

            }, 300);
            
        });
        this.el.btnNewContact.on('click', e => {

            this.closeAllLeftPanels();
            this.el.panelAddContact.show();
            setTimeout(() => { //espera 300 ms para abrir a classe para poder ocorrer o efeito deslizanate

                this.el.panelAddContact.addClass('open');

            }, 300);

        });
        this.el.btnClosePanelEditProfile.on('click', e => {

            this.el.panelEditProfile.removeClass('open');

        });
        this.el.btnClosePanelAddContact.on('click', e => { //até aqui so abre e fecha os painéis de editar contato e perfil

            this.el.panelAddContact.removeClass('open');

        });
        this.el.photoContainerEditProfile.on('click', e => { //para poder editar a foto do perfil

            this.el.inputProfilePhoto.click();

        });
        this.el.inputNamePanelEditProfile.on('keypress', e => {  //editar o nome do perfil

            if (e.key === 'Enter') { //se apertar enter enquanto digita

                e.preventDefault();
                this.el.btnSavePanelEditProfile.click(); //para salvar as alterações na profile

            }

        });

        this.el.btnSavePanelEditProfile.on('click', e => { //botão de salvar perfil

            console.log(this.el.inputNamePanelEditProfile.innerHTML);

        });

        this.el.formPanelAddContact.on('submit', e=> { //adicionar novo contato

            e.preventDefault();
            let formData = new FormData(this.el.formPanelAddContact);

        });
        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => { //para cada contato na lista de contatos

            item.on('click', e => { //se clicar em um contato

                this.el.home.hide(); //para esconder a tela inicial
                this.el.main.css({ //para mostrar a conversa com o contato

                    display: 'flex',

                });

            });

        });
        this.el.btnAttach.on('click', e => {

            e.stopPropagation();
            this.el.menuAttach.addClass('open'); //para abrir o menu de anexar arquivos
            document.addEventListener('click', this.closeMenuAttach.bind(this));

        });
        this.el.btnAttachPhoto.on('click', e=> {

            this.el.inputPhoto.click();

        });
        this.el.inputPhoto.on('change', e => {

            [...this.el.inputPhoto.files].forEach(file => {

                

            });

        });
        this.el.btnAttachCamera.on('click', e => {

            this.closeAllMainPanel();
            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({

                'height': 'calc(100%)', 

            });
            this._camera = new CameraController(this.el.videoCamera);

        });
        this.el.btnClosePanelCamera.on('click', e => {

            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();
            this._camera.stop();

        });
        this.el.btnTakePicture.on('click', e => {

            let dataURL = this._camera.takePicture(); //para tirar a foto
            this.el.pictureCamera.src = dataURL;
            this.el.videoCamera.hide();
            this.el.pictureCamera.show();
            this.el.btnReshootPanelCamera.show();
            this.el.containerTakePicture.hide();
            this.el.containerSendPicture.show();

        });
        this.el.btnReshootPanelCamera.on('click', e => {

            this.el.videoCamera.show();
            this.el.pictureCamera.hide();
            this.el.btnReshootPanelCamera.hide();
            this.el.containerTakePicture.show();
            this.el.containerSendPicture.hide();

        });
        this.el.btnSendPicture.on('click', e => {

            console.log(this.el.pictureCamera.src);

        });
        this.el.btnAttachDocument.on('click', e => {

            this.closeAllMainPanel();
            this.el.panelDocumentPreview.addClass('open');
            this.el.panelDocumentPreview.css({

                'height': 'calc(100%)', 

            });
            this.el.inputDocument.click();

        });
        this.el.inputDocument.on('change', e => {

            if (this.el.inputDocument.files.length > 0) {

                let file = this.el.inputDocument.files[0];
                this._documentPreviewController = new DocumentPreviewController(file);
                this._documentPreviewController.getPreviewData().then(result => {
                
                    this.el.imgPanelDocumentPreview.src = result.src;
                    this.el.infoPanelDocumentPreview.innerHTML = result.info;
                    this.el.filePanelDocumentPreview.hide();
                    this.el.imagePanelDocumentPreview.show();
                    this.el.panelDocumentPreview.css({

                        'height': 'calc(100%)', 
        
                    });

                }).catch(err => {

                    this.el.panelDocumentPreview.css({

                        'height': 'calc(100%)', 
        
                    });
                    switch (file.type) {
    
                        case 'application/vnd.ms-excel':
                        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-xls';
                            break;
                        case 'application/vnd.ms-powerpoint':
                        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-ppt';
                            break;
                        case 'application/msword':
                        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-doc';
                            break;
                        default:
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-generic';
                            break;

                    }
                    this.el.filenamePanelDocumentPreview.innerHTML = file.name;
                    this.el.filePanelDocumentPreview.show();
                    this.el.imagePanelDocumentPreview.hide();

                });

            }

        });
        this.el.btnClosePanelDocumentPreview.on('click', e => {

            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();

        });
        this.el.btnSendDocument.on('click', e => {

            console.log('enviar documento');

        });
        this.el.btnAttachContact.on('click', e => {

            this.el.modalContacts.show();

        });
        this.el.btnCloseModalContacts.on('click', e => {

            this.el.modalContacts.hide();

        });
        this.el.btnSendMicrophone.on('click', e => {

            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();
            this._microphoneController = new MicrophoneController();
            this._microphoneController.on('ready', audio => { //evento que acontece quando está pronto para começar a gravar

                this._microphoneController.startRecorder(); // começa a gravar

            });
            this._microphoneController.on('recordtimer', timer => {

                this.el.recordMicrophoneTimer.innerHTML = Format.toTime(timer);

            });

        });
        this.el.btnCancelMicrophone.on('click', e => {

            this._microphoneController.stopRecorder();
            this.closeRecordMicrophone();

        });
        this.el.btnFinishMicrophone.on('click', e => {

            this._microphoneController.stopRecorder();
            this.closeRecordMicrophone();

        });
        this.el.inputText.on('keypress', e => { //se não estiver com a tecla ctrl pressionada ao pressionar enter, envia a mensagem

            if (e.key === 'Enter' && !e.shiftKey) {

                e.preventDefault();
                this.el.btnSend.click();

            }

        });
        this.el.inputText.on('keyup', e => {

            if (this.el.inputText.innerHTML.length > 0) {

                this.el.inputPlaceholder.hide(); //para esconder o texto 'digite uma mensagem'
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();

            } else {

                this.el.btnSend.hide();
                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();

            }

        });
        this.el.btnSend.on('click', e => {

            console.log(this.el.inputText.innerHTML);

        });
        this.el.btnEmojis.on('click', e => {

            this.el.panelEmojis.toggleClass('open');

        });
        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji => {

            emoji.on('click', e => { //código para inserir emoji na mensagem

                let img = this.el.imgEmojiDefault.cloneNode();
                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.unicode;
                img.alt = emoji.dataset.unicode;
                emoji.classList.forEach(name => {

                    img.addClass(name);

                });
                let cursor = window.getSelection(); //pega a seleção atual de texto do cursor
                if (!cursor.focusNode || !cursor.focusNode.id == 'id-text') { //para verificar se o cursor está sobre o texto

                    this.el.inputText.focus();
                    cursor = window.getSelection(); //pega a seleção atual de texto

                }
                let range = document.createRange(); //para criar uma extensão de seleção
                range = cursor.getRangeAt(0); //pega o início de seleção no cursor
                range.deleteContents(); //para deletar os valores dentro do alcance da seleção
                let frag = document.createDocumentFragment(); 
                frag.appendChild(img); //coloca o emoji no fragmento de documento
                range.insertNode(frag); //insere o fragmento na seleção
                range.setStartAfter(img);
                this.el.inputText.dispatchEvent(new Event('keyup')); //para esconder o texto de fundo

            });

        });

    } //fechando o initEvents()

    closeRecordMicrophone() { //método para finalizar a gravação do microfone

        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();

    } //fechando o closeRecordMicrophone()

    closeAllMainPanel() { //para fechar todos os paineis na conversa

        this.el.panelMessagesContainer.hide();
        this.el.panelDocumentPreview.removeClass('open');
        this.el.panelCamera.removeClass('open');

    } //fechando o closeAllMainPanel()

    closeMenuAttach(e) { //função para fechar o menu de anexar arquivos

        document.removeEventListener('click', this.closeMenuAttach);
        this.el.menuAttach.removeClass('open');

    } //fechando o closeMenuAttach()

    closeAllLeftPanels() { //para fechar os painéis do lado esquerdo

        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();

    } //fechando o closeAllLeftPanels()

} //fechando a classe WhatsAppController