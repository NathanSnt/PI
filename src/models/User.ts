import {Model, DataTypes} from'sequelize'
import {sequelize} from '../conn/mysql'

//criando um modelo para o users do meu banco
export interface UserInstance extends Model{
    id:number,
    nome:string,
    idade:number
}

export const User = sequelize.define<UserInstance>("User,",{

    id:{
        primaryKey:true,
        type:DataTypes.INTEGER
    },
    nome:{
        type:DataTypes.STRING
    },
    idade:{
        type:DataTypes.INTEGER,
        defaultValue: 18
    }

},{
    tableName:'tb_usuarios',
    timestamps:false
})
