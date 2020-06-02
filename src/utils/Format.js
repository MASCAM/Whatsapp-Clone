class Format {

    static getCamelCase(text) { //para passar o nome dos id's do document para camelCase

        let div = document.createElement('div'); //para poder criar um dataset 
        div.innerHTML = `<div data-${text}="id"></div>` //coloca o texto passado dentro de um elemento HTML
        return Object.keys(div.firstChild.dataset)[0]; //array de chaves dos objetos percorridos

    } //fechando o getCamelCase()

    static toTime(duration) { //formatação de tempo

        let seconds = parseInt((duration / 1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);
        if (hours > 0) {

            return `${hours}:${minutes}:${seconds.toString().padStart(2, '0')}`;

        } else {

            return `${minutes}:${seconds.toString().padStart(2, '0')}`;

        }

    } //fechando o toTime()

} //fechando a classe Format