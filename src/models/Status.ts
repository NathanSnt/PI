import {Model, DataTypes} from'sequelize'
import {sequelize} from '../configs/mysql'

export interface StatusInstance extends Model {
    codigo: number
    status_movimentacao: string
    cod_estacao: number
    data_hora: Date
    expiracao: Date
}

export const Status = sequelize.define<StatusInstance>('Status,', {
    codigo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    status_movimentacao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cod_estacao : {
        type: DataTypes.INTEGER,
        references: {
            model: 'Estacao',
            key: 'codigo'
        }
    },
    data_hora: {
        type: DataTypes.DATE,
        allowNull: false
    },
    expiracao: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'tb_status'
})