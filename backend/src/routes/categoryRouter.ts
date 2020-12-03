import { Router } from 'express'

import categoryController from '../controllers/categoryController'

const categoryRouter = Router()

categoryRouter.get('/', categoryController.index)

export default categoryRouter