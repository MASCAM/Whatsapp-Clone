const path = require('path');

module.exports = { //para exportaar o json

    entry: './src/app.js', //arquivo de entrada (topo na hierarquia)
    output: { //output do bundle criado

        filename: 'bundle.js', //nome do arquivo final do bundle criado
        path: path.resolve(__dirname, '/dist'), //passando o caminho a partir do diretorio atual na pasta dist
        publicPath: 'dist', //pasta de acesso final

    }

}