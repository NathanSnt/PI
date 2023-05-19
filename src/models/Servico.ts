import {Model, DataTypes} from'sequelize'
import {sequelize} from '../configs/mysql'

//Tabela de relacionamento entre as tabelas estacao, caracteristicas e estados operacionais
export interface ServicoInstance extends Model {
    codigo: number,
    cod_estacao: number,
    cod_caracteristica: number,
    cod_estado_operacional: number
}

export const Servico = sequelize.define<ServicoInstance>('Servico, ',{
    codigo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    cod_estacao:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: 'Estacao',
            key: 'codigo'
        }
    },
    cod_caracteristica:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: 'Caracteristica',
            key: 'codigo'
        }
    },
    cod_estado_operacional:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: 'EstadoOperacional',
            key: 'codigo'
        }
    }
}, {
    tableName: 'tb_estacao_caracteristica_estado_operacional',
    timestamps: false
})