import React, { useEffect, useState, useCallback } from 'react'
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

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [selectedObject, setSelectedObject] = useState('')

    const openModal = useCallback((lat: number, long: number, name: string) => {
        setLatitude(lat)
        setLongitude(long)
        setSelectedObject(name)
        setShowModal(true)
    }, [])

    useEffect(() => {
        api.get('lost').then(response => {
            setItems(response.data)
        })
    }, [])

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
                                <button>
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

export default LostItems