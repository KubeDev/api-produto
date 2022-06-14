const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const product = require('./routes/produto');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const NodeHog = require('nodehog');
const config = require('./config/system-life');
const promBundle = require("express-prom-bundle");

const metricsMiddleware = promBundle({ 
        includeMethod: true, 
        includePath: true, 
        customLabels: 
            { 
                project_version: '1.0' 
            } 
    });

app.use(metricsMiddleware);
app.use(config.middlewares.healthMid);
app.use('/', config.routers);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const serverStatus = () => {
    return {
        state: 'up',
        dbState: mongoose.STATES[mongoose.connection.readyState]
    }
};

app.get('/health', (res, req) => {
    let healthResult = serverStatus();
    if (mongoose.connection.readyState == 0) {
        req.statusCode = 500;
        req.send('down');
    } else {
        req.json(healthResult);
    }
});

app.put('/stress/:elemento/tempostress/:tempoStress/intervalo/:intervalo/ciclos/:ciclos', (req, res) => {

    const elemento = req.params.elemento;
    const tempoStress = req.params.tempoStress * 1000;
    const tempoFolga = req.params.tempoFolga * 1000;
    const ciclos = req.params.ciclos;
    new NodeHog(elemento, tempoStress, tempoFolga, ciclos).start();
    res.send("OK");
});

app.use('/api/produto', product);

var developer_db_url = 'mongodb://mongouser:mongopwd@mongodb:27017/admin';
var mongoUrl = process.env.MONGODB_URI || developer_db_url;

mongoose.Promise = global.Promise;

var connectWithRetry = function () {
    return mongoose.connect(mongoUrl, function (err) {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
            setTimeout(connectWithRetry, 5000);
        }
    });
};

connectWithRetry();

var port = process.env.SERVER_PORT || 8080;

app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port);
});
