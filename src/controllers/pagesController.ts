import {Router, Request, Response} from 'express'
import { sequelize } from '../conn/mysql'

export const home = async (req:Request, res:Response) => {
    // try {
    //     await sequelize.authenticate()
    //     console.log("Funcionou!! ")
    // }
    // catch(error){
    //     console.log("Error! ", error)
    // }

    res.render('pages/home')
}

export const sobre = ((req: Request, res: Response) => {
    res.render('pages/sobre')
})