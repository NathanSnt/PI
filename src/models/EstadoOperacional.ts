import {Model, DataTypes} from'sequelize'
import {sequelize} from '../configs/mysql'

export interface EstadoOperacionalInstance extends Model {
    codigo: number,
    estado: string
}

export const EstadoOperacional = sequelize.define<EstadoOperacionalInstance>("EstadoOperacional,", {
    codigo : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    estado : {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tb_estados_operacionais',
    timestamps: false
})