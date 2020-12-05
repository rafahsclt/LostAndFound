import React, { ButtonHTMLAttributes } from 'react'
import { useHistory } from 'react-router-dom'

import './styles.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    route?: string
}

const LostButton: React.FC<ButtonProps> = ({ route, children, ...rest }) => {
    const history = useHistory()

    return (
        <button
            className="lost-button"
            onClick={() => route && history.push(route)}
            {...rest}
        >
            {children}
        </button>
    )
}

export default LostButton