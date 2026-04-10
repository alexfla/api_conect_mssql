var config = require('../dbconfig');
const sql = require('mssql');


async function getLancamentosTitulo() {
    try {
        let pool = await sql.connect(config);
        let lancamentoTitulos = await pool.request().query("SELECT * FROM lancamento_titulo");
        return lancamentoTitulos.recordsets;

    }
    catch (error) {
        console.log(error);
    }

    
}


async function getLancamentosTitulosById(lti_codigo) {
    try {
        let pool = await sql.connect(config);
        let lancamentoTitulo = await pool.request()
            .input('input_parameter', sql.Int, lti_codigo)
            .query("SELECT * FROM lancamento_titulo WHERE lti_codigo = @input_parameter");
        return lancamentoTitulo.recordsets;

    }
    catch (error) {
        console.log(error);
    }

}

async function addLancamentosTitulo(lancamentoTitulo) {
    try {
        let pool = await sql.connect(config);
        let insertLancamentoTitulo = await pool.request()
            //.input('paq_codigo', sql.Int, lancamentoTitulo.paq_codigo)
            .input('paq_descricao', sql.VarChar(100), lancamentoTitulo.paq_descricao)
            .input('cli_cpf', sql.VarChar(14), lancamentoTitulo.cli_cpf)
            .input('cli_codigo_indicador', sql.Int, lancamentoTitulo.cli_codigo_indicador)
            .query("INSERT INTO lancamento_titulo ( paq_descricao, cli_cpf, cli_codigo_indicador) VALUES ( @paq_descricao, @cli_cpf, @cli_codigo_indicador)");
            //.execute('insertLancamentoTitulos');

        return insertLancamentoTitulo.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function updateLancamentosTitulo(lancamentoTitulo) {
    try {
        let pool = await sql.connect(config);   
        let updateLancamentoTitulo = await pool.request()
            .input('paq_codigo', sql.Int, lancamentoTitulo.paq_codigo)
            .input('paq_descricao', sql.VarChar(100), lancamentoTitulo.paq_descricao)
            .input('cli_cpf', sql.VarChar(14), lancamentoTitulo.cli_cpf)
            .input('cli_codigo_indicador', sql.Int, lancamentoTitulo.cli_codigo_indicador)
            .query("UPDATE lancamento_titulo SET paq_descricao = @paq_descricao, cli_cpf = @cli_cpf, cli_codigo_indicador = @cli_codigo_indicador WHERE paq_codigo = @paq_codigo");
            //.execute('updateLancamentoTitulos');

        return updateLancamentoTitulo.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteLancamentosTitulo(lti_codigo) {
    try {
        let pool = await sql.connect(config);   
        let deleteLancamentoTitulo = await pool.request()
            .input('lti_codigo', sql.Int, lti_codigo)
            .query("DELETE FROM lancamento_titulo WHERE lti_codigo = @lti_codigo");
            //.execute('deleteLancamentoTitulos');

        return deleteLancamentoTitulo.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    getLancamentosTitulo: getLancamentosTitulo,
    getLancamentoTituloById: getLancamentosTitulosById,
    addLancamentoTitulo: addLancamentosTitulo,
    updateLancamentoTitulo: updateLancamentosTitulo,
    deleteLancamentoTitulo: deleteLancamentosTitulo
}