import {Router, Request, Response} from 'express'

export const contato = ((req: Request, res: Response) => {
    res.render('pages/contato')
})

export const empresa = ((req: Request, res: Response) => {
    res.render('pages/empresa')
})

export const resultados = ((req: Request, res: Response) => {
    res.render('pages/resultados')
})

export const sobre = ((req: Request, res: Response) => {
    res.render('pages/sobre')
})