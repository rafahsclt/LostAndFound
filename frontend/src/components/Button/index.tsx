import React, { ButtonHTMLAttributes } from 'react'
import { useHistory } from 'react-router-dom'

import './styles.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    route?: string
    category: 'lost' | 'found'
}

const Button: React.FC<ButtonProps> = ({ route, category, children, ...rest }) => {
    const history = useHistory()

    return (
        <button
            className={`${category}-button`}
            onClick={() => route && history.push(route)}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button