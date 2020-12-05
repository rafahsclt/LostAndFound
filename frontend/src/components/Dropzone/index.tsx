import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

import './styles.css'

interface DropzoneProps {
    onFileUpload(file: File): void
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileUpload }) => {
    const [selectedFileUrl, setSelectedUrl] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0]

        const fileUrl = URL.createObjectURL(file)

        setSelectedUrl(fileUrl)
        onFileUpload(file)  
    }, [setSelectedUrl, onFileUpload])

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' })

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept='image/*' />

            { selectedFileUrl 
                ? <img src={selectedFileUrl} alt="Selected Image" />
                : (
            <p>
                    <FiUpload />
                Imagem do objeto!
            </p>
            )
            }
        </div>
    )
}

export default Dropzone