import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import items_views from '../views/items_views'
import Item from '../models/Item'

async function create(request: Request, response: Response) {
    const {
        name,
        telephone,
        object,
        category,
        latitude,
        longitude,
        observations
    } = request.body

    const itemRepository = getRepository(Item)

    const requestImages = request.files as Express.Multer.File[]

    const images = requestImages.map(image => {
        return { path: image.filename }
    })

    const item = itemRepository.create({
        name,
        telephone,
        object,
        category,
        latitude,
        longitude,
        observations,
        lostOrFound: 'lost',
        images
    })

    await itemRepository.save(item)

    return response.status(201).json(items_views.render(item))
}

async function index(request: Request, response: Response) {
    const itemRepository = getRepository(Item)

    const items = await itemRepository.find({
        where: { lostOrFound: 'lost' },
        relations: ['images']
    })

    return response.json(items_views.renderMany(items))
}

export default { create, index }