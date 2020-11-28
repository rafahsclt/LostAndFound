import { Router } from 'express'

const foundRouter = Router()

foundRouter.get('/lost', (request, response) => {
    return response.json({ message : 'lost' })
})

foundRouter.post('/lost', (request, response) => {
    return response.json({ message : 'lost' })
})

export default foundRouter