import {Router, Request, Response} from 'express'
import * as userController from '../controllers/userController'
import * as pagesController from '../controllers/pagesController'

const router = Router()

router.get('/', (req:Request, res:Response) =>{
    res.render('pages/home')
})

router.get('/cadastro', userController.cadastro)
router.get('/login', userController.login)

router.get('/contato', pagesController.contato)

router.get('/empresa', pagesController.empresa)

router.get('/resultados', pagesController.resultados)

router.get('/sobre', pagesController.sobre)



export default router