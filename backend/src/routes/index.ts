import { Router } from 'express'

import lostRouter from './lostRouter'
import foundRouter from './foundRouter'
import categoryRouter from './categoryRouter'

const routes = Router()

routes.use('/lost', lostRouter)
routes.use('/found', foundRouter)
routes.use('/categories', categoryRouter)

export default routes