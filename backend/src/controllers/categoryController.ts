import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Category from '../models/Category'

async function index(request: Request, response: Response) {
    const categoryRepository = getRepository(Category)

    const categories = await categoryRepository.find()

    return response.json(categories)
}

export default { index }