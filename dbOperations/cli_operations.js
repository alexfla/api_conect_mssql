var config = require('../dbconfig');
const sql = require('mssql');


async function getClients() {
    try {
        let pool = await sql.connect(config);
        let clients = await pool.request().query("SELECT * FROM cliente");
        return clients.recordsets;

    }
    catch (error) {
        console.log(error);
    }

    
}

async function getClientById(cli_codigo) {
    try {
        let pool = await sql.connect(config);
        let clients = await pool.request()
            .input('input_parameter', sql.Int, cli_codigo)
            .query("SELECT * FROM cliente WHERE cli_codigo = @input_parameter");
        return clients.recordsets;

    }
    catch (error) {
        console.log(error);
    }

}

async function addClient(cliente) {
    try {
        let pool = await sql.connect(config);
        let insertCliente = await pool.request()
            //.input('cli_codigo', sql.Int, cliente.cli_codigo)
            .input('cli_nome', sql.VarChar(100), cliente.cli_nome)
            .input('cli_cpf', sql.VarChar(14), cliente.cli_cpf)
            .input('cli_codigo_indicador', sql.Int, cliente.cli_codigo_indicador)
            .query("INSERT INTO cliente ( cli_nome, cli_cpf, cli_codigo_indicador) VALUES ( @cli_nome, @cli_cpf, @cli_codigo_indicador)");
            //.execute('insertClientes');

        return insertCliente.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function updateClient(cliente) {
    try {
        let pool = await sql.connect(config);   
        let updateCliente = await pool.request()
            .input('cli_codigo', sql.Int, cliente.cli_codigo)
            .input('cli_nome', sql.VarChar(100), cliente.cli_nome)
            .input('cli_cpf', sql.VarChar(14), cliente.cli_cpf)
            .input('cli_codigo_indicador', sql.Int, cliente.cli_codigo_indicador)
            .query("UPDATE cliente SET cli_nome = @cli_nome, cli_cpf = @cli_cpf, cli_codigo_indicador = @cli_codigo_indicador WHERE cli_codigo = @cli_codigo");
            //.execute('updateClientes');

        return updateCliente.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteClient(cli_codigo) {
    try {
        let pool = await sql.connect(config);   
        let deleteCliente = await pool.request()
            .input('cli_codigo', sql.Int, cli_codigo)
            .query("DELETE FROM cliente WHERE cli_codigo = @cli_codigo");
            //.execute('deleteClientes');

        return deleteCliente.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}



module.exports = {
    getClients: getClients,
    getClientById: getClientById,
    addClient: addClient,
    updateClient: updateClient,
    deleteClient: deleteClient

}
