import {Model, DataTypes} from'sequelize'
import {sequelize} from '../conn/mysql'

export interface UsuarioInstance extends Model{
    codigo:number,
    nome:string,
    salt: string,
    senha:string
    email:string
    cpf:string
    foto_perfil: Blob
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
        type:DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false
    },
    cpf:{
        type:DataTypes.STRING,
        allowNull: false
    },
    foto_perfil: {
        type: DataTypes.BLOB
    },
    data_cadastro: {
        type:DataTypes.DATE,
        allowNull: false
    }
},{
    tableName:'tb_usuarios',
    timestamps:false
})