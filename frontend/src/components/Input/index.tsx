import React, {InputHTMLAttributes} from 'react'

import './styles.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    property: string
    title: string
}

const Input: React.FC<InputProps> = ({ property, title, ...rest }) => {


    return (
        <div id="field">
        <label htmlFor={property}>{title}</label>
            <input type="text"
                id={property}
                name={property}
                {...rest}
            />
        </div>
    )
}

export default Input