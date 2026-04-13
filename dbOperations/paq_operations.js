var config = require('../dbconfig');
const sql = require('mssql');


async function getperiodoAquisitivo() {
    try {
        let pool = await sql.connect(config);
        let periodoAquisitivo = await pool.request().query("SELECT * FROM periodo_aquisitivo");
        return periodoAquisitivo.recordsets;

    }
    catch (error) {
        console.log(error);
    }

    
}


async function getperiodoAquisitivoById(paq_codigo) {
    try {
        let pool = await sql.connect(config);
        let periodoAquisitivo = await pool.request()
            .input('input_parameter', sql.Int, paq_codigo)
            .query("SELECT * FROM periodo_aquisitivo WHERE paq_codigo = @input_parameter");
        return periodoAquisitivo.recordsets;

    }
    catch (error) {
        console.log(error);
    }

}

async function addperiodoAquisitivo(periodoAquisitivo) {
    try {
        let pool = await sql.connect(config);
        let insertPeriodoAquisitivo = await pool.request()
            //.input('paq_codigo', sql.Int, periodoAquisitivo.paq_codigo)
            .input('paq_descricao', sql.VarChar(100), periodoAquisitivo.paq_descricao)
            .input('cli_cpf', sql.VarChar(14), periodoAquisitivo.cli_cpf)
            .input('cli_codigo_indicador', sql.Int, periodoAquisitivo.cli_codigo_indicador)
            .query("INSERT INTO periodo_aquisitivo ( paq_descricao, cli_cpf, cli_codigo_indicador) VALUES ( @paq_descricao, @cli_cpf, @cli_codigo_indicador)");
            //.execute('insertPeriodoAquisitivo');

        return insertPeriodoAquisitivo.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function updateperiodoAquisitivo(periodoAquisitivo) {
    try {
        let pool = await sql.connect(config);   
        let updatePeriodoAquisitivo = await pool.request()
            .input('paq_codigo', sql.Int, periodoAquisitivo.paq_codigo)
            .input('paq_descricao', sql.VarChar(100), periodoAquisitivo.paq_descricao)
            .input('cli_cpf', sql.VarChar(14), periodoAquisitivo.cli_cpf)
            .input('cli_codigo_indicador', sql.Int, periodoAquisitivo.cli_codigo_indicador)
            .query("UPDATE periodo_aquisitivo SET paq_descricao = @paq_descricao, cli_cpf = @cli_cpf, cli_codigo_indicador = @cli_codigo_indicador WHERE paq_codigo = @paq_codigo");
            //.execute('updatePeriodoAquisitivo');

        return updatePeriodoAquisitivo.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteperiodoAquisitivo(paq_codigo) {
    try {
        let pool = await sql.connect(config);   
        let deletePeriodoAquisitivo = await pool.request()
            .input('paq_codigo', sql.Int, paq_codigo)
            .query("DELETE FROM periodo_aquisitivo WHERE paq_codigo = @paq_codigo");
            //.execute('deletePeriodoAquisitivo');

        return deletePeriodoAquisitivo.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getperiodoAquisitivo: getperiodoAquisitivo,
    getperiodoAquisitivoById: getperiodoAquisitivoById,
    addPeriodoAquisitivo: addperiodoAquisitivo,
    updatePeriodoAquisitivo: updateperiodoAquisitivo,
    deletePeriodoAquisitivo: deleteperiodoAquisitivo
}