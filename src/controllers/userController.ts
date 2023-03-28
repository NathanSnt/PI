import {Router, Request, Response} from 'express'
import { Usuario } from '../models/Usuario'
import bcrypt from 'bcrypt'

export const cadastro = ((req: Request, res: Response) => {
    res.render('pages/cadastro')
})

export const cadastrar_usuario = ( async (req: Request, res: Response) => {
    const nome = req.body.nome
    const email = req.body.email
    const salt = await bcrypt.genSalt()
    const senha = await bcrypt.hash(req.body.senha, salt)
    const cpf = req.body.cpf
    const data_cadastro = new Date()

    if (nome && senha && email && cpf) {
        const novo_usuario = Usuario.build({
            nome,
            salt,
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
    const email: string = req.body.email
    
    const usuario = await Usuario.findOne({where: {email: email}})
    
    if (usuario) {
        const hashSenha = await bcrypt.hash(req.body.senha, usuario.salt)
        if (hashSenha === usuario.senha){ 
            res.redirect('/')
        }
    }
    else {
        res.render("pages/not_found") // Aqui exibir erro de autenticação!
    }
}