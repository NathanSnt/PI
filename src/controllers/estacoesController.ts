import {Router, Request, Response} from 'express'
import { Estacao } from '../models/Estacao'

export async function findAll(req: Request, res: Response) {
    const estacoes = await Estacao.findAll()
    
    let valores = estacoes[0]['dataValues']

    res.render('pages/estacao', {
        valores
    })
}

//export default {findAll} 