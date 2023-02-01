import express from 'express'
import mainRoutes from './routes/index'
import path from 'path'
import mustache from 'mustache-express'

console.clear()
const server = express()
const port: number = 8080

// Configuração do mustache
server.set('view engine', 'mustache')
server.set('views', path.join(__dirname, 'views'))
server.engine('mustache', mustache())

// Importando a pasta public
server.use(express.static(path.join(__dirname, '../public')))

server.use(mainRoutes)

// Not Found
server.use((req, res) => {
    res.status(404).send("Página não encontrada")
})

server.listen(port)
console.log("Servidor online")