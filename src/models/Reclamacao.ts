import {Model, DataTypes} from'sequelize'
import {sequelize} from '../configs/mysql'

export interface ReclamacaoInstance extends Model {
    codigo: number
    data_hora: Date
    tipo: number
    descricao: string
    motivo: string
    numero_carro: number
    cod_usu: number
    cod_estacao: number
    movimentacao: number
}

export const Reclamacao = sequelize.define<ReclamacaoInstance>("Reclamacao,", {
    codigo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    data_hora: {
        type: DataTypes.DATE,
        allowNull: false
    },
    tipo: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    descricao: {
        type: DataTypes.STRING
    },
    motivo: {
        type: DataTypes.STRING
    },
    numero_carro: {
        type: DataTypes.INTEGER
    },
    cod_usu: {
        type:DataTypes.INTEGER,
        references: {
            model: 'Usuario',
            key: 'codigo'
        }
    },
    cod_estacao: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Estacao',
            key: 'codigo'
        }
    },
    movimentacao: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: "tb_reclamacoes",
    timestamps: false
})