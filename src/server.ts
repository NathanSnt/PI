import express from 'express'
import session from 'express-session'
import flash from 'connect-flash'
import mainRoutes from './routes/index'
import path from 'path'
import mustache from 'mustache-express'
import dotenv from 'dotenv'
import passport from 'passport'
import autenticacao from './configs/autenticacao'

autenticacao(passport)
dotenv.config()

console.clear()
const server = express()

// CONFIGURAÇÕES
    // SESSÃO
    server.use(session({
        secret: "SenhaSuperSecretaAlerTrem",
        resave: true,
        saveUninitialized: true
    }))

    // PASSPORT (AUTENTICAÇÃO)
    server.use(passport.initialize())
    server.use(passport.session())
    
    // FLASH
    server.use(flash())
    
    // MIDDLEWARE
    server.use((req, res, next) => {
        res.locals.msg_sucesso = req.flash('msg_sucesso')
        res.locals.msg_falhou = req.flash('msg_falhou')
        res.locals.error = req.flash('error')
        res.locals.user = req.user || null
        next()
    })

// Configuração do mustache
server.set('view engine', 'mustache')
server.set('views', path.join(__dirname, 'views'))
server.engine('mustache', mustache())

// Importando a pasta public
server.use(express.static(path.join(__dirname, '../public')))
server.use(express.json());
server.use(express.urlencoded({extended:true}))

// Verificando se a requisição está sendo feita para a página raiz ou sendo feita através de 
// uma requisição ajax.
// server.use((req, res, next) => {
//     if (req.url === '/' 
//     || (req.xhr && req.headers['x-requested-with'] === 'XMLHttpRequest')
//     || ((req.method === 'POST' && req.url ==='/cadastro') || (req.method === 'POST' && req.url ==='/login'))) {
//         next();
//     } else {
//         res.render('pages/not_found')
//     }
// });

server.use(mainRoutes)

// Not Found
server.use((req, res) => {
    res.render('pages/not_found')
})

// Habilitando criptografia (Usando o método POST)(COLOCAR ANTES DA DECLARAÇÃO DAS ROTAS!)
//server.use(express.urlencoded({extended:true}))

server.listen(process.env.PORT)
console.log("Servidor online")
