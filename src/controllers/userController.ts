import {Router, Request, Response} from 'express'
import { Usuario } from '../models/Usuario'

export const cadastro = ((req: Request, res: Response) => {
    res.render('pages/cadastro')
})

export const cadastrar_usuario = ( async (req: Request, res: Response) => {
    const nome = req.body.nome
    const email = req.body.email
    const senha = req.body.senha
    const cpf = req.body.cpf
    const data_cadastro = new Date()
    console.log(data_cadastro)

    if (nome && senha && email && cpf) {
        const novo_usuario = Usuario.build({
            nome,
            senha, 
            email,
            cpf,
            data_cadastro
        })
        await novo_usuario.save()
    }
    res.redirect('/')
})

export const login = ((req: Request, res: Response) => {
    res.render('pages/login')
})

export const pesquisa_usuario = async (req:Request, res: Response) => {
    const email = req.body.email
    const senha = req.body.senha

    const usuario = await Usuario.findOne({where: {email: email, senha: senha}})

    if (usuario) {
        res.redirect('/')
    }
    else {
        res.render("pages/not_found")
    }
}