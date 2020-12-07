import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

import logoImg from '../../assets/logo.png'
import lostImg from '../../assets/lost-item.png'
import foundImg from '../../assets/found-item.png'
import Button from '../../components/Button'
import './styles.css'

const Landing: React.FC = () => {
    return (
        <main id="landing-container">
            <img src={logoImg} alt="LostAndFound" className="logo"/>

            <section className="lost-container">
                <p>Perdeu algo?</p>
                <img src={lostImg} alt="LostItem"/>
                <Button
                    route="new-lost"
                    category="lost"
                >
                    Cadastre um objeto perdido
                </Button>
                <Link 
                    to="/lost-items"
                    className="lost-link"
                >
                    Veja a lista de perdidos
                    <FaArrowRight size={15} style={{ marginLeft: 10 }}/>
                </Link>
            </section>
            <section className="found-container">
                <p>Encontou algo?</p>
                <img src={foundImg} alt="FoundItem"/>
                <Button
                    route="new-found"
                    category="found"
                >
                    Cadastre um objeto encontrado
                </Button>
                <Link 
                    to="/found-items"
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