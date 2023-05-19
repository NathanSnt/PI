import {Model, DataTypes} from'sequelize'
import {sequelize} from '../configs/mysql'

export interface EstacaoInstance extends Model {
    codigo : number,
    nome : string,
}

export const Estacao = sequelize.define<EstacaoInstance>("Estacao,", {
    codigo : {
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nome : {
        allowNull: false,
        type:DataTypes.STRING
    }
}, {
    tableName: 'tb_estacoes',
    timestamps: false
})