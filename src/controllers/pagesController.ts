import {Router, Request, Response} from 'express'
import { Estacao } from '../models/Estacao'
import { Reclamacao } from '../models/Reclamacao'
import { Usuario } from '../models/Usuario'
import { Caracteristica } from '../models/Caracteristica'
import { Status, StatusInstance } from '../models/Status'
import { Op } from 'sequelize'
import { Endereco } from '../models/Endereco'
import { Servico } from '../models/Servico'


export const home = async (req:Request, res:Response) => {
    const sucesso = req.params.sucesso === "true"? true : false
    const autenticado = req.isAuthenticated()
    const cod_usuario = autenticado? res.locals.user.codigo : null
    const dataAtual = new Date()
    const dataHora30MinAtras = new Date(dataAtual.getTime() - 30 * 60000)
    const comentarios = await Reclamacao.findAll({where: {data_hora: {[Op.gt]: dataHora30MinAtras }},order: [['codigo', 'DESC']], })
    
    const status_estacao = await Status.findAll({where: {cod_estacao: null, expiracao: {[Op.gt]: new Date()} }})
    const status = calculaStatus(status_estacao, false)
    
    try {
        if (comentarios.length === 0){
            res.render('pages/home', {
                status,
                cod_usuario,
                autenticado,
                toast: req.params.toast,
                sucesso: sucesso
            })
        }
        else {
            const comentData = await Promise.all(comentarios.map(async (comentario) => { 
                const usuario = await Usuario.findOne({ where: { codigo: comentario?.cod_usuario } })
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
                    foto_perfil: usuario?.foto_perfil,
                }

                return comentInfo
            }))

            res.render('pages/home', {
                status,
                cod_usuario: cod_usuario,
                autenticado,
                comentarios: comentData,
                toast: req.params.toast,
                sucesso: sucesso
            })
        }
    } catch (error) {
        console.error(`Erro ao renderizar página principal.\n${error}`);
    }
}

export const sobre = ((req: Request, res: Response) => {
    const autenticado = req.isAuthenticated()
    const cod_usuario = autenticado? res.locals.user.codigo : null
    res.render('pages/sobre', {
        autenticado,
        cod_usuario
    })
})

export const reclamar = ((req: Request, res: Response) => {
    const autenticado = req.isAuthenticated()
    const cod_usuario = autenticado? res.locals.user.codigo : null
    res.render('pages/reclamar', {
        autenticado,
        cod_usuario
    })
})

export const arquivar_reclamacao = async (req: Request, res: Response) => {
    let tipo = req.body.tipo
    const autenticado = req.isAuthenticated()
    const cod_usuario = autenticado? res.locals.user.codigo : null
    
    if(autenticado){
        let usuario = res.locals.user.codigo
        try{

            switch (tipo) {
                case '1':
                    await arquivarReclamacaoTipo1(req, usuario)
                    break
        
                case '2':
                    await arquivarReclamacaoTipo2(req, usuario)
                    break
        
                case '3':
                    await arquivarReclamacaoTipo3(req, usuario)
                    break
            }
            res.redirect("/home/Reclamação enviada!/true")
        }
        catch (error) {
            console.log(`Erro ao arquivar reclamação:\n${error}`)
        }
    }
    else {
        res.redirect("/login/Você precisa fazer login para conseguir enviar uma reclamação./false")
    }
}

export const mapa = ((req: Request, res: Response) => {
    const autenticado = req.isAuthenticated()
    const cod_usuario = autenticado? res.locals.user.codigo : null
    res.render('pages/mapa', {
        autenticado,
        cod_usuario
    })
})

export async function estacao(req: Request, res: Response) {
    let nome_estacao: string = req.query.estacao as string
    const autenticado = req.isAuthenticated()
    const cod_usuario = autenticado? res.locals.user.codigo : null

    try {
        const estacao = await Estacao.findOne({ where: { nome: nome_estacao } });
        const enderecos = await Endereco.findAll({where: {cod_estacao: estacao?.codigo}})

        console.log(enderecos)
        const [caracteristica, status_estacao, comentarios] = await Promise.all([
            Servico.findAll({where: {cod_estacao: estacao?.codigo}}),
            Status.findAll({where: {cod_estacao: estacao?.codigo, expiracao: {[Op.gt]: new Date()} }}),
            Reclamacao.findAll({ where: { cod_estacao: estacao?.codigo }, order: [['codigo', 'DESC']] })
        ]);
        
        let caracteristicas = {}
        // caracteristica.forEach(element => {

            // let tipo = `${element?.nome}`
            // let valor
            // if (element.cod_estado == 1) {valor = "Não Tem"}
            // else if (element.cod_estado == 2) {valor = "Funcionando"}
            // else if (element.cod_estado == 3) {valor = "Quebrado"}
            // else {valor = "Em Manutenção"}

        //     Object.defineProperty(caracteristicas, tipo, {
        //         value: valor,
        //         writable: true,
        //         enumerable: true,
        //         configurable: true
        //     })
        // })

        const status = calculaStatus(status_estacao, true)
        
        if (comentarios.length === 0){
            res.render('pages/estacao', {
                autenticado,
                cod_usuario,
                status,
                caracteristicas,
                estacao,
                enderecos: enderecos
            })
        }
        else {
            const comentData = await Promise.all(comentarios.map(async (comentario) => {
                const tempo = calculaTempo(comentario?.data_hora)
                const usuario = await Usuario.findOne({ where: { codigo: comentario?.cod_usuario } });

                const comentInfo = {
                    descricao: comentario?.descricao,
                    usuario: usuario?.nome,
                    tempo: tempo,
                    foto_perfil: usuario?.foto_perfil
                }

                return comentInfo
            }))
        
            if (estacao === null){
                res.render('pages/not_found', {
                    autenticado,
                    cod_usuario
                })
            }
            else {
                res.render('pages/estacao', {
                    autenticado,
                    cod_usuario,
                    status,
                    estacao,
                    enderecos: enderecos,
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
    const autenticado = req.isAuthenticated()
    const cod_usuario = autenticado? res.locals.user.codigo : null
    try {
        let visitante = null
        if (autenticado){
            visitante = res.locals.user.codigo
        }
        const codigo = req.params.cod_usuario
        const usuario = await Usuario.findOne({where: {codigo: codigo}})
        const reclamacoes = await Reclamacao.findAll({where: {cod_usuario: usuario?.codigo}})
        const qtdReclamacoes = reclamacoes.length

        // TESTANDO CALCULAR TEMPO DE COMENTÁRIO
        const comentData = await Promise.all(reclamacoes.map(async (comentario) => { 
            const usuario = await Usuario.findOne({ where: { codigo: comentario?.cod_usuario } })
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

        try {
            res.render('pages/usuario', {
                autenticado,
                cod_usuario,
                perfil: visitante == codigo,
                qtdReclamacoes,
                reclamacoes: comentData,
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

function calculaStatus(status_estacao: StatusInstance[], estacao: Boolean){
    let vazio=0, moderado=0, cheio=0
    
    status_estacao.forEach(status => {
        status?.status_movimentacao == "Vazio"? vazio++:vazio+=0
        status?.status_movimentacao == "Moderado"? moderado++:moderado+=0
        status?.status_movimentacao == "Muito Cheio"? cheio++:cheio+=0
    })

    if (moderado >= cheio && moderado > 10){
        return estacao? "Moderado" : {estado: "Moderado", imagem :"neutro.png"}
    }
    else if (cheio > moderado && cheio > 10){
        return estacao? "Muito Cheio" : {estado: "Ruim", imagem: "triste.png"}
    }
    else {
        return estacao? "Vazio" : {estado: "Bom", imagem: "feliz.png"}
    }
}

async function arquivarReclamacaoTipo1(req: Request, usuario: string){
    const movimentacao = req.body.movimentacao_linha
    const hora_atual = new Date()

    const novo_status = Status.build({
        status_movimentacao: movimentacao
    })
    const nova_reclamacao = Reclamacao.build({
        data_hora: hora_atual,
        tipo: '1',
        descricao: req.body.descricaoProblema,
        motivo: req.body.problema,
        cod_usuario: usuario
    })
    await novo_status.save()
    await nova_reclamacao.save()
}

async function arquivarReclamacaoTipo2(req: Request, usuario: string){
    const movimentacao = req.body.movimentacao_linha
    const hora_atual = new Date()

    const estacao = await Estacao.findOne({where: {nome: req.body.nomeEstacao}})
    if  (estacao !== null){
        const codigo_estacao = estacao.codigo
        const novo_status = Status.build({
            status_movimentacao: movimentacao,
            cod_estacao: codigo_estacao
        })
        const nova_reclamacao = Reclamacao.build({
            data_hora: hora_atual,
            tipo: '2',
            descricao: req.body.descricaoProblema,
            motivo: req.body.problema,
            cod_estacao: codigo_estacao,
            cod_usuario: usuario
        })
        await novo_status.save()
        await nova_reclamacao.save()
    }
}

async function arquivarReclamacaoTipo3(req: Request, usuario: string){
    const hora_atual = new Date()

    const nova_reclamacao = Reclamacao.build({
        data_hora: hora_atual,
        tipo: '3',
        descricao: req.body.descricaoProblema,
        motivo: req.body.problema,
        numero_carro: req.body.numeroCarro,
        cod_usuario: usuario
    })
    await nova_reclamacao.save()
}