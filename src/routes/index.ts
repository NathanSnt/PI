import {Router, Request, Response} from 'express'
import * as userController from '../controllers/userController'
import * as pagesController from '../controllers/pagesController'

const router = Router()

router.get('/',  pagesController.home)
router.get('/home', pagesController.home)

router.get('/cadastro', userController.cadastro)
router.post('/cadastro', userController.cadastrar_usuario)

router.get('/login', userController.login)
router.post('/login', userController.pesquisa_usuario)

router.get('/sobre', pagesController.sobre)

router.get('/reclamar', pagesController.reclamar)
router.post('/reclamar', pagesController.arquivar_reclamacao)

router.get('/mapa', pagesController.mapa)

router.get('/estacao', pagesController.estacao)

router.get('/denunciar/:cod_comentario', userController.denunciar)
export default router 