import React, { useState, useCallback, ChangeEvent, useEffect, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { TileLayer, MapContainer } from 'react-leaflet'

import api from '../../services/api'
import logoImg from '../../assets/logo.png'

import LocationMarker from '../../components/LocationMarker'
import Input from '../../components/Input'
import LostButton from '../../components/LostButton'
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

        console.log(name, value)

        setInputData({...inputData, [name]: value })
    }, [inputData, setInputData])

    const handleSelectChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        const category = event.target.value

        setSelectedCategory(category)
    }, [setSelectedCategory])

    const handleSubmit = useCallback((event: FormEvent) => {
        event.preventDefault()

        const { name, telephone, object } = inputData
        const [ latitude, longitude ] = selectedPosition

        const data = {
            name,
            telephone,
            object,
            category_id: selectedCategory,
            observations: observation,
            latitude,
            longitude
        }
        
        console.log(data)
    }, [inputData, selectedPosition, observation, selectedCategory])

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
            <form onSubmit={handleSubmit}>
                <div className="title-box">
                    <h1>Cadastro de um objeto perdido!</h1>
                </div>

                <fieldset>
                    <legend>
                        <h2>Seu dados</h2>
                    </legend>

                    <Input 
                        property="name"
                        title="Nome"
                        placeholder="Seu nome"
                        onChange={handleInputChange}
                    />

                    <Input 
                        property="telephone"
                        title="Telefone"
                        placeholder="Seu telefone ou celular para contato"
                        onChange={handleInputChange}
                    />
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Objeto</h2>
                    </legend>

                    <Input 
                        property="object"
                        title="O que é?"
                        placeholder="O que você perdeu?"
                        onChange={handleInputChange}
                    />

                    <div className="field">
                        <label htmlFor="category">Categoria</label>
                        <select name="categories" id="categories" onChange={handleSelectChange}>
                            <option value='0'></option>
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

                <LostButton>
                    Cadastrar objeto perdido
                </LostButton>
            </form>
        </div>
    )
}

export default NewLost