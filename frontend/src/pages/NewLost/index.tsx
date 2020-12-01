import React, { useState, useCallback, ChangeEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { TileLayer, Marker } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'

import logoImg from '../../assets/logo.png'
import './styles.css'

const cat = [
    { id: 1, name: 'Roupa' },
    { id: 2, name: 'Aparelho Eletrônico' },
    { id: 3, name: 'Acessório' },
    { id: 4, name: 'Documento' },
    { id: 5, name: 'Outros' }
]

interface ICategory {
    id: number
    name: string
}

const NewLost: React.FC = () => {
    const history = useHistory()

    const [formData, setFormData] = useState()
    const [categories, setCategories] = useState<ICategory[]>(cat)

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target


    },[])

    return (
        <div id="new-lost-container">
            <header>
                <img src={logoImg} alt="LostAndFound"/>
                <button
                    className="header-button"
                    onClick={() => history.push('/')}
                >
                    <FaArrowLeft size={15} color="#C53030"/>
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
                        <select name="categories" id="categories">
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
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Onde foi perdido ?</h2>
                    </legend>
                </fieldset>


            </form>
        </div>
    )
}

export default NewLost