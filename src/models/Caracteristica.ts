import {Model, DataTypes} from'sequelize'
import {sequelize} from '../configs/mysql'

export interface CaracteristicaInstance extends Model {
    codigo: number,
    tipo: string, 
    cod_estado: number,
    cod_estacao: number
}

export const Caracteristica = sequelize.define<CaracteristicaInstance>("Caracteristica,", {
    codigo : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cod_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'EstadoOperacional',
            key: 'codigo'
        }
    },
    cod_estacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Estacao',
            key: 'codigo'
        }
    }
}, {
    tableName: 'tb_caracteristicas',
    timestamps: false
})