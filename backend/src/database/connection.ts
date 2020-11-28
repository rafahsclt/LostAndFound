import { createConnection } from 'typeorm'
import fillCategory from '../utils/fillCategory'

const connect = async () => {
    await createConnection()
    await fillCategory()
}

connect()