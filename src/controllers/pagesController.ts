import {Router, Request, Response} from 'express'
import { Estacao } from '../models/Estacao'
import { Reclamacao } from '../models/Reclamacao'
import { Usuario } from '../models/Usuario'
import { Caracteristica } from '../models/Caracteristica'

export const home = async (req:Request, res:Response) => {
    try {
        const autenticado = req.isAuthenticated()
        const cod_usuario = autenticado? res.locals.user.codigo : null
        const comentarios = await Reclamacao.findAll({order: [['codigo', 'DESC']]})
        if (comentarios.length === 0){
            res.render('pages/home')
        }
        else {
            const comentData = await Promise.all(comentarios.map(async (comentario) => { 
                const usuario = await Usuario.findOne({ where: { codigo: comentario?.cod_usu } })
                const tempo = calculaTempo(comentario?.data_hora) // Tempo de existência do comentário

                let reclamacoes = [null, 'Sobre a linha', 'Estação específica', 'Carro específico']

                const estacao = await Estacao.findOne({where: {codigo: comentario?.cod_estacao}}) 

                const comentInfo = {
                    cod_usuario: usuario?.codigo,
                    codigo: comentario.codigo,
                    descricao: comentario?.descricao,
                    usuario: usuario?.nome,
                    tempo: tempo,
                    tipo: reclamacoes[comentario?.tipo],
                    estacao: estacao?.nome,
                    carro: comentario.numero_carro,
                    foto_perfil: usuario?.foto_perfil
                }

                return comentInfo
            }))

            res.render('pages/home', {
                cod_usuario: cod_usuario,
                autenticado,
                comentarios: comentData
            })
        }
    } catch (error) {
        console.error(`Erro ao renderizar página principal.\n${error}`);
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
    let movimentacao = req.body.movimentacao_linha
    let hora_atual = new Date()
    
    if(req.isAuthenticated()){
        let usuario = res.locals.user.codigo
        switch (tipo) {
            case '1': 
                try{
                    const nova_reclamacao = Reclamacao.build({
                        data_hora: hora_atual,
                        tipo: tipo,
                        descricao: descricao,
                        motivo: motivo,
                        movimentacao: movimentacao,
                        cod_usu: usuario
                    })
                    await nova_reclamacao.save()
                }
                catch (error){
                    console.log(`Erro ao arquivar reclamação:\n${error}`)
                }
                // Exibir mensagem de sucesso
                res.render('pages/home', {
                    toast: "Reclamação arquivada com sucesso!",
                    sucesso: true
                })
                break
    
            case '2':
                try {
                    const estacao = await Estacao.findOne({where: {nome: req.body.nomeEstacao}})
                    if  (estacao !== null){
                        const codigo_estacao = estacao.codigo
                        const nova_reclamacao = Reclamacao.build({
                            data_hora: hora_atual,
                            tipo: tipo,
                            descricao: descricao,
                            motivo: motivo,
                            cod_estacao: codigo_estacao,
                            movimentacao: movimentacao,
                            cod_usu: usuario
                        })
                        await nova_reclamacao.save()
                    }
                }
                catch (error) {
                    console.log(`Erro ao arquivar reclamação:\n${error}`)
                }
                // Exibir mensagem de sucesso
                res.render('pages/home', {
                    toast: "Reclamação arquivada com sucesso!",
                    sucesso: true
                })
                break
    
            case '3':
                let numero_carro = req.body.numeroCarro
                try {
                    const nova_reclamacao = Reclamacao.build({
                        data_hora: hora_atual,
                        tipo: tipo,
                        descricao: descricao,
                        motivo: motivo,
                        numero_carro: numero_carro,
                        cod_usu: usuario
                    })
                    await nova_reclamacao.save()
                }
                catch (error) {
                    console.log(`Erro ao arquivar reclamação:\n${error}`)
                }
                // Exibir mensagem de sucesso
                res.render('pages/home', {
                    toast: "Reclamação arquivada com sucesso!",
                    sucesso: true
                })
                break
        }
    }
    else {
        res.render('pages/reclamar', {
            toast: "Você precisa fazer login para conseguir enviar uma reclamação.",
            sucesso: false
        })
    }
}

export const mapa = ((req: Request, res: Response) => {
    res.render('pages/mapa.mustache')
})

export async function estacao(req: Request, res: Response) {
    let nome_estacao: string = req.query.estacao as string
    
    try {
        const estacao = await Estacao.findOne({ where: { nome: nome_estacao } });
        const caracteristica = await Caracteristica.findAll({where: {cod_estacao: estacao?.codigo}})
        let caracteristicas = {}
        caracteristica.forEach(element => {

            let tipo = `${element?.tipo}`
            let valor
            if (element.cod_estado == 1) {valor = "Não Tem"}
            else if (element.cod_estado == 2) {valor = "Funcionando"}
            else if (element.cod_estado == 3) {valor = "Quebrado"}
            else {valor = "Em Manutenção"}

            Object.defineProperty(caracteristicas, tipo, {
                value: valor,
                writable: true,
                enumerable: true,
                configurable: true
            })
        })

        console.log(caracteristicas)

        const comentarios = await Reclamacao.findAll({ where: { cod_estacao: estacao?.codigo }, order: [['codigo', 'DESC']] });
        if (comentarios.length === 0){
            res.render('pages/estacao', {
                caracteristicas,
                estacao
            })
        }
        else {
            const comentData = await Promise.all(comentarios.map(async (comentario) => {
                const tempo = calculaTempo(comentario?.data_hora)
                const usuario = await Usuario.findOne({ where: { codigo: comentario?.cod_usu } });

                const comentInfo = {
                    descricao: comentario?.descricao,
                    usuario: usuario?.nome,
                    tempo: tempo,
                    foto_perfil: usuario?.foto_perfil
                }

                return comentInfo
            }))
        
            if (estacao === null){
                res.render('pages/not_found')
            }
            else {
                res.render('pages/estacao', {
                    estacao,
                    caracteristicas: caracteristicas,
                    comentarios: comentData
                })
            }
        }
    } catch (error) {
        console.log(`Erro ao renderizar página sobre estação:\n${error}`)
    }
}

export async function usuario(req: Request, res: Response) {
    try {
        const codigo = req.params.cod_usuario
        console.log(`Buscando dados do usuário com código ${codigo}`)
        const usuario = await Usuario.findOne({where: {codigo: codigo}})
        const reclamacoes = await Reclamacao.findAll({where: {cod_usu: usuario?.codigo}})

        try {
            res.render('pages/usuario', {
                reclamacoes,
                usuario
            })
        }
        catch (error) {
            console.log(`Erro ao renderizer a página do usuário ${usuario?.nome}.\n\n${error}`)
        }
    }
    catch (error) {
        console.log(`Erro ao buscar dados do usuario.\n\n${error}`)
    }
}

function calculaTempo(dataHora: Date){
    const dataAtual = new Date()
    const diferencaMs = dataAtual.getTime() - dataHora.getTime()

    const diferencaSegundos = Math.floor(diferencaMs / 1000)
    const diferencaMinutos = Math.floor(diferencaSegundos / 60)
    const diferencaHoras = Math.floor(diferencaMinutos / 60)
    const diferencaDias = Math.floor(diferencaHoras / 24)

    if (diferencaDias < 1){
        if (diferencaHoras < 1){
            if (diferencaMinutos < 1){
                return `${diferencaSegundos} segundos atrás`
            }
            else {
                return `${diferencaMinutos} minutos atrás`
            }
        }
        else {
            return `${diferencaHoras} horas atrás`
        }
    }
    else {
        return `${diferencaDias} dias atrás`
    }
}