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
        // cookie: {maxAge: 60000},// Sessão expira em 1 minuto
        cookie: {maxAge: 3600000},// Sessão expira em 1 hora
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

    // Mustache
    server.set('view engine', 'mustache')
    server.set('views', path.join(__dirname, 'views'))
    server.engine('mustache', mustache())

    // Importando a pasta public
    server.use(express.static(path.join(__dirname, '../public')))
    server.use(express.json());
    server.use(express.urlencoded({extended:true}))

    // Bloqueando requisições feitas diretamente pela url
    server.use((req, res, next) => {
        if (
           (req.url === '/')
        || (req.url === '/reclamar')
        || (req.url === '/login')
        || (req.url === '/cadastro')
        || (req.url === '/sobre')
        || (req.url === '/mapa')
        || (req.url === '/logout')
        || (req.url.startsWith('/usuario'))
        || (req.url.startsWith('/estacao'))
        && (req.method === 'GET') 
        && (req.xhr && req.headers['x-requested-with'] === 'XMLHttpRequest')){
            next()
        }
        else if (req.url.startsWith('/denunciar')){
            next()
        }
        else {
            res.render('pages/not_found')
        }
    });

    // Rotas principais
    server.use(mainRoutes)

    // Not Found
    server.use((req, res) => {
        res.render('pages/not_found')
    })

server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`)
})
