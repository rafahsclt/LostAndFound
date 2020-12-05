import React, { ButtonHTMLAttributes } from 'react'
import { useHistory } from 'react-router-dom'

import './styles.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    route?: string
}

const FoundButton: React.FC<ButtonProps> = ({ route, children, ...rest }) => {
    const history = useHistory()

    return (
        <button
            className="found-button"
            onClick={() => route && history.push(route)}
            {...rest}
        >
            {children}
        </button>
    )
}

export default FoundButton