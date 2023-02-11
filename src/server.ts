import express from 'express'
import mainRoutes from './routes/index'
import path from 'path'
import mustache from 'mustache-express'
import dotenv from 'dotenv'

dotenv.config()

console.clear()
const server = express()

// Configuração do mustache
server.set('view engine', 'mustache')
server.set('views', path.join(__dirname, 'views'))
server.engine('mustache', mustache())

// Importando a pasta public
server.use(express.static(path.join(__dirname, '../public')))

server.use(express.urlencoded({extended:true}))
server.use(mainRoutes)

// Not Found
server.use((req, res) => {
    res.render('pages/not_found')
})

// Habilitando criptografia (Usando o método POST)(COLOCAR ANTES DA DECLARAÇÃO DAS ROTAS!)
//server.use(express.urlencoded({extended:true}))

server.listen(process.env.PORT)
console.log("Servidor online")
