import React, { useState, useCallback, ChangeEvent, useEffect, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { TileLayer, MapContainer } from 'react-leaflet'

import api from '../../services/api'

import LocationMarker from '../../components/LocationMarker'
import Header from '../../components/Header'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Dropzone from '../../components/Dropzone'
import './styles.css'

interface ICategory {
    id: number
    name: string
}

const NewFound: React.FC = () => {
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
    const [selectedFile, setSelectedFile] = useState<File>()

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        setInputData({ ...inputData, [name]: value })
    }, [inputData, setInputData])

    const handleSelectChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        const category = event.target.value

        setSelectedCategory(category)
    }, [setSelectedCategory])

    const handleSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault()

        const { name, telephone, object } = inputData
        const [latitude, longitude] = selectedPosition

        const data = new FormData()

        data.append('name', name)
        data.append('telephone', telephone)
        data.append('object', object)
        data.append('category_id', selectedCategory)
        data.append('observations', observation)
        data.append('latitude', String(latitude))
        data.append('longitude', String(longitude))

        console.log(data)
        
        if(selectedFile) data.append('images', selectedFile)

        await api.post('found', data)

        alert('Objeto perdido cadastrado!')

        history.push('/')
    }, [inputData, selectedPosition, observation, selectedCategory, history, selectedFile])

    useEffect(() => {
        api.get('categories').then(response => {
            setCategories(response.data)
        })
    }, [])

    return (
        <div id="new-found-container">
            <Header 
                category='found'
            />
            <form onSubmit={handleSubmit}>
                <div className="title-box">
                    <h1>Cadastro de um objeto encontrado!</h1>
                </div>

                <Dropzone
                    onFileUpload={setSelectedFile}
                />

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
                        placeholder="O que você encontrou?"
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
                        <h2>Onde foi encontrado ?</h2>
                        <span>Selecione o endereço pelo mapa</span>
                    </legend>
                </fieldset>

                <MapContainer center={[-22.9343722, -47.0485725]} zoom={16} >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker
                        popupText="Onde foi encontrado!"
                        setSelectedPosition={setSelectedPosition}
                    />
                </MapContainer>

                <Button
                    category="found"
                >
                    Cadastrar objeto encontrado
                </Button>
            </form>
        </div>
    )
}

export default NewFound