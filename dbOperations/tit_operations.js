var config = require('../dbconfig');
const sql = require('mssql');


async function getTitulo() {
    try {
        let pool = await sql.connect(config);
        let titulos = await pool.request().query("SELECT * FROM titulo");
        return titulos.recordsets;

    }
    catch (error) {
        console.log(error);
    }

    
}


async function getTituloById(tit_numero) {
    try {
        let pool = await sql.connect(config);
        let titulos = await pool.request()
            .input('input_parameter', sql.Int, tit_numero)
            .query("SELECT * FROM titulo WHERE tit_numero = @input_parameter");
        return titulos.recordsets;

    }
    catch (error) {
        console.log(error);
    }

}

async function addTitulo(titulo) {
    try {
        let pool = await sql.connect(config);
        let insertTitulo = await pool.request()
            //.input('tit_numero', sql.Int, titulo.tit_numero)
            .input('tit_descricao', sql.VarChar(100), titulo.tit_descricao)
            .query("INSERT INTO titulo ( tit_descricao ) VALUES ( @tit_descricao )");
            //.execute('insertTitulos');

        return insertTitulo.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function updateTitulo(titulo) {
    try {
        let pool = await sql.connect(config);   
        let updateTitulo = await pool.request()
            .input('tit_numero', sql.Int, titulo.tit_numero)
            .input('tit_descricao', sql.VarChar(100), titulo.tit_descricao)
            .query("UPDATE titulo SET tit_descricao = @tit_descricao WHERE tit_numero = @tit_numero");
            //.execute('updateTitulos');

        return updateTitulo.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteTitulo(tit_numero) {
    try {
        let pool = await sql.connect(config);   
        let deleteTitulo = await pool.request()
            .input('tit_numero', sql.Int, tit_numero)
            .query("DELETE FROM titulo WHERE tit_numero = @tit_numero");
            //.execute('deleteTitulos');

        return deleteTitulo.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}




module.exports = {
    getTitulo: getTitulo,
    getTituloById: getTituloById,
    addTitulo: addTitulo,
    updateTitulo: updateTitulo,
    deleteTitulo: deleteTitulo
}