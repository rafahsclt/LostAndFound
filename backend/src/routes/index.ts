import { Router } from 'express'

import lostRouter from './lostRouter'
import foundRouter from './foundRouter'

const routes = Router()

routes.use('/lost', lostRouter)
routes.use('/found', foundRouter)


export default routes