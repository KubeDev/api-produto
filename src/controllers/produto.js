var Product = require('../models/produto');
var os = require('os');

exports.productCreate = function (req, res) {
    var product = new Product(
        {
            nome: req.body.nome,
            preco: req.body.preco,
            categoria: req.body.categoria
        }
    );

    product.save(function (err, productResult) {
        
        if (err) {
            res.statusCode = 404;
            return res.json(err);
        }

        res.statusCode = 201;
        res.json(productResult)
    })
};

exports.productDetails = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        
        if (err) {
            res.statusCode = 404;
            return res.json(err);
        }
        res.json(product);
    })
};

exports.productAll = function (req, res) {
    Product.find({}, function (err, product) {
        
        if (err) {
            res.statusCode = 500;
            return res.json(err);
        }       

        var retu = { product, machine: os.hostname(), version: "3.0" };

        res.json(retu);
    })
};

exports.productUpdate = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        
        if (err) {
            res.statusCode = 404;
            return res.json(err);
        }
        res.statusCode = 204;
        res.send('');
    });
};

exports.productDelete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
                
        if (err) {
            res.statusCode = 404;
            return res.json(err);
        }
        res.statusCode = 204;
        res.send('');
    })
};