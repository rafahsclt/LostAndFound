import React from 'react'
import Modal from 'react-modal'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import './styles.css'

interface ModalMapProps extends Modal.Props {
    latitude: number
    longitude: number
    objectName: string
}

const customStyle = {
    content: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        height: '600px',
        width: '600px',                      
    }
}

const ModalMap:React.FC<ModalMapProps> = ({ latitude, longitude, objectName,...rest }) => {
    return (
        <Modal 
            style={customStyle}
            {...rest} 
        >
            <MapContainer center={[latitude, longitude]} zoom={15} className="modal-map">
                <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                <Marker position={[latitude, longitude]}>
                    <Popup>{objectName}</Popup>
                </Marker>
            </MapContainer>
        </Modal>
    )
}

export default ModalMap