class WhatsAppController {

    constructor() {

        console.log('WhatsAppController OK');

        //carrega 
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

    } //fechando o initEvents()

    closeAllLeftPanels() { //para fechar os painéis do lado esquerdo

        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();

    } //fechando o closeAllLeftPanels()

} //fechando a classe WhatsAppController