var Db = require('./dbOperations');
var Cliente = require('./cliente');
const dboperations = require('./dbOperations');
//const sql = require('mssql');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
    console.log('Middleware');
    next();
});

router.route('/cliente').get((request, response) => {
    
    dboperations.getClients().then(result => {
        response.json(result[0]);

    }).catch(err => {
        response.send(err);
    });
});

router.route('/cliente/:cli_codigo').get((request, response) => {
    
    dboperations.getClientById(request.params.cli_codigo).then(result => {
        response.json(result[0]);   
    })

});


router.route('/cliente').post((request, response) => {
    
    let cliente = {...request.body};

    dboperations.addClient(cliente).then(result => {
        response.status(201).json(result);   
    })

});

router.route('/cliente/:cli_codigo').put((request, response) => {
    
    let cliente = {...request.body};    
    dboperations.updateClient(cliente).then(result => {
        response.json(result);   
    })
});

router.route('/cliente/:cli_codigo').delete((request, response) => {    
    dboperations.deleteClient(request.params.cli_codigo).then(result => {
        response.json(result);
    })
});





var port = process.env.PORT || 8080;
app.listen(port); 
    console.log("Server is running on port " + port);



