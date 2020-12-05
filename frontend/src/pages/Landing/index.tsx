import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

import logoImg from '../../assets/logo.png'
import LostButton from '../../components/LostButton'
import FoundButton from '../../components/FoundButton'
import './styles.css'

const Landing: React.FC = () => {
    return (
        <main id="landing-container">
            <img src={logoImg} alt="LostAndFound" />

            <section className="lost-container">
                <p>Perdeu algo?</p>
                <LostButton
                    route="new-lost"
                >
                    Cadastre um objeto perdido
                </LostButton>
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
                <FoundButton>
                    Cadastre um objeto encontrado
                </FoundButton>
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