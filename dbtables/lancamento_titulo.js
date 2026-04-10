class lancamento_titulo {
    constructor (lti_codigo, lti_data, lti_valor,lti_pago,lti_em_cobranca,lti_observacao,lti_desconsiderado,tde_codigo,tit_numero,paq_codigo) {
        this.lti_codigo = lti_codigo;
        this.lti_data = lti_data;
        this.lti_valor = lti_valor;
        this.lti_pago = lti_pago;
        this.lti_em_cobranca = lti_em_cobranca;
        this.lti_observacao = lti_observacao;
        this.lti_desconsiderado = lti_desconsiderado;
        this.tde_codigo = tde_codigo;
        this.tit_numero = tit_numero;
        this.paq_codigo = paq_codigo;
    }
}

module.exports = lancamento_titulo;