import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import logoImg from '../../assets/logo.png'

import './styles.css'

interface HeaderProps {
    category: 'lost' | 'found'
}

const Header: React.FC<HeaderProps> = ({ category }) => {
    const history = useHistory()

    return (
        <header id="header-container">
            <img src={logoImg} alt="LostAndFound" />
            <button
                className="header-button"
                onClick={() => history.push('/')}
            >
                <FaArrowLeft size={15} color={category === 'found' ? "#3172B7" : "#C53030"} />
                <span className={`header-text ${category}`} >Voltar para Landing</span>
            </button>
        </header>
    )
}

export default Header