import {Model, DataTypes} from'sequelize'
import {sequelize} from '../conn/mysql'

export interface StatusInstance extends Model {
    codigo: number
    descricao: string
    data_hora: Date
}

export const Status = sequelize.define<StatusInstance>('Status,', {
    codigo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_hora: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'tb_status',
    timestamps: false
})