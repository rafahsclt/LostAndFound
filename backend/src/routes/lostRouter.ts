import { Router } from 'express'

const lostRouter = Router()

lostRouter.get('/lost', (request, response) => {
    return response.json({ message : 'lost' })
})

lostRouter.post('/lost', (request, response) => {
    return response.json({ message : 'lost' })
})

export default lostRouter