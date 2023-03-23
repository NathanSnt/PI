import {Router, Request, Response} from 'express'
import { sequelize } from '../conn/mysql'
import { Estacao } from '../models/Estacao'

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

export async function estacao(req: Request, res: Response) {
    let estacao: string = req.query.estacao as string
    const estacoes = await Estacao.findAll()
    
    let valores = estacoes[0]['dataValues']

    res.render('pages/estacao', {
        valores
    })
}