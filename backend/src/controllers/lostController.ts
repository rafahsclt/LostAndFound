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
    const { category_id } = request.query

    const itemRepository = getRepository(Item)

    if(category_id) {
        const items = await itemRepository.find({
            where: { lostOrFound: 'lost', category_id },
            relations: ['images', 'category']
        })
    
        return response.json(items_views.renderMany(items))
    }

    const items = await itemRepository.find({
        where: { lostOrFound: 'lost' },
        relations: ['images', 'category']
    })

    return response.json(items_views.renderMany(items))
}

async function destroy(request: Request, response: Response) {
    try {
        const itemsRepository = getRepository(Item)
    
        const { id } = request.params
    
        const user = await itemsRepository.find({
            where: { id }
        })

        if(!user) throw new Error('Usuário não encontrado')
        
        await itemsRepository.delete(id)

        return response.json(user)
    } catch(err) {
        return response.status(400).json({ error: err.msg })
    }
}

export default { create, index, destroy }