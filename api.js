var Db = require('./dbOperations/cli_operations');
var Cliente = require('./dbtables/cliente');
var Titulo = require( './dbTables/titulo');
var Periodo_aquisitivo = require('./dbtables/periodo_aquisitivo.js');
var Lancamento_titulo = require('./dbtables/lancamento_titulo.js');

const dboperations = require('./dbOperations/cli_operations');
const lti_db_operations = require('./dbOperations/lti_operations.js');
const tit_db_operations = require('./dbOperations/tit_operations.js');
const paq_db_operations = require('./dbOperations/paq_operations.js');

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

// Rota Cliente
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


//////////////periodo_aquisitivo////////////////////

// Rota Periodo_Aquisitivo
router.route('/periodo_aquisitivo').get((request, response) => {
    
    paq_db_operations.getperiodoAquisitivo().then(result => {
        response.json(result[0]);

    }).catch(err => {
        response.send(err);
    });
});

router.route('/periodo_aquisitivo/:paq_codigo').get((request, response) => {
    
    paq_db_operations.getPeriodoAquisitivoById(request.params.paq_codigo).then(result => {
        response.json(result[0]);   
    })

});


router.route('/periodo_aquisitivo').post((request, response) => {
    
    let periodo_aquisitivo = {...request.body};

    paq_db_operations.addPeriodoAquisitivo(periodo_aquisitivo).then(result => {
        response.status(201).json(result);   
    })

});

router.route('/periodo_aquisitivo/:paq_codigo').put((request, response) => {
    
    let periodo_aquisitivo = {...request.body};    
    paq_db_operations.updatePeriodoAquisitivo(periodo_aquisitivo).then(result => {
        response.json(result);   
    })
});

router.route('/periodo_aquisitivo/:paq_codigo').delete((request, response) => {    
    paq_db_operations.deletePeriodoAquisitivo(request.params.paq_codigo).then(result => {
        response.json(result);
    })
});

// Rota Titulo

router.route('/titulo').get((request, response) => {
    
    tit_db_operations.getTitulo().then(result => {
        response.json(result[0]);

    }).catch(err => {
        response.send(err);
    });
});

router.route('/titulo/:tit_numero').get((request, response) => {
    
    tit_db_operations.getTituloById(request.params.tit_numero).then(result => {
        response.json(result[0]);   
    })

});


router.route('/titulo').post((request, response) => {
    
    let titulo = {...request.body};

    tit_db_operations.addTitulo(titulo).then(result => {
        response.status(201).json(result);   
    })

});

router.route('/titulo/:tit_numero').put((request, response) => {
    
    let titulo = {...request.body};    
    tit_db_operations.updateTitulo(titulo).then(result => {
        response.json(result);   
    })
});

router.route('/titulo/:tit_numero').delete((request, response) => {    
    tit_db_operations.deleteTitulo(request.params.tit_numero).then(result => {
        response.json(result);
    })
});


// Rota lancamento_titulo

router.route('/lancamento_titulo').get((request, response) => {
    
    lti_db_operations.getLancamentosTitulo().then(result => {
        response.json(result[0]);

    }).catch(err => {
        response.send(err);
    });
});

router.route('/lancamento_titulo/:lti_codigo').get((request, response) => {
    
    lti_db_operations.getLancamentosTituloById(request.params.lti_codigo).then(result => {
        response.json(result[0]);   
    })

});


router.route('/lancamento_titulo').post((request, response) => {
    
    let lancamento_titulo = {...request.body};

    lti_db_operations.addLancamentoTitulo(lancamento_titulo).then(result => {
        response.status(201).json(result);   
    })

});

router.route('/lancamento_titulo/:lti_codigo').put((request, response) => {
    
    let lancamento_titulo = {...request.body};    
    lti_db_operations.updateLancamentoTitulo(lancamento_titulo).then(result => {
        response.json(result);   
    })
});

router.route('/lancamento_titulo/:lti_codigo').delete((request, response) => {    
    lti_db_operations.deleteLancamentoTitulo(request.params.lti_codigo).then(result => {
        response.json(result);
    })
});




//--------------------------------------------------------------------------------------------------
var port = process.env.PORT || 8080;
app.listen(port); 
    console.log("Server is running on port " + port);



