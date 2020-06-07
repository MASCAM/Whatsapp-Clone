const path = require('path');

module.exports = { //para exportaar o json

    entry: {

        app: './src/app.js',
        'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry.js' //para passar o pdf.worker para o bundle rodando em paralelo com a aplicação
    
    }, //arquivo de entrada (topo na hierarquia)
    output: { //output do bundle criado

        filename: '[name].bundle.js', //nome do arquivo final dos bundles criados com a chave de entrada
        path: path.join(__dirname, 'dist'), //passando o caminho a partir do diretorio do pdf worker
        publicPath: 'dist', //pasta de acesso final

    }

}