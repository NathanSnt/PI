import {Strategy as LocalStrategy} from 'passport-local'
import bcrypt from 'bcrypt'
import { Usuario, UsuarioInstance } from '../models/Usuario'


export default (passport: any) => {
    passport.use(
        new LocalStrategy({usernameField: 'email', passwordField: 'senha'}, async (email: string, senha: string, done: Function) => {
            try {
                const usuario = await Usuario.findOne({where: {email: email}})
                if (!usuario){
                    return done(null, false, {message: "Esta conta não existe!"})
                }
                const senhaBate = await bcrypt.compare(await bcrypt.hash(senha, usuario.salt), usuario.senha)
                if (!senhaBate){
                    return done(null, usuario)
                }
                else {
                    return done(null, false, {message: "Senha incorreta!"})
                }
            }
            catch (erro) {
                done(erro)
            }
        })
    )

    passport.serializeUser((usuario: UsuarioInstance, done: Function) => {
        done(null, usuario.codigo)
    })

    passport.deserializeUser((id: number, done: Function) => {
        Usuario.findByPk(id)
        .then((usuario) => {
            done(null, usuario)
        })
        .catch((erro) => {
            done(erro)
        })
    })
}