class WhatsAppController {

    constructor() {

        //carrega os métodos customizados para os elementos do documento
        this.elementsPrototype();

        //carrega os id's dos elementos do document
        this.loadElements();

        //iniciar as escutas de eventos nos elementos
        this.initEvents();

    } //fechando o constructor()

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

        });
        this.el.btnClosePanelCamera.on('click', e => {

            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();

        });
        this.el.btnTakePicture.on('click', e => {

            console.log('tirar foto');

        });
        this.el.btnAttachDocument.on('click', e => {

            this.closeAllMainPanel();
            this.el.panelDocumentPreview.addClass('open');
            this.el.panelDocumentPreview.css({

                'height': 'calc(100%)', 

            });

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
            this.startRecordMicrophoneTime();

        });
        this.el.btnCancelMicrophone.on('click', e => {

            this.closeRecordMicrophone();

        });
        this.el.btnFinishMicrophone.on('click', e => {

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
                this.el.inputText.appendChild(img);
                this.el.inputText.dispatchEvent(new Event('keyup')); //para esconder o texto de fundo

            });

        });

    } //fechando o initEvents()

    startRecordMicrophoneTime() { //método para iniciar a medida do tempo de gravação

        let start = Date.now();
        this._recordMicrophoneInterval = setInterval(() => {

            this.el.recordMicrophoneTimer.innerHTML = Format.toTime(Date.now() - start);

        }, 100);

    } //fechando o startRecordMicrophoneTime()

    closeRecordMicrophone() { //método para finalizar a gravação do microfone

        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
        clearInterval(this._recordMicrophoneInterval);

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