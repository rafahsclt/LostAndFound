import React, { useState, useCallback, ChangeEvent, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { TileLayer, MapContainer } from 'react-leaflet'

import api from '../../services/api'
import LocationMarker from '../../components/LocationMarker'
import logoImg from '../../assets/logo.png'
import './styles.css'

interface ICategory {
    id: number
    name: string
}

const NewLost: React.FC = () => {
    const history = useHistory()

    const [inputData, setInputData] = useState({
        name: '',
        telephone: '',
        object: '',
    })

    const [observation, setObservation] = useState<string>('')
    const [categories, setCategories] = useState<ICategory[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>('0')

    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        setInputData({...inputData, [name]: value })
    }, [])

    const handleSelectChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        const category = event.target.value

        setSelectedCategory(category)
    }, [])

    useEffect(() => {
        api.get('categories').then(response => {
            setCategories(response.data)
        })
    }, [])

    return (
        <div id="new-lost-container">
            <header>
                <img src={logoImg} alt="LostAndFound" />
                <button
                    className="header-button"
                    onClick={() => history.push('/')}
                >
                    <FaArrowLeft size={15} color="#C53030" />
                    <span className="header-text">Voltar para Landing</span>
                </button>
            </header>
            <form>
                <div className="title-box">
                    <h1>Cadastro de um objeto perdido!</h1>
                </div>

                <fieldset>
                    <legend>
                        <h2>Seu dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Seu nome</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleInputChange}
                            placeholder="Seu nome"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="telephone">Telefone</label>
                        <input type="text"
                            id="telephone"
                            name="telephone"
                            onChange={handleInputChange}
                            placeholder="Seu telefone ou celular para contato"
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Objeto</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="object">O que é?</label>
                        <input type="text"
                            id="object"
                            name="object"
                            onChange={handleInputChange}
                            placeholder="O que você perdeu?"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="category">Categoria</label>
                        <select name="categories" id="categories" onChange={handleSelectChange}>
                            <option value='0'></option>
                            {categories.map(category => (
                                <option
                                    key={category.id}
                                    value={category.name}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="t-field">
                        <label htmlFor="observations">Observações</label>
                        <textarea 
                            name="observations" 
                            id="observations"
                            onChange={e => setObservation(e.target.value)}
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Onde foi perdido ?</h2>
                        <span>Selecione o endereço pelo mapa</span>
                    </legend>
                </fieldset>

                <MapContainer center={[-22.9343722, -47.0485725]} zoom={16} >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker 
                        popupText="teste"
                        setSelectedPosition={setSelectedPosition}
                    />
                </MapContainer>
            </form>

        </div>
    )
}

export default NewLost