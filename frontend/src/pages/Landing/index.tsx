import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

import logoImg from '../../assets/logo.png'
import './styles.css'

const Landing: React.FC = () => {
    return (
        <main className="container">
            <img src={logoImg} className="logo"/>

            <section className="lost-container">
                <p className="container-title">Perdeu algo?</p>
                <button className="lost-button button">Cadastre um objeto perdido</button>
                <Link 
                    to="/"
                    className="lost-link link"
                >
                    Veja a lista de perdidos
                    <FaArrowRight size={15} style={{ marginLeft: 10 }}/>
                </Link>
            </section>
            <section className="found-container">
                <p className="container-title">Encontou algo?</p>
                <button className="found-button button">Cadastre um objeto encontrado</button>
                <Link 
                    to="/"
                    className="found-link link"
                >
                    Veja a lista de encontrados
                    <FaArrowRight size={15} style={{ marginLeft: 10 }}/>
                </Link>
            </section>
        </main>
    )
}

export default Landing