import React, { useEffect, useState, useCallback, ChangeEvent } from 'react'
import { FiTrash, FiMap } from 'react-icons/fi'

import api from '../../services/api'
import Header from '../../components/Header'
import ModalMap from '../../components/ModalMap'

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

const LostItems: React.FC = () => {
    const [showModal, setShowModal] = useState(false)
    const [items, setItems] = useState<IItems[]>()
    const [categories, setCategories] = useState<ICategory[]>([])
    const [selectedCategory, setSelectedCategory] = useState(0)

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [selectedObject, setSelectedObject] = useState('')

    const openModal = useCallback((lat: number, long: number, name: string) => {
        setLatitude(lat)
        setLongitude(long)
        setSelectedObject(name)
        setShowModal(true)
    }, [])

    const handleSelectChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        const category = event.target.value

        setSelectedCategory(Number(category))
    }, [setSelectedCategory])

    const handleRemoveItem = useCallback(async (id: number) => {
        await api.delete(`lost/${id}`)

        const filteredItems = items?.filter(item => item.id !== id)
        setItems(filteredItems)
    }, [items])

    useEffect(() => {
        api.get('categories').then(response => {
            setCategories(response.data)
        })
        api.get('lost').then(response => {
            setItems(response.data)
        })
    }, [])

    useEffect(() => {
        if (selectedCategory !== 0) {
            api.get(`lost?category_id=${selectedCategory}`).then(response => {
                setItems(response.data)
            })
        } else {
            api.get('lost').then(response => {
                setItems(response.data)
            })
        }
    }, [selectedCategory])

    return (
        <div id="lost-list-container">
            <Header category="lost" />
            <ModalMap
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                latitude={latitude}
                longitude={longitude}
                objectName={selectedObject}
            />  
            <div className="field">
                <label htmlFor="category">Filtrar por Categoria</label>
                <select name="categories" id="categories" onChange={handleSelectChange}>
                    <option value='0'>Sem filtro</option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            {!items ?
                <h1>Nenhum objeto cadastrado!</h1>
                :
                items.map(item => (
                    <section key={item.id}>
                        <div className="title-box">
                            <h2>{item.object}</h2>
                            <div>
                                <button onClick={() => openModal(item.latitude, item.longitude, item.object)}>
                                    <FiMap color="#3172B7" size={20} />
                                </button>
                                <button onClick={() => handleRemoveItem(item.id)}>
                                    <FiTrash color="#3172B7" size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="content-box">
                            <aside>
                                <img src={item.images.length !== 0 ? item.images[0].url : ''} alt={item.object} />
                            </aside>
                            <div className="description-box">
                                <div className="description">
                                    <strong>Nome: </strong>
                                    <p>{item.name}</p>
                                </div>
                                <div className="description">
                                    <strong>Telefone: </strong>
                                    <p>{item.telephone}</p>
                                </div>
                                <div className="description">
                                    <strong>Categoria: </strong>
                                    <p>{item.category.name}</p>
                                </div>
                                <div className="description">
                                    <strong>Observação: </strong>
                                    <p>{item.observations}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
        </div>
    )
}

export default LostItems