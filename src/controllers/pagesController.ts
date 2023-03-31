import {Router, Request, Response} from 'express'
import { blob } from 'stream/consumers'
import { sequelize } from '../conn/mysql'
import { Estacao } from '../models/Estacao'
import { Reclamacao } from '../models/Reclamacao'
import { Usuario } from '../models/Usuario'
const base64Img = require('base64-img')

export const home = async (req:Request, res:Response) => {
    try {

        const comentarios = await Reclamacao.findAll({order: [['codigo', 'DESC']]});
        if (comentarios.length === 0){
            res.render('pages/home')
        }
        else {
            const comentData = await Promise.all(comentarios.map(async (comentario) => {
                const codUsu = comentario?.cod_usu ?? 1;
                const dataHora = comentario?.data_hora ?? new Date().toString();
            
                const usuario = await Usuario.findOne({ where: { codigo: codUsu } });
            
            
            
                const dataAtual = new Date()
                const dataRegistro = new Date(dataHora)
                const diferencaMs = dataAtual.getTime() - dataRegistro.getTime()

                const diferencaSegundos = Math.floor(diferencaMs / 1000)
                const diferencaMinutos = Math.floor(diferencaSegundos / 60)
                const diferencaHoras = Math.floor(diferencaMinutos / 60)
                const diferencaDias = Math.floor(diferencaHoras / 24)

                let tempo = '0'
                if (diferencaDias < 1){
                    if (diferencaHoras < 1){
                        if (diferencaMinutos < 1){
                            tempo = `${diferencaSegundos} segundos atrás`
                        }
                        else {
                            tempo = `${diferencaMinutos} minutos atrás`
                        }
                    }
                    else {
                        tempo = `${diferencaHoras} horas atrás`
                    }
                }
                else {
                    tempo = `${diferencaDias} dias atrás`
                }

                let tipoReclamacao = ''
                if (comentario?.tipo == 1){
                    tipoReclamacao = 'Sobre a linha'
                }
                else if (comentario?.tipo == 2) {
                    tipoReclamacao = 'Estação específica'
                }
                else if (comentario?.tipo == 3) {
                    tipoReclamacao = 'Carro específico'
                }
                const estacao = await Estacao.findOne({where: {codigo: comentario?.cod_estacao}})
                const nomeEstacao = estacao?.nome

                // const binario = Buffer.from(usuario?.foto_perfil)
                // const opcoes = {
                //     string : true
                // }
                // const foto_perfil = base64Img.base64Sync(binario, opcoes)

                const comentInfo = {
                    descricao: comentario?.descricao,
                    usuario: usuario?.nome,
                    tempo: tempo,
                    tipo: tipoReclamacao,
                    estacao: nomeEstacao,
                    carro: comentario.numero_carro//,
                    //foto_perfil: foto_perfil
                }

                return comentInfo
            }))
        

            console.log(comentData)
            if (estacao === null){
                res.render('pages/not_found')
            }
            else {
                try {
                    res.render('pages/home', {
                        estacao,
                        comentarios: comentData
                    })
                }catch (error) {
                    console.log(error)
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
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

    try {
        const estacao = await Estacao.findOne({ where: { nome: nome_estacao } });
        const codigoEstacao = estacao?.codigo ?? 1;
      
        const comentarios = await Reclamacao.findAll({ where: { cod_estacao: codigoEstacao }, order: [['codigo', 'DESC']] });
        if (comentarios.length === 0){
            res.render('pages/estacao', {
                estacao
            })
        }
        else {
            const comentData = await Promise.all(comentarios.map(async (comentario) => {
                const codUsu = comentario?.cod_usu ?? 1;
                const dataHora = comentario?.data_hora ?? new Date().toString();
            
                const usuario = await Usuario.findOne({ where: { codigo: codUsu } });
            
            
            
                const dataAtual = new Date()
                const dataRegistro = new Date(dataHora)
                const diferencaMs = dataAtual.getTime() - dataRegistro.getTime()

                const diferencaSegundos = Math.floor(diferencaMs / 1000)
                const diferencaMinutos = Math.floor(diferencaSegundos / 60)
                const diferencaHoras = Math.floor(diferencaMinutos / 60)
                const diferencaDias = Math.floor(diferencaHoras / 24)

                let tempo = '0'
                if (diferencaDias < 1){
                    if (diferencaHoras < 1){
                        if (diferencaMinutos < 1){
                            tempo = `${diferencaSegundos} segundos atrás`
                        }
                        else {
                            tempo = `${diferencaMinutos} minutos atrás`
                        }
                    }
                    else {
                        tempo = `${diferencaHoras} horas atrás`
                    }
                }
                else {
                    tempo = `${diferencaDias} dias atrás`
                }

                const comentInfo = {
                    descricao: comentario?.descricao,
                    usuario: usuario?.nome,
                    tempo: tempo
                }

                return comentInfo
            }))
        

            console.log(comentData)
            if (estacao === null){
                res.render('pages/not_found')
            }
            else {
                try {
                    res.render('pages/estacao', {
                        estacao,
                        comentarios: comentData
                    })
                }catch (error) {
                    console.log(error)
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}