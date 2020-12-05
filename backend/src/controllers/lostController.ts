import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import items_views from '../views/items_views'
import Item from '../models/Item'

async function create(request: Request, response: Response) {
    const {
        name,
        telephone,
        object,
        category_id,
        latitude,
        longitude,
        observations
    } = request.body

    const itemRepository = getRepository(Item)

    const requestImages = request.files as Express.Multer.File[]

    const images = requestImages.map(image => {
        return { path: image.filename }
    })

    const data = {
        name,
        telephone,
        object,
        category_id,
        latitude,
        longitude,
        observations,
        lostOrFound: 'lost',
        images
    }

    const schema = Yup.object().shape({
        name: Yup.string().required(),
        telephone: Yup.string().required(),
        object: Yup.string().required(),
        category_id: Yup.number().required(),
        latitude: Yup.number().required(),
        longitude: Yup.number().required(),
        observations: Yup.string().max(300),
        lostOrFound: Yup.string().required(),
        image: Yup.array(Yup.object().shape({
            path: Yup.string().required()
        }))
    })

    await schema.validate(data, {
        abortEarly: false
    })

    const item = itemRepository.create(data)

    await itemRepository.save(item)

    return response.status(201).json(items_views.render(item))
}

async function index(request: Request, response: Response) {
    const itemRepository = getRepository(Item)

    const items = await itemRepository.find({
        where: { lostOrFound: 'lost' },
        relations: ['images', 'category']
    })

    return response.json(items_views.renderMany(items))
}

export default { create, index }