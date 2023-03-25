import {Model, DataTypes} from'sequelize'
import {sequelize} from '../conn/mysql'

export interface AvaliacaoInstance extends Model {
    codigo: number
    avaliacao: number
    cod_usu: number
}

export const Avaliacao = sequelize.define<AvaliacaoInstance>('Avaliacao,', {
    codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    avaliacao: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cod_usu: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuario',
            key: 'codigo'
        }
    }
}, {
    tableName: 'tb_avaliacoes',
    timestamps: false
})