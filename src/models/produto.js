var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProdutoSchema = new Schema({
    nome: {type: String, required: true, max: 100},
    categoria: {type: String, required: true, max: 50},
    preco: {type: Number, required: true},
});

module.exports = mongoose.model('Produto', ProdutoSchema);