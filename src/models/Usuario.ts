import {Model, DataTypes} from'sequelize'
import {sequelize} from '../conn/mysql'

export interface UsuarioInstance extends Model{
    codigo:number,
    nome:string,
    senha:string
    email:string
    cpf:string
    data_cadastro:Date
}

export const Usuario = sequelize.define<UsuarioInstance>("Usuario,",{

    codigo:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false
    },
    nome:{
        allowNull: false,
        type:DataTypes.STRING
    },
    senha:{
        allowNull: false,
        type:DataTypes.STRING
    },
    email:{
        allowNull: false,
        type:DataTypes.STRING
    },
    cpf:{
        allowNull: false,
        type:DataTypes.STRING
    },
    data_cadastro:{
        allowNull: false,
        type:DataTypes.DATE
    },
},{
    tableName:'tb_usuarios',
    timestamps:false
})
