import {Router, Request, Response} from 'express'
import { sequelize } from '../conn/mysql'
import { Estacao } from '../models/Estacao'
import { Reclamacao } from '../models/Reclamacao'

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

export const arquivar_reclamacao = async (req: Request, res: Response) => {
    let tipo = req.body.tipo
    let motivo = req.body.problema
    let descricao = req.body.descricaoProblema
    let data_hora = new Date()

    switch (tipo) {
        case '1': 
            try{
                const nova_reclamacao = Reclamacao.build({
                    data_hora,
                    tipo,
                    descricao,
                    motivo
                })
                await nova_reclamacao.save()
            }
            catch (error){
                console.log(error)
                console.log(tipo)
                console.log(motivo)
                console.log(descricao)
            }
            res.redirect('/')
            break

        case '2':
            try {
                const estacao = await Estacao.findOne({where: {nome: req.body.nomeEstacao}})
                if  (estacao !== null){
                    const codigo_estacao = estacao.codigo
                    console.log(codigo_estacao)
                    const nova_reclamacao = Reclamacao.build({
                        data_hora,
                        tipo,
                        descricao,
                        motivo,
                        cod_estacao: codigo_estacao
                    })
                    await nova_reclamacao.save()
                }
            }
            catch (error) {
                console.log(error)
                console.log(tipo)
                console.log(estacao)
                console.log(motivo)
                console.log(descricao)
            }
            res.redirect('/')
            break

        case '3':
            let numero_carro = req.body.numeroCarro
            try {
                const nova_reclamacao = Reclamacao.build({
                    data_hora,
                    tipo,
                    descricao,
                    motivo,
                    numero_carro: numero_carro
                })
                await nova_reclamacao.save()
            }
            catch (error) {
                console.log(error)
                console.log(tipo)
                console.log(numero_carro)
                console.log(motivo)
                console.log(descricao)
            }
            res.redirect('/')
            break
    }
}

export const mapa = ((req: Request, res: Response) => {
    res.render('pages/mapa.mustache')
})

export async function estacao(req: Request, res: Response) {
    let nome_estacao: string = req.query.estacao as string
    const estacao = await Estacao.findOne({where: {nome: nome_estacao}})
    
    if (estacao === null){
        res.render('pages/not_found')
    }
    else {
        try {
            res.render('pages/estacao', {
                estacao
            })
        }catch (error) {
            console.log(error)
        }
    }
}