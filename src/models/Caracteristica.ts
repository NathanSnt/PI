import {Model, DataTypes} from'sequelize'
import {sequelize} from '../configs/mysql'

export interface CaracteristicaInstance extends Model {
    codigo: number,
    nome: string
}

export const Caracteristica = sequelize.define<CaracteristicaInstance>("Caracteristica,", {
    codigo : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tb_caracteristicas',
    timestamps: false
})