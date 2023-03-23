import {Router, Request, Response} from 'express'
import { sequelize } from '../conn/mysql'

export const home = async (req:Request, res:Response) => {
    try {
        await sequelize.authenticate()
        console.log("Funcionou!! ")
    }
    catch(error){
        console.log("Error! ", error)
    }

    res.render('pages/home')
}

export const sobre = ((req: Request, res: Response) => {
    res.render('pages/sobre')
})

export const reclamar = ((req: Request, res: Response) => {
    res.render('pages/reclamar.mustache')
})

export const mapa = ((req: Request, res: Response) => {
    res.render('pages/mapa.mustache')
})

export const estacao = ((req:Request, res: Response) => {
    let estacao: string = req.query.estacao as string
    // Realizar consulta ao banco pelo nome da 
    // estacao e retornar valores necessários

    res.render('pages/estacao', {
        estacao,
        localizacao:'Rua dezessete de maio - Jardim Europa'
    })
})