import {Model, DataTypes} from'sequelize'
import {sequelize} from '../configs/mysql'

export interface DenunciaInstance extends Model {
    codigo: number
    cod_reclamacao: number
    cod_usuario: number
}

export const Denuncia = sequelize.define<DenunciaInstance>('Denuncia, ', {
    codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cod_reclamacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Reclamacao',
            key: 'codigo'
        }
    },
    cod_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: 'Usuario',
            key: 'codigo'
        }
    }
}, {
    tableName: 'tb_denuncias',
    timestamps: false,
    paranoid: true,
    deletedAt: 'horarioDeletado'
})