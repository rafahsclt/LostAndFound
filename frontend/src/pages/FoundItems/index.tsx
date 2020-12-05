import React, { useEffect, useState } from 'react'

import api from '../../services/api'
import Header from '../../components/Header'

import './styles.css'

interface ICategory {
    id: number
    name: string
}

interface IImages {
    id: number
    url: string
}

interface IItems {
    id: number
    name: string
    telephone: string
    object: string
    latitude: number
    longitude: number
    observations: string
    category: ICategory
    images: IImages[]
}

const FoundItems: React.FC = () => {
    const [items, setItems] = useState<IItems[]>()

    useEffect(() => {
        api.get('found').then(response => {
            setItems(response.data)
        })
    }, [])

    return (
        <div id="found-list-container">
            <Header category="found" />
            {!items ?
                <h1>Nenhum objeto cadastrado!</h1>
                :
                items.map(item => (
                    <section key={item.id}>
                        <div className="title-box">
                            <h2>{item.object}</h2>
                        </div>
                        <div className="content-box">
                            <aside>
                                <img src={item.images.length !== 0 ? item.images[0].url : ''} alt={item.object} />
                            </aside>
                            <div className="description-box">
                                <div className="description">
                                    <strong>Nome : </strong>
                                    <p>{item.name}</p>
                                </div>
                                <div className="description">
                                    <strong>Telefone : </strong>
                                    <p>{item.telephone}</p>
                                </div>
                                <div className="description">
                                    <strong>Categoria : </strong>
                                    <p>{item.category.name}</p>
                                </div>
                                <div className="description">
                                    <strong>Observação : </strong>
                                    <p>{item.observations}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
        </div>
    )
}

export default FoundItems