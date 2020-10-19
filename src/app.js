const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const product = require('./routes/produto');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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

app.use('/api/produto', product);

var developer_db_url = 'mongodb://mongouser:mongopwd@localhost:27017/admin';
var mongoUrl = process.env.MONGODB_URI || developer_db_url;

mongoose.Promise = global.Promise;

var port = 8080;

app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port);
});
