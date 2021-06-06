const express = require('express');
const app = express();
const config = require("./config/config");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const cors = require('cors');
const bodyParser = require('body-parser');

// including modules
const userModule = require("./v1/userModule");

app.options('*' , cors())
app.use(cors());

// Configure bodyparser to handle post requests
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '500mb'
}));

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', function(req, res){
    res.send("=====working========");
});


app.post('/users/create', function(req, res){
    userModule._createUser(req, function(response){
        res.send(response);
    });    
});

app.get('/users/list', function(req, res){
    userModule._getUsersList(req, function(response){
        res.send(response);
    });    
});

app.put('/users/update', function(req, res){
    userModule._updateUserAccount(req, function(response){
        res.send(response);
    });
});

app.delete('/users/delete', function(req, res){
    userModule._deleteUserAccount(req, function(response){
        res.send(response);
    });
});

app.listen(config.port, () => {
    console.log(`Example app listening at http://localhost:${config.port}`)
})