import {Router, Request, Response} from 'express'
import * as userController from '../controllers/userController'
import * as pagesController from '../controllers/pagesController'

const router = Router()

router.get('/', (req:Request, res:Response) =>{
    res.render('pages/home')
})

router.get('/home', pagesController.home)

router.get('/cadastro', userController.cadastro)
router.post('/cadastro', userController.cadastrar_usuario)
router.get('/login', userController.login)

router.get('/sobre', pagesController.sobre)

router.get('/reclamar', pagesController.reclamar)

router.get('/mapa', pagesController.mapa)

router.get('/estacao', pagesController.estacao)

export default router 