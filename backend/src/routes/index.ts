import { Router } from 'express'

import lostRouter from './lostRouter'
import foundRouter from './foundRouter'

const routerMaster = Router()

routerMaster.use('/lost', lostRouter)
routerMaster.use('/found', foundRouter)


export default routerMaster