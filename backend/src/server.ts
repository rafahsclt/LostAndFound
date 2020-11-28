import express from 'express'

import './database/connection'

import masterRouter from './routes'

const app = express();

app.use(express.json())
app.use(masterRouter)

app.listen(3333, () => {
    console.log('Server started at 3333')
})