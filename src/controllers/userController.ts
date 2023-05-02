import {Router, Request, Response, NextFunction} from 'express'
import { Usuario, UsuarioInstance } from '../models/Usuario'
import bcrypt from 'bcrypt'
import upload from '../configs/configMulter'
import passport from 'passport'
import { Denuncia } from '../models/Denuncia'
import { Reclamacao } from '../models/Reclamacao'

export const cadastro = ((req: Request, res: Response) => {
    res.render('pages/cadastro')
})

const uplodaMiddleWare = upload.single('foto_perfil') // Salva foto de perfil do usuário

export const cadastrar_usuario = ((req: Request, res: Response) => {
    uplodaMiddleWare(req, res, async (error: any) => {
        const nome = req.body.nome
        const email = req.body.email
        const salt = await bcrypt.genSalt()
        const senha = await bcrypt.hash(req.body.senha, salt)
        const cpf = req.body.cpf
        const data_cadastro = new Date()

        const emailExiste: boolean = !await emailExisteNoBanco(email)
        const cpfExiste: boolean = !await cpfExisteNoBanco(cpf)
        const isCpfValido: boolean = cpfValido(cpf)
        const tamanhoSenha: boolean = tamanhoMinimoSenha(req.body.senha)
        const nomeValido: boolean = !caracteresEspeciaisNoNome(nome)
        
        if (emailExiste
            && cpfExiste
            && isCpfValido
            && tamanhoSenha
            && nomeValido ) {
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
            res.render('pages/login', {
                toast: "Usuário cadastrado com sucesso!",
                sucesso: true
            })
        }
        else {
            res.render('pages/cadastro', {
                toast: "Dados inválidos ou já existente no banco!",
                sucesso: false
            })
        }
    })
})

export const login = ((req: Request, res: Response) => {
    res.render('pages/login')
})

export const login_notfy = ((req: Request, res: Response) => {
    const sucesso = req.params.sucesso === "true"? true : false
    res.render('pages/login', {
        toast: req.params.toast,
        sucesso: sucesso
    })
})

export const logout = ((req: Request, res: Response) => {
    req.session.destroy((error) => {
        res.redirect('/home/Saiu com sucesso/true')
    });
})

export const pesquisa_usuario = async (req:Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', {
        successRedirect: '/home/Autenticado com sucesso!/true',
        failureRedirect: '/login/Usuário ou senha inválidos./false',
        failureFlash: true
    })(req, res, next)
}

export const denunciar = async(req: Request, res: Response) => {
    const autenticado = req.isAuthenticated()
    const cod_usuario = autenticado? res.locals.user.codigo : null

    if (!autenticado)
    {
        res.redirect("/home/Você precisa estar autenticado para conseguir denunciar comentários./false")
    }
    else {
        const cod_comentario = req.params.cod_comentario
        const denunciante = res.locals.user.codigo
        let motivo = req.body.botoes
        if(motivo  === "Outro"){
            motivo = req.body.outro_motivo
        }
        
        const denuncias = await Denuncia.findAll({where: {cod_reclamacao: cod_comentario}})
        const denunciaUsuario = await Denuncia.findAll({where: {cod_reclamacao: cod_comentario, cod_usuario: denunciante}})
        
        // Impede um usuário de denúnciar o mesmo comentário mais de uma vez.
        if (denunciaUsuario.length == 0){
            arquivarDenuncia(cod_comentario, denunciante,motivo)
        }
        else {
            res.render("pages/home", {
                autenticado,
                cod_usuario,
                toast: "Não é possível denúnciar o mesmo comentário mais de uma vez!",
                sucesso: false
            })
        }
    
        // Quando o número de denúncias chaga à 10, a reclamação é deletado.
        if (denuncias.length >= 9){
            deletarReclamacao(cod_comentario)
        }
        res.render("pages/home", {
            autenticado,
            cod_usuario,
            toast: "Comentário denunciado com sucesso!",
            sucesso: true
        })
    }
}

async function emailExisteNoBanco (email: string){
    const usuario = await Usuario.findAll({where: {email: email}})
    if (usuario.length === 0) {
        console.log("Email disponível")
        return false
    }
    console.log("Email já usado")
    return true
}

async function cpfExisteNoBanco (cpf: string) {
    const usuario = await Usuario.findAll({where: {cpf: cpf}})
    if (usuario.length === 0){
        console.log("CPF disponivel")
        return false
    }
    console.log("CPF já usado")
    return true
}

function tamanhoMinimoSenha(senha: string): boolean{
    if (senha.length < 8){
        console.log("Senha falhou")
        return false
    }
    console.log("Senha OK")
    return true
}

function caracteresEspeciaisNoNome(nome: string): boolean{
    const caracteres = "! @ # $ % ¨ & * ( ) _ - + = § ´ ` [ { } ] : ; ? / ° , . < > \' \\ '".split(" ")
    let invalido = false
    caracteres.forEach(caractere => {
        if (nome.indexOf(caractere) != -1){
            invalido = true
        }
    })
    console.log(invalido? "Nome inválido" : "Nome OK")
    return invalido
}

function cpfValido(cpf: string): boolean{
    cpf = cpf.replace(/[\s.-]*/igm, '')

    let igual = true
    for (let i = 0; i<11 && igual; i++){
        if (cpf[i] != cpf[0]){
            igual = false
        }
    }

    if (igual || cpf === "12345678909"){
        console.log("CPF inválido")
        return false
    }

    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
    }
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)){
        resto = 0 
    }  
    if (resto != parseInt(cpf.substring(9, 10)) ){
        console.log("CPF inválido")
        return false
    } 

    soma = 0
    for (var i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
    }
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)){
        resto = 0
    }
    if (resto != parseInt(cpf.substring(10, 11) ) ) {
        console.log("CPF inválido")
        return false
    }
    console.log("CPF válido")
    return true
}

async function arquivarDenuncia(cod_reclamacao: string, cod_denunciante: string, motivo: string){
    try {
        const nova_denuncia = Denuncia.build({
            cod_reclamacao: cod_reclamacao,
            cod_usuario: cod_denunciante,
            motivo: motivo

        })
        await nova_denuncia.save()
    }
    catch (error){
        console.log(`Erro ao arquivar denúncia!\n\n${error}`)
    }
}

async function deletarReclamacao(codigo_denuncia: string){
    try {
        await Denuncia.destroy({where: {cod_reclamacao: codigo_denuncia}, force: true}).then(() => {
            console.log('\n\nDenúncias deletadas')
        }).catch(() => {
            console.log('\n\nErro ao deletar denúncias')
        })
        await Reclamacao.destroy({where: {codigo: codigo_denuncia}, force: true}).then(() => {
            console.log("Reclamação deletada\n\n")
        }).catch(() => {
            console.log('Erro ao deletar reclamação\n\n')
        })
        console.log(`Comentário com código ${codigo_denuncia} deletado.`)
    }
    catch (error) {
        console.log("Erro ao tentar excluir comentário que atingiu limite de denúncias.\n\n\n\n")
        console.log(error)
    }
}