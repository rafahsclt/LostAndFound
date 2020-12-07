import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../config/upload'
import foundController from '../controllers/foundController'

const foundRouter = Router()
const upload = multer(uploadConfig)

foundRouter.get('/', foundController.index)

foundRouter.post('/', upload.array("images"), foundController.create)

foundRouter.delete('/:id', foundController.destroy)

export default foundRouter