import {Model, DataTypes} from'sequelize'
import {sequelize} from '../conn/mysql'

export interface EstacaoInstance extends Model {
    cod_estacao : number,
    nome_estacao : string,
    localizacao : string,
    banheiro : string,
    elevador : string,
    terminal_interurbano : string,
    terminal_urbano : string,
    transferencia_interna : string,
    bicicletario : string,
    banheiro_acessivel : string,
    estacao_acessivel : string,
    rampa : string,
    transposicao_plataformas : string,
    escadas_rolantes : string,
    acesso_elevador : string,
    lanchonete : string,
    emporio : string,
    caixa_eletronico : string,
    calcados : string,
    telefone_p_surdos : string,
    piso_tatil : string,
    transferencia_gratuita : string,
    acessorios : string,
    farmacia : string,
    rota_acessivel : string,
    achados_perdidos : string
}

export const Estacao = sequelize.define<EstacaoInstance>("Estacao,", {
    cod_estacao : {
        primaryKey: true,
        type:DataTypes.INTEGER
    },
    nome_estacao : {
        type:DataTypes.STRING
    },
    localizacao : {
        type:DataTypes.STRING
    },
    banheiro : {
        type:DataTypes.STRING
    },
    elevador : {
        type:DataTypes.STRING
    },
    terminal_interurbano : {
        type:DataTypes.STRING
    },
    terminal_urbano : {
        type:DataTypes.STRING
    },
    transferencia_interna : {
        type:DataTypes.STRING
    },
    bicicletario : {
        type:DataTypes.STRING
    },
    banheiro_acessivel : {
        type:DataTypes.STRING
    },
    estacao_acessivel : {
        type:DataTypes.STRING
    },
    rampa : {
        type:DataTypes.STRING
    },
    transposicao_plataformas : {
        type:DataTypes.STRING
    },
    escadas_rolantes : {
        type:DataTypes.STRING
    },
    acesso_elevador : {
        type:DataTypes.STRING
    },
    lanchonete : {
        type:DataTypes.STRING
    },
    emporio : {
        type:DataTypes.STRING
    },
    caixa_eletronico : {
        type:DataTypes.STRING
    },
    calcados : {
        type:DataTypes.STRING
    },
    telefone_p_surdos : {
        type:DataTypes.STRING
    },
    piso_tatil : {
        type:DataTypes.STRING
    },
    transferencia_gratuita : {
        type:DataTypes.STRING
    },
    acessorios : {
        type:DataTypes.STRING
    },
    farmacia : {
        type:DataTypes.STRING
    },
    rota_acessivel : {
        type:DataTypes.STRING
    },
    achados_perdidos : {
        type:DataTypes.STRING
    }
}, {
    tableName: 'tb_estacoes',
    timestamps: false
})