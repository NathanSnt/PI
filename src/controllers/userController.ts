import {Router, Request, Response, NextFunction} from 'express'
import { Usuario } from '../models/Usuario'
import bcrypt from 'bcrypt'
import upload from '../configs/configMulter'
import passport from 'passport'
import { Denuncia } from '../models/Denuncia'
import { Reclamacao } from '../models/Reclamacao'

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
}

export const denunciar = async(req: Request, res: Response) => {
    if (req.isAuthenticated())
    {
        try {
            const cod_comentario = req.params.cod_comentario
            const denunciante = res.locals.user.codigo
            console.log(`Usuário com código ${denunciante} está denunciar o comentário com código ${cod_comentario}`)
    
            const denuncias = await Denuncia.findAll({where: {cod_usuario: denunciante, cod_reclamacao: cod_comentario}})
            if (denuncias.length > 10){
                try {
                    Denuncia.destroy({where: {cod_reclamacao: cod_comentario}, force: true})
                    Reclamacao.destroy({where: {codigo: cod_comentario}, force: true})
                    console.log(`Comentário com código ${cod_comentario} deletado.`)
                }
                catch (error) {
                    console.log("Erro ao tentar excluir comentário que atingiu limite de denúncias.")
                }
            }
    
            if (denuncias.length == 0){
                const nova_denuncia = Denuncia.build({
                    cod_reclamacao: cod_comentario,
                    cod_usuario: denunciante
                })
                nova_denuncia.save()
                console.log(`Comentário com código ${cod_comentario} denúnciado.`)
                res.redirect('/')
            }
            else {
                // Toast
                console.log(`Não é possível denúnciar o mesmo comentário mais de uma vez!`)
                res.redirect('/')
            }
        }
        catch (error) {
            console.log(`Erro ao arquivar denúncia:\n\n${error}`)
            res.redirect('/')
        }
    }
    else {
        req.flash("Erro", 'Você precisa estar logado para conseguir denunciar comentários.')
        console.log("Usuário não autenticado tentando denúnciar um comentário.")
        res.redirect('/')
    }
}