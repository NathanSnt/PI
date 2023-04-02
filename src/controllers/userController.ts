import {Router, Request, Response, NextFunction} from 'express'
import { Usuario } from '../models/Usuario'
import bcrypt from 'bcrypt'
import upload from '../configs/configMulter'
import passport from 'passport'

export const cadastro = ((req: Request, res: Response) => {
    res.render('pages/cadastro')
})
const uplodaMiddleWare = upload.single('foto_perfil')
export const cadastrar_usuario = ((req: Request, res: Response) => {
    uplodaMiddleWare(req, res, async (error: any) => {
        try {
            if (error) {
                console.log(error)
            }
            else {

                const nome = req.body.nome
                const email = req.body.email
                const salt = await bcrypt.genSalt()
                const senha = await bcrypt.hash(req.body.senha, salt)
                const cpf = req.body.cpf
                const data_cadastro = new Date()
            
                if (nome && senha && email && cpf) {
                    const novo_usuario = Usuario.build({
                        nome: nome,
                        salt: salt,
                        senha: senha, 
                        email: email,
                        cpf: cpf,
                        foto_perfil: req.file?.filename,
                        data_cadastro: data_cadastro
                    })
                    await novo_usuario.save()
                }
                res.redirect('/')
            }
        }
        catch (error) {
            console.log(`Erro ao salvar cadastro\n\n\n${error}\n\n\n`)
        }
    })
})

export const login = ((req: Request, res: Response) => {
    res.render('pages/login')
})

export const pesquisa_usuario = async (req:Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)


    // const email: string = req.body.email
    
    // const usuario = await Usuario.findOne({where: {email: email}})
    
    // if (usuario) {
    //     const hashSenha = await bcrypt.hash(req.body.senha, usuario.salt)
    //     if (hashSenha === usuario.senha){ 
    //         console.log(`Usuário ${usuario.nome} autenticado com sucesso!`)
    //         res.redirect('/')
    //     }
    // }
    // res.render("pages/not_found") // Aqui exibir erro de autenticação!
}