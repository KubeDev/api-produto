var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    category: {type: String, required: true, max: 50},
    price: {type: Number, required: true},
});

module.exports = mongoose.model('Product', ProductSchema);