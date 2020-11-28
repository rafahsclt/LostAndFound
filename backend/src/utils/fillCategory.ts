import { getRepository } from 'typeorm'

import Category from '../models/Category'

const fillCategory = async () => {
    const categoryRepository = getRepository(Category)

    const data = await categoryRepository.find()

    if(data.length === 0) {
        console.log('teste')
        await categoryRepository.insert([
            { name: 'Roupa' },
            { name: 'Aparelho Eletrônico' },
            { name: 'Acessório' },
            { name: 'Documento' },
            { name: 'Outros' }
        ])
    }
}

export default fillCategory