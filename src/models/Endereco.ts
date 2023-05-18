import {Model, DataTypes} from'sequelize'
import {sequelize} from '../configs/mysql'

export interface EnderecoInstance extends Model{
    codigo: number,
    rua: string,
    numero: string,
    bairro: string,
    cep: string,
    cod_estacao: number
}

export const Endereco = sequelize.define<EnderecoInstance>('Endereco, ', {
    codigo:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    rua:{
        type: DataTypes.STRING,
        allowNull: false
    },
    numero:{
        type: DataTypes.STRING,
        allowNull: false
    },
    bairro:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cep:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cod_estacao:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'Estacao',
            key: 'codigo'
        }
    }
},{
    tableName: 'tb_enderecos',
    timestamps: false
})
