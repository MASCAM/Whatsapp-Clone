class Format {

    static getCamelCase(text) { //para passar o nome dos id's do document para camelCase

        let div = document.createElement('div'); //para poder criar um dataset 
        div.innerHTML = `<div data-${text}="id"></div>` //coloca o texto passado dentro de um elemento HTML
        return Object.keys(div.firstChild.dataset)[0]; //array de chaves dos objetos percorridos

    } //fechando o getCamelCase()

} //fechando a classe Format