import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

import logoImg from '../../assets/logo.png'
import './styles.css'

const Landing: React.FC = () => {
    const history = useHistory()

    return (
        <main id="landing-container">
            <img src={logoImg} alt="LostAndFound" />

            <section className="lost-container">
                <p>Perdeu algo?</p>
                <button 
                    className="lost-button"
                    onClick={() => history.push('new-lost')}
                >
                        Cadastre um objeto perdido</button>
                <Link 
                    to="/"
                    className="lost-link"
                >
                    Veja a lista de perdidos
                    <FaArrowRight size={15} style={{ marginLeft: 10 }}/>
                </Link>
            </section>
            <section className="found-container">
                <p>Encontou algo?</p>
                <button className="found-button">Cadastre um objeto encontrado</button>
                <Link 
                    to="/"
                    className="found-link"
                >
                    Veja a lista de encontrados
                    <FaArrowRight size={15} style={{ marginLeft: 10 }}/>
                </Link>
            </section>
        </main>
    )
}

export default Landing