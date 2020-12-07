import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../config/upload'
import lostController from '../controllers/lostController'

const lostRouter = Router()
const upload = multer(uploadConfig)

lostRouter.get('/', lostController.index)

lostRouter.post('/', upload.array('images'), lostController.create)

lostRouter.delete('/:id', lostController.destroy)

export default lostRouter